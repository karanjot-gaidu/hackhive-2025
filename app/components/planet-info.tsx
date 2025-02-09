import React, { useState, useEffect } from 'react';

interface PlanetInfoProps {
    planet: string;
    className?: string;
}

export default function PlanetInfo({ planet, className = "" }: PlanetInfoProps) {
    const [planetInfo, setPlanetInfo] = useState<string>("");

    useEffect(() => {
        // Simulated planet information for Venus
        const getVenusInfo = () => {
            if (planet.toLowerCase() === 'venus') {
                return `Venus is the second planet from the Sun and Earth's closest planetary neighbor.
Similar in structure and size to Earth, Venus spins slowly in the opposite direction.
Venus has a thick atmosphere that traps heat in a runaway greenhouse effect.
The average temperature on Venus is 462°C (864°F).
Key Features:
1Surface is mostly covered in volcanic features
2Has a toxic atmosphere of carbon dioxide and sulfuric acid clouds
3Named after the Roman goddess of love and beauty
4Often called Earth's "sister planet"`;
            }
            return "Please select Venus to see information";
        };

        setPlanetInfo(getVenusInfo());
    }, [planet]);

    return (
        <div className={`p-6 ${className}`}>
            <div className="relative">
                <img
                    src={planet.toLowerCase() === 'venus' ? '/planets/venus.jpg' : '/api/placeholder/400/300'}
                    alt={planet}
                    className="w-full rounded-lg"
                />
                <div className="absolute top-4 left-4 bg-black/70 text-white p-4 rounded">
                    <h2 className="text-2xl font-bold mb-2">{planet}</h2>
                    <p>Planet</p>
                    <div className="mt-4 text-sm">
                        {planetInfo.split('\n').map((line: string, index: number) => {
                            const indentMatch = line.match(/^\d+/);
                            const indentLevel = indentMatch ? Math.min(indentMatch[0].length * 4, 16) : 0;
                            
                            return (
                                <p 
                                    key={index}
                                    className={`pl-${indentLevel}`}
                                >
                                    {line}
                                </p>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}