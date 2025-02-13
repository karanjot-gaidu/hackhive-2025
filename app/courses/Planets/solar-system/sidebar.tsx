import { useEffect, useState } from "react";

const chapters = [
  "Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"
];

interface SidebarProps {
  userId: string;
  selectedPlanet: string;
  onPlanetSelect: (planet: string) => void;
  completedCourses: { name: string; completedAt: string }[];
}

export default function Sidebar({ userId, selectedPlanet, onPlanetSelect, completedCourses }: SidebarProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isPlanetCompleted = (planetName: string) => {
    return completedCourses.some(course => course.name === planetName);
  };

  const isPlanetLocked = (index: number) => {
    if (index === 0) return false; // Mercury is always unlocked
    return !isPlanetCompleted(chapters[index - 1]);
  };

  useEffect(() => {
    // Find the first unlocked and incomplete planet
    const nextUncompletedPlanet = chapters.find(
      (planet, index) => !isPlanetCompleted(planet) && !isPlanetLocked(index)
    );

    if (nextUncompletedPlanet && nextUncompletedPlanet !== selectedPlanet) {
      console.log(`Auto-selecting next available planet: ${nextUncompletedPlanet}`);
      onPlanetSelect(nextUncompletedPlanet);
    }
  }, [completedCourses, selectedPlanet, onPlanetSelect]);

  return (
    <div className="w-64 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Chapters</h2>
      <nav className="space-y-2">
        {chapters.map((chapter, index) => {
          const isLocked = isPlanetLocked(index);
          const isCompleted = isPlanetCompleted(chapter);

          return (
            <div key={index} className="relative group">
              <button
                onClick={() => !isLocked && onPlanetSelect(chapter)}
                className={`block w-full text-left p-2 rounded transition-colors duration-200 
                  ${selectedPlanet === chapter ? "bg-gray-800 text-white" : "hover:bg-gray-700"}
                  ${isLocked ? "opacity-50 cursor-not-allowed" : ""}
                  ${isCompleted ? "bg-green-800" : ""}`}
                disabled={isLocked}
                onMouseEnter={() => isLocked && setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex justify-between items-center">
                  <span>Chapter {index + 1}: {chapter}</span>
                  {isCompleted && <span className="text-green-400">✓</span>}
                </div>
              </button>
              {isLocked && hoveredIndex === index && (
                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs p-2 rounded shadow-lg w-48 z-50">
                  Complete {chapters[index - 1]} first.
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
