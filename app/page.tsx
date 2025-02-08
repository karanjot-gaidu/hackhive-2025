"use client"
import { useUser } from "@clerk/nextjs"
import "./home.css"
import LoginPage from "./components/login-page"
import SolarSystemModel from "./components/3d-model"
import NavBar from "./components/nav-bar"
import Search from "./components/search"

export default function Home() {
  const { isSignedIn, user } = useUser();
  console.log(user);
  return (
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/space.jpg')" }}></div>
        <NavBar />
          
        <div className="flex justify-center items-center min-h-screen relative z-10">
          <div className="text-center">
            {isSignedIn ? (
                <div className="flex flex-col justify-center items-center min-h-screen relative z-10">
                <h1 className="text-2xl font-semibold text-white text-center mb-4 relative top-20">
                  Welcome, {user?.fullName}!
                </h1>
                <div className="absolute top-[300px] left-[100px]"><Search /></div>
                <SolarSystemModel />
              </div>


            ) : (
              <LoginPage />
            )}
          </div>
        </div>
      </div>
  );
}
