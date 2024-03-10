import Link from 'next/link';
import UserDetails from '@/components/user/UserDetails';
import {
  getUser,
  getAllUsers,
  getUserFollowingList,
  followUser,
} from '@/app/user/[userId]/userActions';
import UserList from './UserList';
import FollowingList from './FollowingList';
import { revalidatePath } from 'next/cache';

export default async function UserPage({
  params,
}: {
  params: { userId: string };
}) {
  const users = await getAllUsers();
  const user = await getUser(params.userId);

  const followingUsers = await getUserFollowingList(params.userId);
  return (
    <div>
      <p>User id : {user?.user_id}</p>
      <p>User name : {user?.user_display_name}</p>
      <p>User email : {user?.user_email}</p>
      <div>
        <UserDetails />
      </div>
      <div>
        <UserList currentUser={user} users={users} />
      </div>
      <Link
        className=" hover:bg-blue-700 font-bold py-2 px-4 rounded"
        href={`${params.userId}/edit`}
      >
        Edit User
      </Link>
      <FollowingList currentUser={user} followedUsers={followingUsers} />
    </div>
  );
}
