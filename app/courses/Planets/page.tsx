"use client"
import { Card } from '../../ui/card';
import { useState } from 'react';
import PlanetInfo from '../../components/planet-info';
import Sidebar from "./solar-system/sidebar";
import { useUser } from '@clerk/nextjs';
import AiChat from '@/app/components/ai-chat';
import NavBar from '@/app/components/nav-bar';

const planets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];

export default function PlanetsPage() {
  const [selectedPlanet, setSelectedPlanet] = useState(planets[0]); // Default to Mars

  const handlePlanetSelect = (planet: string) => {
    setSelectedPlanet(planet);
  };
  const { user } = useUser();

  return (
    <div className="fixed inset-0 flex">
      <NavBar />
      {/* Background with fixed position */}
      <div 
        className="fixed inset-0 bg-cover bg-center -z-10" 
        style={{ 
          backgroundImage: "url('/space.jpg')",
          backgroundRepeat: 'repeat'
        }} 
      />

      {/* Sidebar - Fixed */}
      <div className="w-1/4 h-full fixed left-0 pt-16">
        <Sidebar 
          userId={user?.id || ''}
          selectedPlanet={selectedPlanet} 
          onPlanetSelect={handlePlanetSelect}

        />
      </div>

      {/* Planet Information Side - Scrollable */}
      <div className="flex-1 h-screen overflow-y-auto ml-[18%] p-4 pt-16">
        <PlanetInfo planet={selectedPlanet} />
      </div>
        <div className="w-1/3 h-full fixed right-0 p-4 pt-16">

          <AiChat selectedPlanet={selectedPlanet} />
        </div>
    </div>

  );
}
