'use client'

import { useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
    const { auth } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (router && !auth.user && !auth.loading) {
            router.push('/login');
        }
    }, [auth, router]);


    if (auth.loading) {
        return <div>Loading...</div>;
    }

    return auth.user ? children : null;
};

export default ProtectedRoute;
