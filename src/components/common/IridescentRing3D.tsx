import React, { useState, useEffect } from 'react';

interface IridescentRing3DProps {
  size?: number;
  className?: string;
}

export const IridescentRing3D: React.FC<IridescentRing3DProps> = ({ size = 380, className = '' }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized from -1 to 1
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const tiltX = -35 + mousePos.y * 12;
  const tiltY = 22 + mousePos.x * 15;

  return (
    <div 
      className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        perspective: '1200px'
      }}
    >
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotateZ(-18deg)`
        }}
      >
        {/* Ambient Bloom */}
        <div 
          className="absolute rounded-full opacity-45 blur-2xl animate-pulse-subtle"
          style={{
            width: size * 0.9,
            height: size * 0.5,
            background: 'radial-gradient(ellipse, #2f7be8 0%, #6b4fb8 50%, transparent 80%)'
          }}
        />

        {/* 3D Iridescent Torus Layer 1 (Outer edge) */}
        <div 
          className="absolute rounded-full border-[18px] opacity-90 transition-all duration-700"
          style={{
            width: size * 0.88,
            height: size * 0.44,
            borderColor: 'transparent',
            backgroundImage: 'linear-gradient(135deg, #d7f3e6 0%, #2f7be8 25%, #cdbbf0 50%, #c9a77a 75%, #6b4fb8 100%)',
            backgroundOrigin: 'border-box',
            boxShadow: '0 0 40px rgba(47, 123, 232, 0.45), inset 0 0 24px rgba(205, 187, 240, 0.35)'
          }}
        />

        {/* 3D Iridescent Torus Layer 2 (Specular inner ring reflection) */}
        <div 
          className="absolute rounded-full border-[2.5px] border-white/80 opacity-80"
          style={{
            width: size * 0.84,
            height: size * 0.41,
            transform: 'translate(-2px, -3px)',
            filter: 'drop-shadow(0 0 8px #ffffff)'
          }}
        />

        {/* 3D Deep Occlusion shadow underneath */}
        <div 
          className="absolute rounded-full border-[12px] border-[#050b2e]/60"
          style={{
            width: size * 0.80,
            height: size * 0.38,
            transform: 'translate(4px, 5px)'
          }}
        />

        {/* Faint Chrome Gold rim highlight */}
        <div 
          className="absolute rounded-full border-[2px] opacity-75"
          style={{
            width: size * 0.86,
            height: size * 0.42,
            borderColor: '#c9a77a',
            clipPath: 'polygon(0% 40%, 100% 40%, 100% 100%, 0% 100%)'
          }}
        />
      </div>
    </div>
  );
};
