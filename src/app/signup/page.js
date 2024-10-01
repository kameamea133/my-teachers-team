'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  const [otp, setOtp] = useState('');

  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { email, role };
    login(userData);

    router.push('/');
  }

  const handleSendOtp = () => {
    console.log("Sending OTP...", email);
    
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input 
        type="text"
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        />
        
       <div>
        <input 
          type="email"
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type='button' onClick={handleSendOtp}>Send OTP</button>
       </div>

       <input 
        type="text"
        placeholder='Enter OTP'
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
       />

        <input 
        type="password"
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button type='submit'>Sign Up</button>
      </form>

      <div>
        <p>Already have an account? <Link href='/login'>Login here</Link></p>
      </div>
    </div>
  )
}

export default SignUp