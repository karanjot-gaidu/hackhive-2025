"use client";
import { useClerk } from "@clerk/nextjs";

export default function LoginPage() {
  const { openSignIn } = useClerk();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-black bg-opacity-50 p-8 rounded-lg w-full max-w-md border border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] text-center">
        <p className="text-gray-300 mb-6">Sign in to access your profile</p>

        {/* Sign In Button */}
        <button
          onClick={() => openSignIn({ redirectUrl: "/profile" })}
          className="border border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 px-6 py-2 rounded-lg font-semibold text-white"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
