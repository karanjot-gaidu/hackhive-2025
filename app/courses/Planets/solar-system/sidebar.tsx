const chapters = [
  
  { title: "Mercury" },
  { title: "Venus"  },
  { title: "Earth" },
  { title: "Mars" },
  { title: "Jupiter" },
  { title: "Saturn" },
  { title: "Uranus"  },
  { title: "Neptune" },
];

interface SidebarProps {
  selectedPlanet: string;
  onPlanetSelect: (planet: string) => void;
}

export default function Sidebar({ selectedPlanet, onPlanetSelect }: SidebarProps) {
  return (
    <div className="w-64 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Chapters</h2>
      <nav className="space-y-2">
        {chapters.map((chapter, index) => (
          <button 
            key={index}
            onClick={() => onPlanetSelect(chapter.title)}
            className={`block w-full text-left p-2 rounded transition-colors duration-200 ${
              selectedPlanet === chapter.title 
                ? 'bg-gray-800 text-white' 
                : 'hover:bg-gray-700'
            }`}
          >
            Chapter {index + 1}: {chapter.title}
          </button>
        ))}
      </nav>
    </div>
  );
}