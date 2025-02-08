// app/courses/planets/solar-system/sidebar.tsx
import Link from 'next/link';

const chapters = [
  { title: "Mars", href: "/courses/planets/solar-system/mars" },
  { title: "Venus", href: "/courses/planets/solar-system/venus" },
  { title: "Jupiter", href: "/courses/planets/solar-system/jupiter" },
  { title: "Saturn", href: "/courses/planets/solar-system/saturn" },
  { title: "Mercury", href: "/courses/planets/solar-system/mercury" },
  { title: "Uranus", href: "/courses/planets/solar-system/uranus" },
  { title: "Neptune", href: "/courses/planets/solar-system/neptune" },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Chapters</h2>
      <nav className="space-y-2">
        {chapters.map((chapter, index) => (
          <Link 
            key={chapter.href}
            href={chapter.href}
            className="block p-2 hover:bg-gray-800 rounded"
          >
            Chapter {index + 1}: {chapter.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}