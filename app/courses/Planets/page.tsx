import { Card } from '../../ui/card';

import Sidebar from "./solar-system/sidebar";

export default function PlanetsPage() {
    return (
            <div className="flex h-screen background-image absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/space.jpg')" }}>
      <Sidebar/>
      {/* Planet Information Side */}
      <div className="flex-1 p-6">
        <div className="relative">
          <img 
            src="/mars.jpg" 
            alt="Mars" 
            className="w-full rounded-lg"
          />
          <div className="absolute top-4 left-4 bg-black/70 text-white p-4 rounded">
            <h2 className="text-2xl font-bold mb-2">Mars</h2>
            <p>Planet</p>
            <div className="space-y-1 mt-4">
              <p>Distance from Sun: 227.9 million km</p>
              <p>Orbital period: 687 days</p>
              <p>Length of day: 1d 0h 37m</p>
              <p>Gravity: 3.73 m/s²</p>
              <p>Radius: 3,389.5 km</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Side */}
      <div className="w-1/3 border-l border-gray-200 p-4">
        <Card className="h-full flex flex-col">
          <div className="p-4 border-b">
            <h3 className="text-xl font-bold">AI Chat</h3>
            <p className="text-sm text-gray-600">
              Ask questions about Mars and get instant answers
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
    )
}

