'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { set } from 'mongoose'

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  const [otp, setOtp] = useState('');
  const [ loading , setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

   if(!email || !password || !name || !otp) {
    toast.error('All fields are required');
    return;
   }
   try {
    setLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name, role, otp }),
      credentials: 'include',
    });

    const data = await response.json();
    if(response.ok) {
      toast.success('Registration successful');
      login({ email, role });
      router.push('/login');
    }
    else {
      toast.error(data.message || 'Failed to register');
    }

   } catch (error) {
     toast.error('Error during registration');
  } 
}
  const handleSendOtp = async () => {
    
    if(!email) {
      toast.error('Please enter our email');
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/sendotp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: 'include',
      })

      const data = await response.json();
      if(response.ok) {
        toast.success('OTP sent successfully');
      }
      else {
        toast.error(data.message || 'Failed to send OTP')
      }
    } catch (error) {
      toast.error('Error sending OTP');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-[100vh] bg-black text-white'>
      <h1 className='mb-6 text-3xl text-center font-bold'>SignUp</h1>
      <form 
  className="flex flex-col items-center bg-[#A9A9A9] gap-2 p-[30px] rounded-xl shadow-md shadow-slate-700 mb-4 w-[40%]"
  onSubmit={handleSubmit}
>
  <input 
    type="text"
    placeholder="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
    className="w-full h-12 border border-white bg-transparent rounded-md p-2 outline-none placeholder:text-gray-300"
  />
  
  <div className="flex items-center gap-2 w-full">
    <input 
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className="flex-1 h-12 border border-white bg-transparent rounded-md p-2 outline-none placeholder:text-gray-300"
    />
    <button 
      type="button" 
      onClick={handleSendOtp}
      className="h-12 w-[30%] bg-white text-black rounded-md cursor-pointer font-bold hover:bg-[#f0f0f0] transition duration-300"
    >
      {loading ? 'Sending...' : 'Send OTP'}
    </button>
  </div>

  <input 
    type="text"
    placeholder="Enter OTP"
    value={otp}
    onChange={(e) => setOtp(e.target.value)}
    required
    className="w-full h-12 border border-white bg-transparent rounded-md p-2 outline-none placeholder:text-gray-300"
  />

  <input 
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    className="w-full h-12 border border-white bg-transparent rounded-md p-2 outline-none placeholder:text-gray-300"
  />

  <select 
    value={role}
    onChange={(e) => setRole(e.target.value)}
    className="w-full h-12 border border-white bg-transparent rounded-md p-2 outline-none text-white"
  >
    <option value="student" className="bg-[#A9A9A9] text-white ">Student</option>
    <option value="teacher" className="bg-[#A9A9A9] text-white">Teacher</option>
  </select>
  
  <button 
    className="w-full h-12 p-2 bg-white text-black rounded-md cursor-pointer font-bold hover:bg-[#f0f0f0] transition duration-300"
    type="submit"
  >
    SignUp
  </button>
</form>


      <div className='mt-6'>
        <p>Already have an account? <Link href='/login' className='text-blue-700 hover:text-blue-500 transition duration-300 font-bold'>Login here</Link></p>
      </div>
    </div>
  )
}

export default SignUp