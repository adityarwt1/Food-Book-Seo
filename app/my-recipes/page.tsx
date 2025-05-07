import MyRecipie from '@/components/MyRecipie'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const page  = async () => {
  const {username } = await currentUser()
  return (
    <div>
      <MyRecipie username={username}/>
    </div>
  )
}

export default page
   