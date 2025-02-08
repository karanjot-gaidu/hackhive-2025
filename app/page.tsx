"use client"
import { useUser } from "@clerk/nextjs"
import "./home.css"
import LoginPage from "./components/login-page"
import SolarSystemModel from "./components/3d-model"
import NavBar from "./components/nav-bar"

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
                <div>
                  <h1 className="text-xl font-semibold inline">Welcome, {user?.fullName}!</h1>
                  <div><SolarSystemModel /></div>
                </div>
            ) : (
              <LoginPage />
            )}
          </div>
        </div>
      </div>
  );
}
