'use-client'

import { useRouter } from 'next/navigation'

const Button = () => {
    const router = useRouter()
    
    const handleSignIn = () => {
        router.push('/login');
    };

    return (
        <button className="h-12 rounded-lg bg-gray-800 font-bold px-5" onClick={handleSignIn}>Sign In</button>
    );
};
export default Button;