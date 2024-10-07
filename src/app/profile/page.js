'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ProtectedRoute from '@/components/ProtectedRoute'
import { toast } from 'react-toastify'

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [classroomName, setClassroomName] = useState('');
  const [description, setDescription] = useState('');
  const [classroomCreatedByMe, setClassroomsCreatedByMe] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/getuser`, {
          method: 'GET',
          credentials: 'include',
        });


        const data = await response.json();
        
        if(response.ok) {

          setUser(data.data);
          
        } else {
          toast.error(data.message || 'Fail to fetch user data');
        }
        
      } catch (error) {
        toast.error('Error fetching user');
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [])

  const fetchClassrooms = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/class/classroomscreatedbyme`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();

      if(response.ok) {
        setClassroomsCreatedByMe(data.data);
      } else {
        toast.error(data.message || 'Fail to fetch classrooms');
      }
    } catch (error) {
      toast.error('Error fetching classrooms');
    }
  }

  useEffect(() => {
    if(user) {
      fetchClassrooms();
    }
  }, [user])

  const handleCreateClassroom = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/class/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: classroomName,
          description: description
        }),
        credentials: 'include',
      });

      const data = await response.json();
      

      if(response.ok) {
        toast.success('Classroom created successfully');
        setClassroomName('');
        setDescription('');
        fetchClassrooms();
        setShowPopup(false);
      } else {
        toast.error(data.message || 'Failed to create classroom');
      }
    } catch (error) {
      toast.error('Error creating classroom');
    }
  }

  console.log(user)

  return (
    <ProtectedRoute>
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : user ? (
        <>
          <h1>Profile</h1>
          <div>
            <Image 
            src="https://images.unsplash.com/photo-1721942963042-c939aa71c476?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww"
            alt="photo"
            width={200}
            height={200}
            className="rounded-full"
            />
            <div>
              <h2>{user.name}</h2>
              <p>Email: {user.email}</p>
              Role: {user.role}
              {user.role === 'teacher' && (
                <button onClick={() => setShowPopup(true)}>
                  Create Classroom
                </button>
              )}
            </div>
          </div>
          {showPopup && (
            <div>
              <div>
                <h3>Create Classroom</h3>
                <input 
                  type='text'
                  value={classroomName}
                  placeholder='Classroom Name'
                  onChange={(e) => setClassroomName(e.target.value)}
                />
                <textarea 
                  placeholder='Description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div>
                  <button onClick={handleCreateClassroom}>Submit</button>
                  <button onClick={() => setShowPopup(false)}>Cancel</button>

                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div>No user data found.</div>)}
    </div>
    </ProtectedRoute>
  )
}

export default ProfilePage