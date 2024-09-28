'use client'

import React from 'react';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {
  const { auth, logout} = useAuth();


  return (
    <nav>Navbar</nav>
  )
}

export default Navbar