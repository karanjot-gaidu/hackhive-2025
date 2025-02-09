import { useEffect, useState } from "react";
import { markCourseCompleted } from "@/app/db";

const chapters = [
  { title: "Mercury" },
  { title: "Venus" },
  { title: "Earth" },
  { title: "Mars" },
  { title: "Jupiter" },
  { title: "Saturn" },
  { title: "Uranus" },
  { title: "Neptune" },
];

interface SidebarProps {
  userId: string;
  selectedPlanet: string;
  onPlanetSelect: (planet: string) => void;
}

export default function Sidebar({ userId, selectedPlanet, onPlanetSelect }: SidebarProps) {
  const [completedChapters, setCompletedChapters] = useState<boolean[]>(Array(chapters.length).fill(false));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchCompletionStatus = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/user-details?user_id=${userId}`);
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch completion status: ${errorText}`);
          }
          const data = await response.json();
          const completionStatus = chapters.map((chapter, index) => data[index]?.isCompleted || false);
          setCompletedChapters(completionStatus);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchCompletionStatus();
  }, [selectedPlanet]);

  const handleCompleteCourse = async (index: number) => {
    if (!userId) return;

    await markCourseCompleted(userId, chapters[index].title);
    
    // Update completion status
    setCompletedChapters((prev) => {
      const updated = [...prev];
      updated[index] = true; // Mark current chapter as completed
      return updated;
    });

    // Auto-select the next chapter if available
    if (index + 1 < chapters.length) {
      onPlanetSelect(chapters[index + 1].title);
    }
  };

  return (
    <div className="w-64 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Chapters</h2>
      <nav className="space-y-2">
        {chapters.map((chapter, index) => {
          const isLocked = index > 0 && !completedChapters[index - 1];

          return (
            <div key={index} className="relative group">
              {/* Chapter Button */}
              <button
                onClick={() => !isLocked && onPlanetSelect(chapter.title)}
                className={`block w-full text-left p-2 rounded transition-colors duration-200 ${
                  selectedPlanet === chapter.title ? "bg-gray-800 text-white" : "hover:bg-gray-700"
                } ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLocked}
                onMouseEnter={() => isLocked && setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                Chapter {index + 1}: {chapter.title}
              </button>

              {/* Tooltip for Locked Chapters */}
              {isLocked && hoveredIndex === index && (
                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs p-2 rounded shadow-lg w-48">
                  Complete the previous chapter first.
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
