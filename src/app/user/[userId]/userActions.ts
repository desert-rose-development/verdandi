'use server';

import { query } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export interface User {
  user_id: string;
  user_display_name: string;
  user_email: string;
}

export async function getAllUsers(): Promise<User[]> {
  const users = await query('SELECT * FROM Users', []);
  const allUsers: User[] = users?.rows.map((user) => {
    return {
      user_id: user.user_id,
      user_display_name: user.user_display_name,
      user_email: user.user_email,
    };
  });
  return allUsers || [];
}

export async function getUser(userId: string): Promise<User> {
  const user = await query('SELECT * FROM Users WHERE user_id = $1', [userId]);
  const receivedUser: User = {
    user_id: user?.rows[0]?.user_id,
    user_display_name: user?.rows[0]?.user_display_name,
    user_email: user?.rows[0]?.user_email,
  };
  return receivedUser || {};
}

export async function getUserFollowingList(userId: string): Promise<User[]> {
  const follows = await query(
    `
  select u.user_id ,u.user_display_name , u.user_email from follows f
  inner join users u
    on (u.user_id = f.followed_user_id )
  where f.user_id = $1`,
    [userId]
  );
  const followedUsers: User[] = follows?.rows.map((followedUser) => {
    return {
      user_id: followedUser.user_id,
      user_display_name: followedUser.user_display_name,
      user_email: followedUser.user_email,
    };
  });
  return followedUsers || [];
}

export async function unfollowUser(userId: string, followedUserId: string) {
  await query(
    'DELETE FROM Follows WHERE user_id = $1 AND followed_user_id = $2',
    [userId, followedUserId]
  );
  console.log('unfollowed user: ', followedUserId);
  revalidatePath(`/user/${userId}`);
}

export async function followUser(userId: string, followedUserId: string) {
  await query(
    'INSERT INTO Follows (user_id, followed_user_id) VALUES ($1, $2)',
    [userId, followedUserId]
  );
  console.log('followed user: ', followedUserId);
  revalidatePath(`/user/${userId}`);
}
