import React from 'react';
import Link from 'next/link'; // Add this import
import { Card } from '../ui/card';
import NavBar from '../components/nav-bar';

const CourseCard = ({ 
  title, 
  description, 
  links 
}: { 
  title: string; 
  description: string; 
  links: { text: string; href: string; }[] 
}) => (
  <Card className="p-6 space-y-4 shadow-lg rounded-lg bg-gray-800">
    <h3 className="text-2xl font-bold text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
    <div className="space-y-2">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {link.text}
        </a>
      ))}
    </div>
  </Card>
);

export default function CoursesPage() {
  const courses = [
    {
      title: "Planets",
      description: "Explore the fascinating world of planets in our solar system and beyond. Learn about their characteristics, formations, and unique features.",
      links: [
        { text: "Start", href: "/courses/planets/" },
        { text: "Resume", href: "/courses/planets/basics" },
        { text: "Start-From-Scratch", href: "/courses/planets/interactive" }
      ]
    },
    {
      title: "Stars and Galaxies",
      description: "Dive into the cosmic realm of stars and galaxies. Understand stellar evolution, galaxy types, and the vast cosmic web.",
      links: [
        { text: "Star Life Cycles", href: "/courses/stars/lifecycle" },
        { text: "Galaxy Classification", href: "/courses/stars/galaxies" }
      ]
    },
    {
      title: "Space Exploration",
      description: "Learn about human achievements in space exploration, from the first satellites to modern space missions and future plans.",
      links: [
        { text: "Mission History", href: "/courses/space/history" },
        { text: "Future Missions", href: "/courses/space/future" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <NavBar/>
      <div className="max-w-7xl mt-10 mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-12">
          Space Science Courses
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 hover:scale-105 transition-all duration-300">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              description={course.description}
              links={course.links}
            />
          ))}
        </div>
      </div>
    </div>
  );
}