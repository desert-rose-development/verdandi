'use client';

import { followUser, User } from './userActions';
import { revalidatePath } from 'next/cache';

export default function UserList({
  currentUser,
  users,
}: {
  currentUser: User;
  users: User[];
}) {
  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users &&
          users?.map(
            (user) =>
              currentUser.user_id !== user.user_id && (
                <li key={user.user_id}>
                  {user.user_display_name + ' - ' + user.user_id}
                  <button
                    className="hover:bg-blue-700 font-bold py-2 px-4 rounded"
                    onClick={() => {
                      followUser('3', user.user_id);
                    }}
                  >
                    Follow
                  </button>
                </li>
              )
          )}
      </ul>
    </div>
  );
}
