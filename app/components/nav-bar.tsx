"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/image.png";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const handleCoursesSignIn = () => {
    if (isSignedIn) {
      router.push("/courses"); // Redirect if already signed in
    } else {
      openSignIn({ redirectUrl: "/courses" }); // Opens Clerk's sign-in modal and redirects after login
    }
  };

  const handlePracticeSignIn = () => {
    if (isSignedIn) {
      router.push("/practice"); // Redirect if already signed in
    } else {
      openSignIn({ redirectUrl: "/practice" }); // Opens Clerk's sign-in modal and redirects after login
    }
  };

  return (
    <nav className="h-14 flex items-center px-6 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center w-full justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="logo" width={120} height={120} />
        </Link>

        {/* Navigation Links */}
        <ul className="flex items-center gap-6 text-white text-sm">
          <li>
            <button
              onClick={() => router.push("/")}
              className="hover:underline hover:scale-110 transition-all duration-300"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={handleCoursesSignIn}
              className="hover:underline hover:scale-110 transition-all duration-300"
            >
              Courses
            </button>
          </li>
          <li>
            <button
              onClick={handlePracticeSignIn}
              className="hover:underline hover:scale-110 transition-all duration-300"
            >
              Practice
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/about")}
              className="hover:underline hover:scale-110 transition-all duration-300"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/profile")}
              className="hover:underline hover:scale-110 transition-all duration-300"
            >
              Profile
            </button>
          </li>
        </ul>

        {/* Search Bar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search"
            className="w-40 border-b border-gray-500 bg-transparent text-black text-sm placeholder-gray-500 focus:outline-none"
          />
          <button className="px-4 py-1 rounded-full bg-gray-800 text-white text-sm hover:bg-gray-700">
            Search
          </button>
        </div>
      </div>
    </nav>
  );
}
