'use server';

import { query } from '@/lib/db';

export interface User {
  user_id: string;
  user_display_name: string;
  user_email: string;
}

export async function getUser(userId: string): Promise<User | null> {
  const user = await query('SELECT * FROM Users WHERE user_id = $1', [userId]);
  const receivedUser: User = {
    user_id: user?.rows[0].user_id,
    user_display_name: user?.rows[0].user_display_name,
    user_email: user?.rows[0].user_email,
  };
  return receivedUser || null;
}

export async function getUserFollowingList(userId: string) {
  const follows = await query(
    `
  select u.user_id ,u.user_display_name , u.user_email from follows f
  inner join users u
    on (u.user_id = f.followed_user_id )
  where f.user_id = $1`,
    [userId]
  );
  const followingUsers: User[] = follows?.rows.map((followedUser) => {
    return {
      user_id: followedUser.user_id,
      user_display_name: followedUser.user_display_name,
      user_email: followedUser.user_email,
    };
  });
  return followingUsers || [];
}
