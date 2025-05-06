import { auth, clerkMiddleware, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'


export default clerkMiddleware(async (auth, req) => {

  const { pathname } = req.nextUrl /// shortcut to get the path name 
  // if (pathname.startsWith('/edit-recipe')) {
  //   const {username} = await auth()

  //   if (!username) {
  //     return (await auth()).redirectToSignIn() /// redirecting when user not foud
  //   }
  //   //getting username from params
  //   const searchParams = req.nextUrl.searchParams;
  //   const UserFromParams = searchParams.get("username");

  //   if (UserFromParams !== username) {
  //     // If username doesn't match, redirect to recipe page
  //     const recipeId = pathname.split('/')[2]; /// there getting the recipie id form index 2 of pathname
  //     return NextResponse.redirect(new URL(`/recipes/${recipeId}`, req.url));

  //   }

  // }
    
  return NextResponse.next();
});



export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}