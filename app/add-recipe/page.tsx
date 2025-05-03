import AddRecipePage from '@/components/AddRecipePage'
import { auth, currentUser } from '@clerk/nextjs/server'
import React from 'react'

const page = async () => {
  const {userId, username} = await currentUser()
  
  return (
    <>
    <AddRecipePage userId={userId} username={username}/>
    </>
  )
}

export default page
