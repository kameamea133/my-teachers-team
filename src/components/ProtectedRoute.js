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
                    // Si l'utilisateur est authentifié, on met à jour l'état avec login()
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
                setLoading(false); // Arrête le chargement quoi qu'il arrive
            }
        };

        // On vérifie si l'utilisateur est déjà authentifié
        if (!auth.user) {
            checkLogin();
        } else {
            setLoading(false); // Si déjà connecté, on arrête le chargement
        }
    }, [auth.user, login, router]);

    // Affiche un message de chargement tant que l'état de l'utilisateur n'est pas vérifié
    if (loading || auth.loading) {
        return <div>Loading...</div>;
    }

    // Si l'utilisateur est authentifié, on rend le contenu enfant, sinon rien
    return auth.user ? children : null;
};

export default ProtectedRoute;
