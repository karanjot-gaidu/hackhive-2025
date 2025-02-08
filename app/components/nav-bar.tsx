import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png"

export default function NavBar() {
  return (
    <nav className="h-14 flex items-center px-6 shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center w-full justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
            <Image src={logo} alt="logo" width={60} height={60} />
            </Link>


            {/* Navigation Links */}
            <ul className="flex items-center gap-6 text-white text-sm">
            <li><Link href="/" className="hover:underline hover:scale-120 transition-all duration-300">Home</Link></li>
            <li><Link href="/courses" className="hover:underline hover:scale-120 transition-all duration-300">Courses</Link></li>

            <li><Link href="/practice" className="hover:underline hover:scale-120 transition-all duration-300">Practice</Link></li>
            <li><Link href="/about" className="hover:underline hover:scale-120 transition-all duration-300">About</Link></li>
            <li><Link href="/profile" className="hover:underline hover:scale-120 transition-all duration-300">Profile</Link></li>

            </ul>

            {/* Search Bar */}
            <div className="flex items-center gap-2">
            <input
                type="text"
                placeholder="Search"
                className="w-40 border-b border-white bg-transparent text-white text-sm placeholder-gray-300 focus:outline-none"
            />
            <button className="px-4 py-1 rounded-full bg-gray-800 text-white text-sm hover:bg-gray-700">
                Search
            </button>
            </div>
        </div>
        </nav>

  );
}
