import Link from 'next/link';
import UserDetails from '@/components/user/UserDetails';

const User = ({ params }: { params: { userId: string } }) => {
    return (
        <div>
            <p>
                User id : {params.userId}
            </p>
            <div>
                <UserDetails />
            </div>
            <Link href={`${params.userId}/watchlist`}>
                Watchlist
            </Link>
            <br />
            <Link href={`${params.userId}/friendslist`}>
                Friendslist
            </Link>
        </div >
    );
}
export default User;