const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'website', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Replace the loading screen in website/index.html with the simplified, professional trading graph
const simplifiedLoaderHtml = `
  <!-- Professional Minimalist Trading Graph Loading Screen -->
  <div id="trading-loading-screen" class="fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center select-none transition-opacity duration-500">
    <div class="flex flex-col items-center max-w-sm w-full px-6 text-center">
      <!-- Exact Logo with background removed -->
      <div class="mb-8">
        <img src="./logo-transparent.png" alt="Reverie Synaptic Pulse" class="h-16 sm:h-20 w-auto object-contain" />
      </div>

      <!-- Professional Minimalist Trading Graph Loading Bar -->
      <div class="w-full bg-[#0d0f14] border border-white/10 rounded-2xl p-4 shadow-xl">
        <div class="flex items-center justify-between text-xs font-mono text-[#A3A3A3] pb-2 border-b border-white/5">
          <span class="text-[11px] tracking-wider uppercase">Loading Systems</span>
          <span id="loader-pct" class="font-semibold text-[#10B981]">0%</span>
        </div>

        <div class="relative w-full h-20 my-2 overflow-hidden">
          <div class="absolute inset-0 flex flex-col justify-between py-1 pointer-events-none opacity-10">
            <div class="border-b border-dashed border-white"></div>
            <div class="border-b border-dashed border-white"></div>
          </div>

          <svg viewBox="0 0 480 80" preserveAspectRatio="none" class="w-full h-full">
            <defs>
              <linearGradient id="proGreenFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#10B981" stop-opacity="0.25"/>
                <stop offset="100%" stop-color="#10B981" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <clipPath id="chartClip">
              <rect id="chart-clip-rect" x="0" y="0" width="0" height="80" />
            </clipPath>
            <path d="M 0 70 L 60 64 L 120 55 L 180 58 L 240 44 L 300 38 L 360 24 L 420 16 L 480 8 L 480 80 L 0 80 Z" fill="url(#proGreenFill)" clip-path="url(#chartClip)"/>
            <path d="M 0 70 L 60 64 L 120 55 L 180 58 L 240 44 L 300 38 L 360 24 L 420 16 L 480 8" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" clip-path="url(#chartClip)"/>
          </svg>
        </div>

        <div class="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-1">
          <div id="loader-bar" class="h-full bg-[#10B981] rounded-full w-0 transition-all duration-75"></div>
        </div>
      </div>
    </div>
  </div>
`;

// Replace existing loading screen if present
if (html.includes('id="trading-loading-screen"')) {
  html = html.replace(
    /<!-- (Trading Graph Loading Screen|Professional Minimalist Trading Graph Loading Screen)[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
    simplifiedLoaderHtml.trim()
  );
} else {
  html = html.replace('<body class="bg-[#050505] text-[#F5F5F0] overflow-x-hidden antialiased">', '<body class="bg-[#050505] text-[#F5F5F0] overflow-x-hidden antialiased">\n' + simplifiedLoaderHtml);
}

// 2. Simplified Loading Script (1.4s, calm, professional)
const simplifiedScript = `
    // Professional Minimalist Graph Loader
    (function initTradingLoader() {
      const screen = document.getElementById('trading-loading-screen');
      if (!screen) return;
      const startTime = Date.now();
      const duration = 1400;

      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min(100, Math.round((elapsed / duration) * 100));
        
        const clipRect = document.getElementById('chart-clip-rect');
        const pctEl = document.getElementById('loader-pct');
        const barEl = document.getElementById('loader-bar');

        if (clipRect) clipRect.setAttribute('width', (pct / 100) * 480);
        if (pctEl) pctEl.innerText = pct + '%';
        if (barEl) barEl.style.width = pct + '%';

        if (pct >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            screen.style.opacity = '0';
            setTimeout(() => { screen.style.display = 'none'; }, 500);
          }, 200);
        }
      }, 20);
    })();
`;

if (html.includes('initTradingLoader()')) {
  html = html.replace(
    /\/\/ (Smooth Trading Graph Loading Screen Transition|Professional Minimalist Graph Loader)[\s\S]*?\}\)\(\);/,
    simplifiedScript.trim()
  );
}

// 3. Replace navbar brand logo with exact transparent image
html = html.replace(
  /<div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-\[#FF6B00\] to-\[#FFD166\][\s\S]*?Systems • Strategy • Scale\s*<\/div>\s*<\/div>/,
  `<img src="./logo-transparent.png" alt="Reverie Synaptic Pulse" class="h-10 sm:h-12 w-auto object-contain" />`
);

// 4. Replace footer brand logo with exact transparent image
html = html.replace(
  /<div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-\[#FF6B00\] to-\[#FFD166\][\s\S]*?REVERIE SYNAPTIC PULSE\s*<\/span>\s*<\/div>/,
  `<img src="./logo-transparent.png" alt="Reverie Synaptic Pulse" class="h-10 sm:h-12 w-auto object-contain" />`
);

fs.writeFileSync(filePath, html, 'utf8');
const rootPath = path.join(__dirname, '..', 'index.html');
fs.writeFileSync(rootPath, html, 'utf8');

console.log('Successfully updated standalone website with exact transparent logo and professional simplified graph loader!');
