import React from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'


const ProfilePage = () => {
  return (
    <ProtectedRoute>
    <div>profile page</div>
    </ProtectedRoute>
  )
}

export default ProfilePage