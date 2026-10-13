import React from 'react';

interface AuroraBackgroundProps {
  className?: string;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({ className = '' }) => {
  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}>
      {/* Base deep background: rich dark navy into pitch black */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(145deg, #050b2e 0%, #07060d 35%, #000000 70%, #07060d 100%)'
        }}
      />

      {/* Atmospheric blended color meshes in the brand palette */}
      {/* 1. Teal & Mint atmospheric glow */}
      <div 
        className="absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] rounded-full blur-[130px] opacity-40 animate-pulse-subtle"
        style={{
          background: 'radial-gradient(circle, #0e9aa7 0%, #2f7be8 45%, transparent 75%)',
          animationDuration: '9s'
        }}
      />

      {/* 2. Soft Mint light accent near top edge */}
      <div 
        className="absolute -top-[5%] left-[25%] w-[40vw] h-[30vw] rounded-full blur-[100px] opacity-20"
        style={{
          background: 'radial-gradient(ellipse, #d7f3e6 0%, #0e9aa7 50%, transparent 80%)'
        }}
      />

      {/* 3. Royal Blue & Azure central illumination */}
      <div 
        className="absolute top-[25%] left-[15%] w-[55vw] h-[50vw] rounded-full blur-[140px] opacity-25 animate-pulse-subtle"
        style={{
          background: 'radial-gradient(circle, #2f7be8 0%, #1d4ed8 50%, transparent 80%)',
          animationDuration: '12s'
        }}
      />

      {/* 4. Violet & Lilac ambient field */}
      <div 
        className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full blur-[130px] opacity-25 animate-pulse-subtle"
        style={{
          background: 'radial-gradient(circle, #6b4fb8 0%, #cdbbf0 40%, transparent 75%)',
          animationDuration: '14s'
        }}
      />

      {/* 5. Deep Indigo & Crimson mood blend */}
      <div 
        className="absolute -bottom-[15%] left-[10%] w-[70vw] h-[55vw] rounded-full blur-[140px] opacity-30 animate-pulse-subtle"
        style={{
          background: 'radial-gradient(circle, #8c2b3d 0%, #3b2a8f 50%, transparent 80%)',
          animationDuration: '11s'
        }}
      />

      {/* 6. Subtle soft lilac center wash */}
      <div 
        className="absolute top-[45%] left-[30%] w-[45vw] h-[40vw] rounded-full blur-[120px] opacity-15"
        style={{
          background: 'radial-gradient(circle, #cdbbf0 0%, #6b4fb8 60%, transparent 80%)'
        }}
      />

      {/* Fine texture overlay */}
      <div className="film-grain" />
    </div>
  );
};
