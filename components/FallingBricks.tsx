
import React, { useEffect, useState, useRef } from 'react';
import { BRICK_COLORS, BrickColor } from '../types';

interface FallenBrick {
  id: number;
  color: string;
  left: number;
  rotate: number;
  delay: number;
  duration: number;
}

const FallingBricks: React.FC = () => {
  const [bricks, setBricks] = useState<FallenBrick[]>([]);
  const idRef = useRef(0);
  const colorKeys = Object.keys(BRICK_COLORS) as BrickColor[];

  useEffect(() => {
    // 定時生成新的積木
    const interval = setInterval(() => {
      if (bricks.length > 50) return; // 限制總數以保持效能

      const newBrick: FallenBrick = {
        id: idRef.current++,
        color: BRICK_COLORS[colorKeys[Math.floor(Math.random() * colorKeys.length)]],
        left: Math.random() * 100, // 0 - 100% 寬度
        rotate: Math.random() * 360,
        delay: 0,
        duration: 2 + Math.random() * 2 // 掉落速度 2-4 秒
      };

      setBricks(prev => [...prev, newBrick]);
    }, 1500);

    return () => clearInterval(interval);
  }, [bricks.length]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        @keyframes fallAndStack {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100vh - 40px)) rotate(var(--target-rotate));
            opacity: 0.8;
          }
        }
        .falling-brick {
          position: absolute;
          top: 0;
          width: 40px;
          height: 20px;
          border-radius: 4px;
          box-shadow: inset -2px -2px 0 rgba(0,0,0,0.1), 2px 2px 5px rgba(0,0,0,0.05);
          animation: fallAndStack var(--duration) linear forwards;
        }
        /* 模擬積木上面的突起點 */
        .falling-brick::before {
          content: '';
          position: absolute;
          top: -4px;
          left: 4px;
          right: 4px;
          height: 4px;
          background: inherit;
          filter: brightness(1.1);
          border-radius: 2px 2px 0 0;
          opacity: 0.6;
        }
      `}</style>
      {bricks.map(brick => (
        <div
          key={brick.id}
          className="falling-brick"
          style={{
            left: `${brick.left}%`,
            backgroundColor: brick.color,
            '--duration': `${brick.duration}s`,
            '--target-rotate': `${brick.rotate}deg`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default FallingBricks;
