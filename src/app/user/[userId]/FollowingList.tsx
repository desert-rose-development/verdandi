'use client';

import { User } from '@/app/user/[userId]/userActions';

export default function FollowingList({
  followedUsers,
}: {
  followedUsers: User[];
}) {

    console.log('followedUsers', followedUsers)
  return (
    <div>
      <h1>Following List</h1>
      <ul>
        {followedUsers?.map((user) => (
          <li key={user.user_id}>{user.user_display_name + ' - ' + user.user_id}</li>
        ))}
      </ul>
    </div>
  );
}
