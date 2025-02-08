import React from 'react';
import Link from 'next/link'; // Add this import

import { Card } from '../ui/card';

const CourseCard = ({ 
  title, 
  description, 
  links 
}: { 
  title: string; 
  description: string; 
  links: { text: string; href: string; }[] 
}) => (
  <Card className="p-6 space-y-4 bg-white shadow-lg rounded-lg">
    <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
    <div className="space-y-2">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {link.text}
        </Link>
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
        { text: "Start", href: "/courses/planets/solar-system/" },
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Space Science Courses
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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