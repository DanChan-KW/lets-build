import React, { useState, useEffect } from 'react';
import Brick from './Brick';
import { Translation, BrickColor, BRICK_COLORS } from '../types';

interface CircularMenuProps {
  t: Translation;
  onItemClick?: (id: string) => void;
  activeId?: string | null;
}

const LIGHT_VARIANTS = [
  '#fdebec', // RED
  '#fff1e9', // ORANGE
  '#fffee6', // YELLOW
  '#e6f6ee', // GREEN
  '#e6eef6', // DARK_BLUE
  '#e6f7fd', // LIGHT_BLUE
];

const CircularMenu: React.FC<CircularMenuProps> = ({ t, onItemClick, activeId }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const menuItems = [
    { id: 'about', label: t.buttons.about },
    { id: 'whatIs', label: t.buttons.whatIs },
    { id: 'origin', label: t.buttons.origin },
    { id: 'play', label: t.buttons.play },
    { id: 'research', label: t.buttons.research },
    { id: 'executive', label: t.buttons.executive },
    { id: 'qualifications', label: t.buttons.qualifications }
  ];

  const colors: BrickColor[] = ['RED', 'ORANGE', 'YELLOW', 'GREEN', 'DARK_BLUE', 'LIGHT_BLUE'];

  // Mobile Layout: Vertical Brick Grid
  if (isMobile) {
    return (
      <div className="w-full px-4 space-y-4 py-8">
        <div className="flex flex-col items-center justify-center mb-8">
          {/* Replicating the desktop central stack for mobile */}
          <div className="flex flex-col-reverse items-center justify-center -space-y-4 py-4">
            {colors.map((c) => (
              <Brick key={c} color={c} size="lg" />
            ))}
          </div>
          <h2 className="mt-4 text-sm font-black text-gray-400 uppercase tracking-widest">Navigation Menu</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {menuItems.map((item, index) => {
            const brickColor = Object.values(BRICK_COLORS)[index % 6];
            const isActive = activeId === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onItemClick?.(item.id)}
                className={`relative w-full overflow-hidden rounded-2xl flex items-center transition-all active:scale-95 shadow-sm border ${
                  isActive ? 'ring-2 ring-offset-2' : 'border-gray-100'
                }`}
                style={{ 
                  backgroundColor: 'white',
                  ['--tw-ring-color' as any]: brickColor
                }}
              >
                {/* Visual Brick Element on left */}
                <div className="w-4 h-full absolute left-0 top-0 bottom-0" style={{ backgroundColor: brickColor }} />
                
                <div className="flex-1 py-5 pl-8 pr-6 text-left">
                  <span className="text-base font-black text-gray-800">{item.label}</span>
                </div>

                <div className="pr-4">
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop Layout: Circular Menu
  return (
    <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center mx-auto my-12 overflow-visible">
      {/* Central Stack */}
      <div className="absolute z-10 flex flex-col-reverse items-center justify-center -space-y-4">
        {colors.map((c, i) => (
          <Brick key={c} color={c} size="lg" className="hover:scale-105 transition-transform cursor-pointer" />
        ))}
      </div>

      {/* Orbiting Buttons */}
      <div className="absolute inset-0 flex items-center justify-center">
        {menuItems.map((item, index) => {
          const angle = (index * (360 / menuItems.length)) - 90;
          const radius = 240; 
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          
          const brickColor = Object.values(BRICK_COLORS)[index % 6];
          const lightBg = LIGHT_VARIANTS[index % 6];
          const isHovered = hoveredIndex === index;
          const isActive = activeId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item.id)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`absolute circular-transition w-40 h-40 rounded-full bg-white border-2 shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 flex items-center justify-center p-4 text-center text-base font-bold leading-tight group z-20 ${isActive ? 'outline outline-4 outline-offset-4' : 'border-gray-100'}`}
              style={{
                transform: `translate(${x}px, ${y}px)`,
                backgroundColor: (isHovered || isActive) ? lightBg : 'white',
                borderColor: (isHovered || isActive) ? brickColor : '#f3f4f6',
                outlineColor: isActive ? brickColor : 'transparent'
              }}
            >
              <span className={`transition-colors ${(isHovered || isActive) ? 'text-gray-900' : 'text-gray-700'}`}>
                {item.label}
              </span>
              <div 
                className={`absolute -bottom-2 w-8 h-2 rounded-full transition-all ${(isHovered || isActive) ? 'opacity-100 animate-pulse-gentle' : 'opacity-0'}`}
                style={{ backgroundColor: brickColor }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CircularMenu;