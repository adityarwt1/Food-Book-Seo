"use client"
import { useUser } from '@clerk/nextjs'
import { ThumbsUp } from 'lucide-react'
import React, { useState } from 'react'


const LikeButton = ({ initialLikes, recipieId }: { initialLikes: number, recipieId: string }) => {

    const [likes, setLikes] = useState(initialLikes)
    const [liked, setLiked] = useState(false)
    const {username} = useUser()


    const handleLike = async () => {

        if (!liked) {
            setLiked(!liked)
            setLikes(count => count + 1)

            const response = await fetch(`/api/recipes/like?recipieId=${recipieId}&username=${username}`,{
                method: "POST",
            })

            if (!response.ok){
                setLikes(count => count -1)
            }
        }
        if (liked) {
            
            const response = await fetch(`/api/recipes/like?recipieId=${recipieId}&username=${username}`,{
                method: "DELETE"
            })
            
            if (response.ok){
                setLiked(!liked)
                setLikes(count => count - 1)
            }

        }

        

    }
    return (
        <div>
            <button onClick={handleLike} className={`flex text-white ${liked ? `bg-amber-500 `:"text-black"} items-center gap-2 px-4 py-2 border border-gray-300 rounded-md transition-colors`}>
                <span>{likes}</span>
                <ThumbsUp size={18} />
                <span> {initialLikes > 1 ? "Likes" : "Like"}</span>
            </button>
        </div>
    )
}

export default LikeButton
