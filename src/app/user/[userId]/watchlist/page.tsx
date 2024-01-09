'use client'

import { useParams } from 'next/navigation'

const Watchlist = () => {

    const params: { userId: string } = useParams();

    return (
        <p>
            Watchist for User : {params.userId}
        </p>
    );
};

export default Watchlist;