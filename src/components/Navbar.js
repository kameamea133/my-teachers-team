'use client'

import React from 'react';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';


const Navbar = () => {
  const { auth, logout} = useAuth();


  return (
    <nav className="flex items-center justify-between gap-2 bg-black/70 text-white p-3 shadow-xl">

      <div>
        <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logoMyTeachersApp.png"
          alt="Logo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <p>My School Online</p>
        </Link>

        <div className='flex items-center gap-1'>
        <input
         className='w-48 rounded-md p-2 outline-none bg-black/70 text-white border border-gray-300'
         placeholder="Search Classrooms..." />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        </div>
        </div>
      </div>

      <div>
        {auth.user ? (
          <>
            <div className="flex items-center gap-4">
            <Link href="/profile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </Link>
              <button onClick={logout} className="w-28 rounded-md  bg-transparent border border-white px-4 py-2 text-white hover:bg-white hover:text-black">Logout</button>
            </div>
          </>
        ) : (
          <Link
           className="w-28 rounded-md  bg-transparent border border-white px-4 py-2 text-white hover:bg-white hover:text-black"
           href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar