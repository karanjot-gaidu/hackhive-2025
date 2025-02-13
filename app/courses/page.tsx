import React from 'react';
import Link from 'next/link';
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
  <Card className="flex flex-col p-6 rounded-lg backdrop-blur-sm border border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] text-center">
    <div className="flex flex-col flex-grow">
      {/* This first div will take the top space */}
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>

      {/* This second div will take the bottom space */}
      <div className="space-y-2 mt-auto">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="block w-full border border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 px-6 py-2 rounded-lg font-semibold text-white hover:bg-gray-800"
          >
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  </Card>
);

export default function CoursesPage() {
  const courses = [
    {
      title: "Planets",
      description: "Explore the fascinating world of planets in our solar system and beyond. Learn about their characteristics, formations, and unique features.",
      links: [
        { text: "Start", href: "/courses/planets" },
        { text: "Resume", href: "/courses/planets/basics" },
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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/space.jpg')" }}>
        <NavBar/>
        <div className="max-w-7xl mx-auto mt-20">
          <h1 className="text-4xl font-bold text-center text-white mb-12">
            Space Science Courses
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="hover:scale-105 transition-all duration-300">
                <CourseCard
                  title={course.title}
                  description={course.description}
                  links={course.links}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
