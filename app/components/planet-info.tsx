import React, { useState, useEffect } from 'react';

interface PlanetInfoProps {
    planet: string;
    className?: string;
}

export default function PlanetInfo({ planet, className = "" }: PlanetInfoProps) {
    const [planetInfo, setPlanetInfo] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPlanetInfo = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/planets/${planet.toLowerCase()}`);
                if (!response.ok) {
                    throw new Error(`Failed to load information for ${planet}`);
                }
                const text = await response.text();
                setPlanetInfo(text);
            } catch (error) {
                console.error('Error loading planet information:', error);
                setError(`Unable to load information for ${planet}`);
            } finally {
                setIsLoading(false);
            }
        };
        loadPlanetInfo();
    }, [planet]);

    const formattedText = (text: string) => {
        return text.split('\n').map((line: string, index: number) => {
            if (line.startsWith("Chapter")) {
                return <h2 key={index} className="text-3xl font-bold mt-6">{line}</h2>;
            } else if (/^\d+\.\d+\.\d+/.test(line)) {
                return <h4 key={index} className="text-lg font-semibold mt-4">{line}</h4>;
            } else if (/^\d+\.\d+/.test(line)) {
                return <h3 key={index} className="text-xl font-bold mt-5">{line}</h3>;
            } else if (line.includes(":")) {
                const [title, value] = line.split(":");
                return (
                    <p key={index} className="ml-4">
                        <span className="font-semibold">{title.trim()}:</span> {value.trim()}
                    </p>
                );
            } else {
                return <p key={index} className="ml-4">{line}</p>;
            }
        });
    };

    return (
        <div className={`p-6 ${className}`}>
            <div className="relative">
                <img
                    src={`/planets/${planet.toLowerCase()}.jpg`}
                    alt={planet}
                    className="w-full rounded-lg"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/api/placeholder/400/300';
                    }}
                />
                <div className="absolute top-4 left-4 bg-black/70 text-white p-4 rounded">
                    <h2 className="text-2xl font-bold mb-2">{planet}</h2>
                    <div className="mt-4 text-sm">
                        {isLoading ? (
                            <p>Loading planet information...</p>
                        ) : error ? (
                            <p className="text-red-400">{error}</p>
                        ) : (
                            formattedText(planetInfo)
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
