import Link from 'next/link';
import UserDetails from '@/components/UserDetails';

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
        </div >
    );
}
export default User;