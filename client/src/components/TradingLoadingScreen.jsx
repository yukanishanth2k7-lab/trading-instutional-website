import React, { useState, useEffect } from 'react';
import RSPLogo from './RSPLogo';

export default function TradingLoadingScreen({ onFinished }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1050; // Smooth, calm, restrained (subtle and quick)

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onFinished) onFinished();
          }, 450);
        }, 200);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onFinished]);

  // Clean, professional upward trajectory
  const points = [
    { x: 0, y: 70 },
    { x: 60, y: 64 },
    { x: 120, y: 55 },
    { x: 180, y: 58 },
    { x: 240, y: 44 },
    { x: 300, y: 38 },
    { x: 360, y: 24 },
    { x: 420, y: 16 },
    { x: 480, y: 8 },
  ];

  const currentX = (progress / 100) * 480;
  const pathD = points.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');
  const areaD = `${pathD} L 480 80 L 0 80 Z`;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center select-none transition-opacity duration-500 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-sm w-full px-6 text-center">
        {/* Exact Logo with transparent background - clean and simple */}
        <div className="mb-8">
          <RSPLogo className="h-16 sm:h-20" />
        </div>

        {/* Professional Minimalist Trading Graph Loading Bar */}
        <div className="w-full bg-[#0d0f14] border border-white/10 rounded-2xl p-4 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between text-xs font-mono text-[#A3A3A3] pb-2 border-b border-white/5">
            <span className="text-[11px] tracking-wider uppercase">Loading Systems</span>
            <span className="font-semibold text-[#10B981]">{progress}%</span>
          </div>

          {/* Minimalist SVG Trading Line Chart */}
          <div className="relative w-full h-20 my-2 overflow-hidden">
            {/* Subtle Gridlines */}
            <div className="absolute inset-0 flex flex-col justify-between py-1 pointer-events-none opacity-10">
              <div className="border-b border-dashed border-white" />
              <div className="border-b border-dashed border-white" />
            </div>

            <svg viewBox="0 0 480 80" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <linearGradient id="proGreenFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </linearGradient>
              </defs>

              <clipPath id="chartClip">
                <rect x="0" y="0" width={currentX} height="80" />
              </clipPath>

              {/* Area */}
              <path
                d={areaD}
                fill="url(#proGreenFill)"
                clipPath="url(#chartClip)"
              />

              {/* Smooth Green Upward Line */}
              <path
                d={pathD}
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                clipPath="url(#chartClip)"
              />
            </svg>
          </div>

          {/* Clean Thin Progress Bar */}
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-[#10B981] rounded-full transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
