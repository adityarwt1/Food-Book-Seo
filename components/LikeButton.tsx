"use client"
import { useUser } from '@clerk/nextjs'
import { ThumbsUp } from 'lucide-react'
import React, { useState } from 'react'


const LikeButton = async ({ initialLikes, recipieId }: { initialLikes: number, recipieId: string }) => {

    const [likes, setLikes] = useState(initialLikes)
    const [liked, setLiked] = useState(false)
    const { username } =await useUser()

    const handleLike = async ()=>{
    const response = await fetch(`/api/recipes/like?recipieId=${recipieId}&username=${username}`, {
        method: "POST",
    })
    if (response.ok) {
        setLiked(true)
        setLikes(count => count +1 )
    }
}

    const dislike = async () => {
        const response = await fetch(`/api/recipes/like?recipieId=${recipieId}&username=${username}`, {
            method: "DELETE"
        })

        if (response.ok) {
            setLiked(false)
            setLikes(count => count - 1)
        }
    }
    return (
        <div>
            <button onClick={!liked ? handleLike : dislike} className={`flex text-black ${liked ? `bg-amber-500 text-white ` : "text-black"} items-center gap-2 px-4 py-2 border border-gray-300 rounded-md transition-colors`}>
                <span>{likes}</span>
                <ThumbsUp size={18} />
                <span> {initialLikes > 1 ? "Likes" : "Like"}</span>
            </button>
        </div>
    )
}

export default LikeButton
