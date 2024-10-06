'use client';

import { useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
    const { auth, login } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/checklogin`, {
                    method: 'GET',
                    credentials: 'include',
                });
                
                const data = await response.json();
                
                if (response.ok && data.ok) {
                    if (!auth.user) {
                        login({ userId: data.userId }); 
                    }
                    setLoading(false);
                } else {
                    toast.error(data.message || 'Session expired. Please log in again');
                    router.push('/login');
                }
            } catch (error) {
                toast.error('Error checking login status.');
                router.push('/login');
            } finally {
                setLoading(false); 
            }
        };

        
        if (!auth.user) {
            checkLogin();
        } else {
            setLoading(false); 
        }
    }, [auth.user, login, router]);

    
    if (loading || auth.loading) {
        return <div>Loading...</div>;
    }

    
    return auth.user ? children : null;
};

export default ProtectedRoute;
