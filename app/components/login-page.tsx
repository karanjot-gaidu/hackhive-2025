import React from 'react';
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs"

const LoginPage: React.FC = () => {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='text-center'>
                <h1 className="mb-4">Login</h1>
                <SignedOut>
                <SignInButton>
                    <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
                    Sign in
                    </button>
                </SignInButton>
                </SignedOut>
            </div>
        </div>

    )
}

export default LoginPage;