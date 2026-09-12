import React from 'react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919363705613?text=Hi%20RSP%2C%20I'm%20interested%20in%20your%20algorithmic%20trading%20and%20software%20solutions"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Direct WhatsApp Communication with RSP"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-xl shadow-[#25D366]/40 hover:shadow-2xl hover:shadow-[#25D366]/60 hover:scale-110 active:scale-95 transition-all duration-300 group"
    >
      {/* WhatsApp Pulse Radar Effect */}
      <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />
      
      {/* Official WhatsApp Phone in Speech Bubble Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        className="w-7 h-7 relative z-10 text-white drop-shadow-md"
      >
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.742 3.054 9.378L1.054 31.29l6.156-1.97A15.89 15.89 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0Zm9.31 22.602c-.39 1.1-1.932 2.014-3.178 2.28-.852.18-1.962.324-5.702-1.226-4.786-1.984-7.862-6.836-8.1-7.152-.228-.316-1.916-2.552-1.916-4.868 0-2.316 1.214-3.454 1.644-3.926.39-.428 1.028-.622 1.638-.622.198 0 .376.01.536.018.47.02.706.048 1.016.788.39.926 1.338 3.27 1.454 3.508.118.238.236.558.076.876-.148.326-.278.47-.516.742-.238.272-.464.48-.702.77-.218.254-.462.526-.194.996.268.462 1.192 1.968 2.56 3.188 1.76 1.568 3.242 2.054 3.704 2.282.47.228.742.19 1.014-.114.28-.316 1.19-1.39 1.508-1.866.31-.476.626-.396 1.054-.238.434.158 2.744 1.296 3.214 1.532.47.238.784.354.9.552.118.196.118 1.148-.272 2.25v.03Z" />
      </svg>
    </a>
  );
}
