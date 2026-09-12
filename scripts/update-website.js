const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'website', 'index.html');
let html = fs.readFileSync(targetPath, 'utf8');

// Replace all remaining multi-stops gradients
html = html.replace(/from-purple-600\s+via-indigo-600\s+to-cyan-500/g, "from-[#FF9D42] to-[#FF6B00]");
html = html.replace(/from-purple-600\s+via-indigo-600\s+to-cyan-400/g, "from-[#FF9D42] via-[#FF6B00] to-[#FFD166]");
html = html.replace(/from-purple-600\/30\s+via-cyan-500\/20\s+to-transparent/g, "from-[#FF6B00]/20 via-[#FF9D42]/10 to-transparent");
html = html.replace(/from-emerald-600\s+via-teal-500\s+to-cyan-400/g, "from-[#FF6B00] to-[#FFD166]");
html = html.replace(/from-indigo-500\s+to-cyan-400/g, "from-[#FF6B00] to-[#FFD166]");
html = html.replace(/hover:from-purple-500\s+hover:to-cyan-400/g, "hover:from-[#FFD166] hover:to-[#FF6B00]");
html = html.replace(/hover:from-purple-500\s+hover:to-indigo-500/g, "hover:from-[#FFD166] hover:to-[#FF6B00]");

// Badges & borders
html = html.replace(/cyber-badge-cyan/g, "cyber-badge");
html = html.replace(/border-cyan-400\/40/g, "border-[#FF6B00]/40");
html = html.replace(/border-cyan-400/g, "border-[#FF6B00]");
html = html.replace(/focus:border-cyan-400/g, "focus:border-[#FF6B00]");
html = html.replace(/accent-cyan-400/g, "accent-[#FF6B00]");
html = html.replace(/bg-cyan-300/g, "bg-[#FF6B00]");

// Backgrounds
html = html.replace(/bg-cyan-950\/10/g, "bg-[#111111]");
html = html.replace(/bg-purple-950\/10/g, "bg-[#111111]");
html = html.replace(/bg-slate-950\/80/g, "bg-[#050505]");
html = html.replace(/bg-slate-950/g, "bg-[#050505]");
html = html.replace(/bg-purple-500\/15/g, "bg-[#FF6B00]/15");

// Shadows
html = html.replace(/shadow-cyan-500\/20/g, "shadow-[#FF6B00]/20");
html = html.replace(/shadow-cyan-500\/30/g, "shadow-[#FF6B00]/30");
html = html.replace(/shadow-cyan-400\/50/g, "shadow-[#FF6B00]/40");
html = html.replace(/shadow-emerald-500\/30/g, "shadow-[#FF6B00]/30");

// Variable names in Three.js script
html = html.replace(/cyanLight/g, "orangeLight");
html = html.replace(/purpleLight/g, "goldLight");
html = html.replace(/Dark Blue & Electric Cyan/g, "Deep Orange & Gold Studio");

// Final clean-up of any loose 'purple' or 'cyan' in classnames
html = html.replace(/purple/gi, (match) => {
  return "orange";
});
html = html.replace(/cyan/gi, (match) => {
  return "amber";
});

// Write to website/index.html & root index.html
fs.writeFileSync(targetPath, html, 'utf8');
const rootIndexPath = path.join(__dirname, '..', 'index.html');
fs.writeFileSync(rootIndexPath, html, 'utf8');

console.log('Cleaned website/index.html and index.html completely!');
