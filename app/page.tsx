"use client"
import { useUser } from "@clerk/nextjs"
import "./home.css"
import LoginPage from "./components/login-page"
import SolarSystemModel from "./components/3d-model"
import NavBar from "./components/nav-bar"
import Search from "./components/search"
import { useState, useEffect } from "react"
import ModelViewer from "./components/3d-model-viewer"
import { checkIfUserExists } from "./db"

export default function Home() {
  const { isSignedIn, user } = useUser();
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  
  useEffect(() => {
    const initializeUser = async () => {
      if (isSignedIn && user?.id) {
        try {
          // Check if the user already exists in the database
          const userExists = await checkIfUserExists(user.id);
          
          if (!userExists) {
            // Create user and their courses through the API
            await fetch('/api/user-details', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ user_id: user.id }),
            });
          }
        } catch (error) {
          console.error('Error initializing user:', error);
        }
      }
    };

    initializeUser();
  }, [isSignedIn, user?.id]); 


  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/space.jpg')" }}></div>
      <NavBar />
        
      <div className="flex justify-center items-center min-h-screen relative z-10">
        <div className="text-center">
            <div className="flex flex-col justify-center items-center min-h-screen relative z-10">
              <h1 className="text-2xl font-semibold text-white text-center mb-4 relative top-20">
                {isSignedIn ? `Welcome, ${user?.fullName}!` : "Welcome to AstroLearn.AI!"}
              </h1>
              <div className="absolute top-[300px] left-[100px]">
                <Search setSelectedPlanet={setSelectedPlanet} />
              </div>
              <SolarSystemModel />
              {selectedPlanet && (
                <div>
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[65%] h-[85%] bg-gray-200 rounded-lg shadow-lg z-50">
                    <ModelViewer 
                      selectedPlanet={selectedPlanet} 
                      onClose={() => setSelectedPlanet(null)} 
                    />
                  </div>
                </div>
              )}
            </div>
          )
        </div>
      </div>
    </div>
  );
}
