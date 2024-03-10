import Link from 'next/link';
import UserDetails from '@/components/user/UserDetails';
import { getUser, getUserFollowingList } from '@/app/user/[userId]/userActions';
import FollowingList from './FollowingList';

export default async function UserPage({
  params,
}: {
  params: { userId: string };
}) {
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
      <Link
        className=" hover:bg-blue-700 font-bold py-2 px-4 rounded"
        href={`${params.userId}/edit`}
      >
        Edit User
      </Link>
      <FollowingList followedUsers={followingUsers} />
    </div>
  );
}
