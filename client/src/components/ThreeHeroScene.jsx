import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Full-screen Interactive 3D Hero Background for Reverie Synaptic Pulse.
 * 
 * Scene: Dark navy void (#050912) with a flowing network of neural-synapse nodes
 * morphing into candlestick / price-action data streams.
 * Accents: Cool Electric Blue (#3D8BFF) and Gold (#D4AF37) only.
 * High-trust fintech aesthetic: Restrained, intelligent, expensive (Stripe/Linear caliber).
 */
export default function ThreeHeroScene() {
  const containerRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    // Near-black navy void background
    scene.background = new THREE.Color(0x050912);
    scene.fog = new THREE.FogExp2(0x050912, 0.032);

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Master group for smooth parallax rotation
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // --- 2. Color Palette Constants ---
    const COLOR_ORANGE = new THREE.Color(0xFF6B00);   // Primary Brand Theme: Signature Orange
    const COLOR_GOLD = new THREE.Color(0xF59E0B);     // Institutional Gold / Amber
    const COLOR_BLUE = new THREE.Color(0x38BDF8);     // Tech Cyan / Synapse Blue
    const COLOR_EMERALD = new THREE.Color(0x10B981);  // Algorithmic Market Green
    const COLOR_NAVY = new THREE.Color(0x060c18);     // Deep ambient node color

    // --- 3. Neural-Synaptic Nodes (45–55 Particle Nodes at varying depths) ---
    const nodeCount = 52;
    const nodes = [];
    const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);

    // Soft glowing node texture generator for bokeh effect
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(61, 139, 255, 1)');
      grad.addColorStop(0.3, 'rgba(61, 139, 255, 0.45)');
      grad.addColorStop(0.8, 'rgba(61, 139, 255, 0.08)');
      grad.addColorStop(1, 'rgba(5, 9, 18, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const glowTexture = createGlowTexture();

    for (let i = 0; i < nodeCount; i++) {
      // Natural distribution across 3D space with varying depths
      const x = (Math.random() - 0.5) * 24;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 16 - 2;

      // Base sphere mesh
      const mat = new THREE.MeshBasicMaterial({
        color: COLOR_BLUE,
        transparent: true,
        opacity: 0.85,
      });
      const mesh = new THREE.Mesh(nodeGeo, mat);
      mesh.position.set(x, y, z);
      masterGroup.add(mesh);

      // Bokeh glow billboard sprite attached to each node
      const spriteMat = new THREE.SpriteMaterial({
        map: glowTexture,
        color: COLOR_BLUE,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
      });
      const sprite = new THREE.Sprite(spriteMat);
      // Distance-based depth scaling for bokeh blur
      const depthFactor = Math.max(0.4, (z + 10) / 10);
      sprite.scale.set(1.4 * depthFactor, 1.4 * depthFactor, 1);
      mesh.add(sprite);

      nodes.push({
        mesh,
        mat,
        sprite,
        spriteMat,
        basePos: new THREE.Vector3(x, y, z),
        driftSpeedX: 0.2 + Math.random() * 0.3,
        driftSpeedY: 0.15 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
        currentGold: 0, // 0 = blue, 1 = gold
      });
    }

    // --- 4. Synaptic Neural Graph Connector Lines ---
    const lineMat = new THREE.LineBasicMaterial({
      color: COLOR_BLUE,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });

    const maxDistance = 4.8;
    const connections = [];

    // Pre-calculate nearest connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].basePos.distanceTo(nodes[j].basePos);
        if (dist < maxDistance) {
          connections.push({
            nodeA: nodes[i],
            nodeB: nodes[j],
            pulse: 0, // 0..1 pulse position along line
            active: false,
            intensity: 0,
          });
        }
      }
    }

    // Dynamic line geometry buffer
    const lineGeo = new THREE.BufferGeometry();
    const linePos = new Float32Array(connections.length * 6);
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
    masterGroup.add(lineMesh);

    // --- 5. Synaptic Fire Pulses (Traveling Light Pulses) ---
    // Moving photons that travel along active edges illuminating signature orange & gold
    const pulseGeo = new THREE.SphereGeometry(0.15, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: COLOR_ORANGE,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });

    const pulsePackets = [];
    for (let p = 0; p < 8; p++) {
      const pMesh = new THREE.Mesh(pulseGeo, pulseMat);
      pMesh.visible = false;
      masterGroup.add(pMesh);

      // Signature Orange & Gold halo sprite
      const pSpriteMat = new THREE.SpriteMaterial({
        map: glowTexture,
        color: p % 2 === 0 ? COLOR_ORANGE : COLOR_GOLD,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });
      const pSprite = new THREE.Sprite(pSpriteMat);
      pSprite.scale.set(1.9, 1.9, 1);
      pMesh.add(pSprite);

      pulsePackets.push({
        mesh: pMesh,
        connection: null,
        progress: 0,
        speed: 0.012 + Math.random() * 0.016,
        cooldown: Math.random() * 120, // Organic timing
      });
    }

    // --- 6. Ascending Candlestick / Price-Action Data Stream ---
    // Woven through the particle field: thin translucent geometric candlesticks & market ribbon
    const candleGroup = new THREE.Group();
    masterGroup.add(candleGroup);

    const candleCount = 22;
    const candleData = [];

    // Generate ascending realistic algorithmic trend
    let basePrice = -3.2;
    for (let c = 0; c < candleCount; c++) {
      const cx = -11.5 + (c * 1.15);
      const step = (Math.random() - 0.38) * 0.75 + 0.32; // upward bias
      basePrice += step;
      const cy = basePrice;
      const cz = -2.5 + Math.sin(c * 0.45) * 2.0;

      const isBull = step > 0;
      const height = 0.3 + Math.random() * 0.8;
      const wickHeight = height + 0.4 + Math.random() * 0.6;

      // Candle body (thin rectangular prism)
      const bodyGeo = new THREE.BoxGeometry(0.42, height, 0.28);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: isBull ? COLOR_GOLD : COLOR_BLUE,
        emissive: isBull ? 0x997515 : 0x1a3d80,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.45,
        roughness: 0.2,
        metalness: 0.8,
      });
      const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
      bodyMesh.position.set(cx, cy, cz);
      candleGroup.add(bodyMesh);

      // Wick (thin vertical line)
      const wickGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(cx, cy - wickHeight / 2, cz),
        new THREE.Vector3(cx, cy + wickHeight / 2, cz),
      ]);
      const wickMat = new THREE.LineBasicMaterial({
        color: isBull ? COLOR_GOLD : COLOR_BLUE,
        transparent: true,
        opacity: 0.4,
      });
      const wickLine = new THREE.Line(wickGeo, wickMat);
      candleGroup.add(wickLine);

      candleData.push({ bodyMesh, wickLine, baseX: cx, baseY: cy, baseZ: cz, isBull, phase: c * 0.3 });
    }

    // Faint live market price-action curve ribbon
    const curvePoints = candleData.map((cd) => new THREE.Vector3(cd.baseX, cd.baseY, cd.baseZ));
    const splineCurve = new THREE.CatmullRomCurve3(curvePoints);
    const splineGeo = new THREE.BufferGeometry().setFromPoints(splineCurve.getPoints(80));
    const splineMat = new THREE.LineBasicMaterial({
      color: COLOR_BLUE,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const splineLine = new THREE.Line(splineGeo, splineMat);
    candleGroup.add(splineLine);

    // --- 7. Lighting ---
    // Deep dark navy ambient
    const ambientLight = new THREE.AmbientLight(0x0a1428, 1.8);
    scene.add(ambientLight);

    // Primary Electric Blue key light
    const keyBlueLight = new THREE.PointLight(0x3D8BFF, 4.0, 30);
    keyBlueLight.position.set(-6, 4, 10);
    scene.add(keyBlueLight);

    // Soft Gold accent rim light
    const rimGoldLight = new THREE.PointLight(0xD4AF37, 3.2, 28);
    rimGoldLight.position.set(8, -3, 8);
    scene.add(rimGoldLight);

    // --- 8. Smooth Lerped Parallax & Drift Dynamics ---
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      // Maximum 5-8° tilt (0.08 - 0.12 radians) for restrained elegance
      targetTiltY = nx * 0.085;
      targetTiltX = -ny * 0.065;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- 9. Scroll Reactivity ---
    let scrollY = window.scrollY || 0;
    const handleScroll = () => {
      scrollY = window.scrollY || 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- 10. Animation Loop ---
    const clock = new THREE.Clock();

    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Cubic / smooth lerped parallax follow
      currentTiltX += (targetTiltX - currentTiltX) * 0.035;
      currentTiltY += (targetTiltY - currentTiltY) * 0.035;

      // Parallax rotation plus subtle continuous drift
      masterGroup.rotation.x = currentTiltX + Math.sin(time * 0.15) * 0.015;
      masterGroup.rotation.y = currentTiltY + Math.cos(time * 0.18) * 0.02;

      // Scroll responsiveness: gently recede camera depth
      const scrollRecede = Math.min(6.0, scrollY * 0.007);
      camera.position.z = 16 + scrollRecede;
      camera.position.y = -(scrollY * 0.003);

      // Node organic drift and positions update
      nodes.forEach((n) => {
        const driftY = Math.sin(time * n.driftSpeedY + n.phase) * 0.45;
        const driftX = Math.cos(time * n.driftSpeedX + n.phase) * 0.35;
        n.mesh.position.y = n.basePos.y + driftY;
        n.mesh.position.x = n.basePos.x + driftX;

        // Smooth signature orange & gold decay back to synapse blue
        if (n.currentGold > 0) {
          n.currentGold = Math.max(0, n.currentGold - 0.018);
          n.mat.color.copy(COLOR_BLUE).lerp(COLOR_ORANGE, n.currentGold);
          n.spriteMat.color.copy(COLOR_BLUE).lerp(COLOR_ORANGE, n.currentGold);
          n.sprite.scale.set(
            (1.4 + n.currentGold * 0.9),
            (1.4 + n.currentGold * 0.9),
            1
          );
        }
      });

      // Update line connections buffer
      const posAttr = lineGeo.attributes.position;
      let ptr = 0;
      for (let i = 0; i < connections.length; i++) {
        const c = connections[i];
        const pA = c.nodeA.mesh.position;
        const pB = c.nodeB.mesh.position;

        posAttr.array[ptr++] = pA.x;
        posAttr.array[ptr++] = pA.y;
        posAttr.array[ptr++] = pA.z;

        posAttr.array[ptr++] = pB.x;
        posAttr.array[ptr++] = pB.y;
        posAttr.array[ptr++] = pB.z;
      }
      posAttr.needsUpdate = true;

      // Process traveling synaptic fire pulses
      pulsePackets.forEach((pkt) => {
        if (!pkt.connection) {
          pkt.cooldown--;
          if (pkt.cooldown <= 0) {
            // Pick a random connection to fire along
            const randomConn = connections[Math.floor(Math.random() * connections.length)];
            if (randomConn) {
              pkt.connection = randomConn;
              pkt.progress = 0;
              pkt.mesh.visible = true;
              // Briefly trigger gold on origin node
              pkt.connection.nodeA.currentGold = 1.0;
            }
          }
        } else {
          pkt.progress += pkt.speed;
          const posA = pkt.connection.nodeA.mesh.position;
          const posB = pkt.connection.nodeB.mesh.position;
          pkt.mesh.position.lerpVectors(posA, posB, pkt.progress);

          if (pkt.progress >= 1.0) {
            // Reached destination: illuminate target node gold
            pkt.connection.nodeB.currentGold = 1.0;
            pkt.mesh.visible = false;
            pkt.connection = null;
            // Reset cooldown with organic, irregular timing
            pkt.cooldown = 40 + Math.random() * 160;
          }
        }
      });

      // Candlestick data stream gentle live-feed breathing
      candleData.forEach((cd) => {
        const wave = Math.sin(time * 0.8 + cd.phase) * 0.12;
        cd.bodyMesh.position.y = cd.baseY + wave;
        cd.wickLine.position.y = wave;
      });

      renderer.render(scene, camera);
    };

    animate();

    // --- 11. Responsive Resize ---
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      glowTexture.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      {/* 3D WebGL Canvas Mounting Node */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Subtle Grain / Noise & Vignette Overlay for High-End Cinematic Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, transparent 30%, rgba(5, 9, 18, 0.85) 100%)',
        }}
      />
      {/* Soft Vignette Edge Fades */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050912] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050912] to-transparent pointer-events-none" />
    </div>
  );
}
