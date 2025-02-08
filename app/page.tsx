"use client"
import {useUser } from "@clerk/nextjs"
import "./home.css"
import LoginPage from "./components/login-page"

export default function Home() {
  const { isSignedIn, user } = useUser();
  console.log(user);
  return (
    <>
     {/* Commented out to keep a reference to login button to be used later */}
      {/* <div className="relative flex gap-3">
        <SignedIn>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
          >
            Dashboard
          </Link>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
      </div> */}
      
      
        

        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            {isSignedIn ? (
              <h1 className="text-xl font-semibold">Welcome, {user?.fullName}!</h1>
            ) : (
              <>
                <LoginPage/>
              </>
            )}
          </div>
        </div>

    </>
  )
}
