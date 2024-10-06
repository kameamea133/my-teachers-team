'use client'

import React, { createContext, useState, useEffect, useContext} from 'react'
import { useRouter } from 'next/navigation';

const AuthContext = createContext();
// custom hook to use AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
}



export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({ user: null, loading: true});
    const router = useRouter();

    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
    
            if (user) {
                setAuth({ user, loading: false });
            } else {
                setAuth({ user: null, loading: false });
                router.push('/login');
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            setAuth({ user: null, loading: false });
            router.push('/login');
        }
    }, []);
    const login  = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setAuth({user: userData, loading: false});
    }

    const logout = async () => {
        try {
            // Appelle la route backend pour effacer les cookies
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
                method: 'GET',
                credentials: 'include' // Inclut les cookies dans la requête
            });
    
            // Supprime les informations de l'utilisateur du localStorage
            localStorage.removeItem('user');
            
            // Réinitialise l'état auth à null
            setAuth({ user: null, loading: false });
    
            // Redirige vers la page de login
            router.push('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    

  return (
    <AuthContext.Provider value={{auth, login, logout}}>
        {!auth.loading && children}
    </AuthContext.Provider>
  )
}

