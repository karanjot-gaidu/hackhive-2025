import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const planets = [
  { name: "Mercury", image: "/images/mercury.jpg" },
  { name: "Venus", image: "/images/venus.jpg" },
  { name: "Earth", image: "/images/earth.jpg" },
  { name: "Mars", image: "/images/mars.jpg" },
  { name: "Jupiter", image: "/images/jupiter.jpg" },
  { name: "Saturn", image: "/images/saturn.jpg" },
  { name: "Uranus", image: "/images/uranus.jpg" },
  { name: "Neptune", image: "/images/neptune.jpg" },
  { name: "Sun", image: "/images/sun.jpg" },
  { name: "Moon", image: "/images/moon.jpg" }
];

const Search = ({setSelectedPlanet }: {setSelectedPlanet: (planet: string | null) => void }) => {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [filteredPlanets, setFilteredPlanets] = useState(planets);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const foundPlanet = planets.find(planet => planet.name.toLowerCase() === query.toLowerCase());
    if (foundPlanet) {
      setSelectedItem(foundPlanet.name);
      setSelectedPlanet(foundPlanet.name); // Open model viewer on search
    } else {
      setSelectedItem("Not a valid selection");
    }

    setQuery("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      const filtered = planets.filter(planet => planet.name.toLowerCase().includes(value.toLowerCase()));
      setFilteredPlanets(filtered);
    } else {
      setFilteredPlanets(planets);
    }
  };

  const handlePlanetClick = (planet: { name: string }) => {
    setSelectedPlanet(planet.name);
  };


  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search"
          className="w-64 border-b border-white bg-transparent text-white text-lg placeholder-gray-300 focus:outline-none py-2 pr-10 font-bold"
        />
        <button type="submit" className="absolute right-0 px-4 py-2">
          <FaSearch className="w-5 h-5 text-white" />
        </button>
      </form>

      {query && (
        <div className="mt-2 w-64 bg-gray-800 rounded-md shadow-lg">
          {filteredPlanets.map((planet) => (
            <div 
              key={planet.name} 
              className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => handlePlanetClick(planet)} // Open model viewer on planet click
            >
              <img src={planet.image} alt={planet.name} className="w-8 h-8 mr-2" />
              <span className="text-white">{planet.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
