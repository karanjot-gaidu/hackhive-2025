"use client"
import { Card } from '../../ui/card';
import { useState } from 'react';
import PlanetInfo from '../../components/planet-info';
import Sidebar from "./solar-system/sidebar";
import { useUser } from '@clerk/nextjs';

const planets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];

export default function PlanetsPage() {
  const [selectedPlanet, setSelectedPlanet] = useState(planets[0]); // Default to Mars

  const handlePlanetSelect = (planet: string) => {
    setSelectedPlanet(planet);
  };
  const { user } = useUser();

  return (
    <div className="fixed inset-0 flex">
      {/* Background with fixed position */}
      <div 
        className="fixed inset-0 bg-cover bg-center -z-10" 
        style={{ 
          backgroundImage: "url('/space.jpg')",
          backgroundRepeat: 'repeat'
        }} 
      />

      {/* Sidebar - Fixed */}
      <div className="w-1/4 h-full fixed left-0">
        <Sidebar 
          userId={user?.id || ''}
          selectedPlanet={selectedPlanet} 
          onPlanetSelect={handlePlanetSelect}
        />
      </div>

      {/* Planet Information Side - Scrollable */}
      <div className="flex-1 h-screen overflow-y-auto ml-[18%] p-4">
        <PlanetInfo planet={selectedPlanet} />
      </div>

      {/* AI Chat - Fixed */}
      <div className="w-1/3 h-full fixed right-0 border-l border-gray-200 p-4">
        <Card className="h-full flex flex-col">
          <div className="p-4 border-b">
            <h3 className="text-xl font-bold">AI Chat</h3>
            <p className="text-sm text-gray-600">
              Ask questions about {selectedPlanet} and get instant answers
            </p>
          </div>
          <div className="flex-1 overflow-auto p-4">
            {/* Chat messages will go here */}
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              placeholder="Type your question..."
              className="w-full p-2 border rounded"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
