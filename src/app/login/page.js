'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from './../../context/AuthContext'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email || !password) {
      toast.error('All fields are required');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();
      
      if(response.ok) {
        toast.success('Login successful');
        login(data.data);
        router.push('/');
      } else {
        toast.error(data.message || 'Failed to login');
      }
    } catch (error) {
      toast.error('An error occured during login');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className='flex flex-col items-center justify-center h-[100vh] bg-black text-white'>
      <h1 className='mb-6 text-2xl text-center'>Login page</h1>
      <form 
      className='flex flex-col items-center bg-[#A9A9A9] gap-2 p-[30px] rounded-xl shadow-md shadow-slate-700 mb-4'
      onSubmit={handleSubmit}>
        <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className='w-[250px] border border-white bg-transparent rounded-md p-2 outline-none placeholder:text-gray-300'
        />
        <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className='w-[250px] border border-white bg-transparent rounded-md p-2 outline-none placeholder:text-gray-300'
         />

        <button 
        type='submit'
        className='w-full p-2 bg-white text-black rounded-md cursor-pointer font-bold hover:bg-[#f0f0f0] transition duration-300'
        >Login</button>
      </form>

      <div className='mt-6'>
        <p>Don&apos;t have an account? <Link href='/signup' className='text-blue-700 hover:text-blue-500 transition duration-300 font-bold'>Sign up</Link></p>
      </div>
    </div>
  )
}

export default Login