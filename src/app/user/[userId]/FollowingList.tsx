'use client';

import { User, unfollowUser } from '@/app/user/[userId]/userActions';
import { revalidatePath } from 'next/cache';

export default function FollowingList({
  currentUser,
  followedUsers,
}: {
  currentUser: User;
  followedUsers: User[];
}) {
  return (
    <div>
      <h1>Following List</h1>
      <ul>
        {followedUsers &&
          followedUsers?.map((followedUser) => (
            <li key={followedUser.user_id}>
              {followedUser.user_display_name + ' - ' + followedUser.user_id}
              <button
                className="hover:bg-blue-700 font-bold py-2 px-4 rounded"
                onClick={() => {
                  unfollowUser(currentUser.user_id, followedUser.user_id);
                }}
              >
                Unfollow
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
