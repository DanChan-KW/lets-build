
import React from 'react';
import { BrickColor, BRICK_COLORS } from '../types';

interface BrickProps {
  color: BrickColor;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Brick: React.FC<BrickProps> = ({ color, className = '', size = 'md' }) => {
  const bgColor = BRICK_COLORS[color];
  
  // DUPLO 2x4 Proportions (Approx 2:1)
  const scale = size === 'sm' ? 0.5 : size === 'md' ? 0.8 : 1.2;
  const width = 64 * scale;
  const height = 24 * scale;
  const studRadius = 6 * scale;

  return (
    <div 
      className={`relative flex flex-col items-center ${className}`}
      style={{ width: `${width}px` }}
    >
      {/* Top Studs (2x4) */}
      <div className="flex gap-1 mb-[2px]">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div 
              className="rounded-full shadow-inner"
              style={{ 
                width: `${studRadius * 2}px`, 
                height: `${studRadius}px`, 
                backgroundColor: bgColor,
                filter: 'brightness(1.1)' 
              }}
            />
            <div 
              className="rounded-full shadow-inner"
              style={{ 
                width: `${studRadius * 2}px`, 
                height: `${studRadius}px`, 
                backgroundColor: bgColor,
                filter: 'brightness(1.1)' 
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Brick Body */}
      <div 
        className="rounded-sm shadow-lg border-b-4 border-r-2"
        style={{ 
          width: '100%', 
          height: `${height}px`, 
          backgroundColor: bgColor,
          borderColor: 'rgba(0,0,0,0.1)'
        }}
      />
    </div>
  );
};

export default Brick;
