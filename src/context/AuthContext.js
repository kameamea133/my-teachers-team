'use client'

import React, { createContext, useState, useEffect, useContext} from 'react'


const AuthContext = createContext();
// custom hook to use AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({ user: null, loading: true});

    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
    
            if (user) {
                setAuth({ user, loading: false });
            } else {
                setAuth({ user: null, loading: false });
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            setAuth({ user: null, loading: false });
        }
    }, []);
    const login  = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setAuth({user: userData, loading: false});
    }

    const logout = () => {
        localStorage.removeItem('user');
        setAuth({user: null, loading: false});
    }

  return (
    <AuthContext.Provider value={{auth, login, logout}}>
        {!auth.loading && children}
    </AuthContext.Provider>
  )
}

