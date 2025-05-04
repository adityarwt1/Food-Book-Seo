'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { unstable_addTransitionType, useEffect, useState } from 'react'

export default function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '') //  

  useEffect(() => {
    ////// we are using time  
      const timeOut = setTimeout(() => {
        // const params = new URLSearchParams(window.location.search)
        // if (query) {
        //   params.set('q', query)
        // } else {
        //   params.delete('q')
        // }
        // router.push(`?${params.toString()}`)
        const params = new URLSearchParams(window.location.search)

        if ( query){
          params.set("question", query)
        }
        else{
          params.delete("question")
        }
        router.push(`?${params.toString()}`)
      // debounce to reduce excessive updates
    }, 500); 
    return ()=> clearTimeout(timeOut)


  }, [query, router])

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search recipes..."
      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
    />
  )
}
