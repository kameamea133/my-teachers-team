import React, { createContext, useState, useEffect, useContext} from 'react'


const AuthContext = createContext();
// custom hook to use AuthContext
export const useAuth = () => {
    return useContext(AuthContext)
}
export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({ user: null, loading: true});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if(user) {
            setAuth({user, loading: false});
        } else {
            setAuth({user: null, loading: false});
        }

    }, []);
  return (
    <div>AuthContext</div>
  )
}

