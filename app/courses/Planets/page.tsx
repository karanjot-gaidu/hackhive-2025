"use client"
import { Card } from '../../ui/card';
import { useState } from 'react';
import PlanetInfo from '../../components/planet-info';
import Sidebar from "./solar-system/sidebar";

const planets = ["Mars", "Venus", "Earth", "Jupiter", "Saturn", "Uranus", "Neptune"];

export default function PlanetsPage() {
  const [selectedPlanet, setSelectedPlanet] = useState(planets[0]); // Default to Mars

  const handlePlanetSelect = (planet: string) => {
    setSelectedPlanet(planet);
  };

  return (
    <div className="flex h-screen background-image absolute inset-0 bg-cover bg-center" 
         style={{ backgroundImage: "url('/space.jpg')" }}>
      <Sidebar 
        selectedPlanet={selectedPlanet} 
        onPlanetSelect={handlePlanetSelect}
      />
      
      {/* Planet Information Side */}
      <div className="flex-1">
        <PlanetInfo planet={selectedPlanet} />
      </div>

      {/* AI Chat Side */}
      <div className="w-1/3 border-l border-gray-200 p-4">
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