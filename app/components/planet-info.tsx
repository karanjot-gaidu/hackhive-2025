import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { checkIfCourseCompleted, markCourseCompleted } from "../db";

interface PlanetInfoProps {
    planet: string;
    className?: string;
    completedCourses: { name: string; completedAt: string }[];
    setCompletedCourses: (completedCourses: { name: string; completedAt: string }[]) => void;
}

export default function PlanetInfo({ planet, className = "", completedCourses, setCompletedCourses }: PlanetInfoProps) {
    const courses = {
        Mercury: 1,
        Venus: 2,
        Earth: 3,
        Mars: 4,
        Jupiter: 5,
        Saturn: 6,
        Uranus: 7,
        Neptune: 8,
    };

    const [planetInfo, setPlanetInfo] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useUser();
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        const checkCompletion = async () => {
            if (user?.id && planet) {
                try {
                    const response = await fetch(`/api/user-details?user_id=${user.id}&course_id=${courses[planet as keyof typeof courses]}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch completion status');
                    }
                    const data = await response.json();
                    setIsCompleted(data.isCompleted);
                } catch (err) {
                    console.error(err);
                    setError('Error fetching completion status');
                }
            }
        };
        checkCompletion();
    }, [user, planet]);

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
                console.error("Error loading planet information:", error);
                setError(`Unable to load information for ${planet}`);
            } finally {
                setIsLoading(false);
            }
        };
        loadPlanetInfo();
    }, [planet]);

    const formattedText = (text: string) => {
        return text.split("\n").map((line: string, index: number) => {
            if (line.startsWith("Chapter")) {
                return (
                    <h2 key={index} className="text-3xl font-bold mt-6">
                        {line}
                    </h2>
                );
            } else if (/^\d+\.\d+\.\d+/.test(line)) {
                return (
                    <h4 key={index} className="text-lg font-semibold mt-4">
                        {line}
                    </h4>
                );
            } else if (/^\d+\.\d+/.test(line)) {
                return (
                    <h3 key={index} className="text-xl font-bold mt-5">
                        {line}
                    </h3>
                );
            } else if (line.includes(":")) {
                const [title, value] = line.split(":");
                return (
                    <p key={index} className="ml-4">
                        <span className="font-semibold">{title.trim()}:</span> {value.trim()}
                    </p>
                );
            } else {
                return (
                    <p key={index} className="ml-4">
                        {line}
                    </p>
                );
            }
        });
    };

    const handleMarkCompleted = async () => {
        try {
            if (!user?.id) {
                setError('User must be logged in');
                return;
            }

            const response = await fetch('/api/user-details', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user.id,
                    course_name: planet,
                    course_id: courses[planet as keyof typeof courses]
                })
            });

            if (!response.ok) {
                throw new Error('Failed to mark course as completed');
            }

            setIsCompleted(true);
            // Update the completedCourses array with the new completion
            const newCompletion: { name: string; completedAt: string } = { name: planet, completedAt: new Date().toISOString() };
            setCompletedCourses([...completedCourses, newCompletion]);
        } catch (err) {
            console.error(err);
            setError('Error marking course as completed');
        }
    };

    return (
        <div className={`p-6 ${className}`}>
            <div className="relative">
                <img
                    src={`/images/${planet.toLowerCase()}.jpg`}
                    alt={planet}
                    className="w-full rounded-lg"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/api/placeholder/400/300";
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

                        {/* Conditionally Render Complete Course Button */}
                        {isCompleted === null ? (
                            <p>Loading...</p>
                        ) : isCompleted ? (
                            <div className="mt-10 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-600 transition text-center">
                                <p>Course completed!</p>
                            </div>
                        ) : (
                            <button
                                onClick={handleMarkCompleted}
                                className="mt-10 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-center"
                            >
                                Complete Course
                            </button>
                        )}
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
