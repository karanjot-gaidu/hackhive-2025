"use client"
import NavBar from '../components/nav-bar';
import React from 'react';
import { useRouter } from 'next/navigation';

const DecorativePlanet = ({ 
  size,
  color,
  orbitSize,
  duration,
  delay,
  offsetY = 0 
}: {
  size: number;
  color: string;
  orbitSize: number;
  duration: number;
  delay: number;
  offsetY?: number;
}) => (
  <div 
    className={`absolute rounded-full animate-orbit`}
    style={{
      width: orbitSize,
      height: orbitSize,
      animation: `orbit ${duration}s linear infinite`,
      animationDelay: `${delay}s`,
      top: `calc(50% - ${orbitSize/2}px + ${offsetY}px)`,
      left: `calc(50% - ${orbitSize/2}px)`,
    }}
  >
    <div 
      className="absolute rounded-full animate-spin"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        top: -size/2,
        left: `calc(50% - ${size/2}px)`,
        boxShadow: `0 0 ${size/2}px ${color}`,
        animation: `spin ${duration * 0.7}s linear infinite`,
      }}
    />
  </div>
);

const AboutPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen text-white p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-repeat-y" style={{ backgroundImage: 'url(/space.jpg)' }}>
        {/* Decorative Planets */}
        <NavBar/>
      </div>

      <style jsx global>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-orbit {
          transform-origin: center center;
        }
      `}</style>
      
      <DecorativePlanet size={20} color="#FF6B6B" orbitSize={300} duration={20} delay={0} offsetY={-100} />
      <DecorativePlanet size={15} color="#4ECDC4" orbitSize={400} duration={25} delay={5} offsetY={100} />
      <DecorativePlanet size={25} color="#FFD93D" orbitSize={500} duration={30} delay={2} offsetY={-50} />
      <DecorativePlanet size={18} color="#95A5A6" orbitSize={600} duration={35} delay={8} offsetY={150} />

      {/* Content Container with backdrop blur */}
      <div className="relative z-10 mt-10">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Explore The Solar System
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              An interactive journey through our cosmic neighborhood
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <div className="bg-blue-900/30 p-6 rounded-lg backdrop-blur-sm hover:bg-blue-800/30 transition-colors">
            <h3 className="text-2xl font-semibold mb-4">Interactive 3D Models</h3>
            <p className="text-gray-300">
              Explore detailed 3D models of planets with full rotation and zoom capabilities. 
              Experience the solar system like never before.
            </p>
          </div>

          <div className="bg-blue-900/30 p-6 rounded-lg backdrop-blur-sm hover:bg-blue-800/30 transition-colors">
            <h3 className="text-2xl font-semibold mb-4">Real-time Data</h3>
            <p className="text-gray-300">
              Access up-to-date information about each celestial body, including size, 
              distance from the Sun, and unique characteristics.
            </p>
          </div>

          <div className="bg-blue-900/30 p-6 rounded-lg backdrop-blur-sm hover:bg-blue-800/30 transition-colors">
            <h3 className="text-2xl font-semibold mb-4">Educational Journey</h3>
            <p className="text-gray-300">
              Learn fascinating facts about each planet through our interactive 
              interface designed for both beginners and space enthusiasts.
            </p>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-blue-900/30 p-8 rounded-lg backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6">Built with Modern Technology</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xl font-semibold mb-3">Frontend Stack</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Next.js for robust performance</li>
                  <li>• Three.js for 3D rendering</li>
                  <li>• Tailwind CSS for responsive design</li>
                  <li>• Model-viewer for 3D interactions</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3">Features</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Interactive 3D planet models</li>
                  <li>• Real-time planet information</li>
                  <li>• Responsive design for all devices</li>
                  <li>• Smooth animations and transitions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Explore?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Start your journey through the solar system and discover the wonders of space.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
          onClick={() => router.push("/")}
          >
            Begin Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
