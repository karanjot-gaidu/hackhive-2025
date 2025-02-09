// app/courses/planets/solar-system/layout.tsx
import Sidebar from './sidebar';

export default function PlanetLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div className="flex h-screen">
      <Sidebar selectedPlanet={''} onPlanetSelect={function (planet: string): void {
        throw new Error('Function not implemented.');
      } } />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}