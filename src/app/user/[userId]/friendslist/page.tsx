'use client'

import { useParams } from 'next/navigation'

const Friendslist = () => {

    const params: { userId: string } = useParams();

    return (
        <p>
            Friends List for User : {params.userId}
        </p>
    );
};

export default Friendslist;