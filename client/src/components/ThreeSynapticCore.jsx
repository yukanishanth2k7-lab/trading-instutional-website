import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Radio, Activity, Sparkles } from 'lucide-react';

export default function ThreeSynapticCore() {
  const containerRef = useRef(null);
  const [pulseCount, setPulseCount] = useState(0);
  const animRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 540;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    const universeGroup = new THREE.Group();
    scene.add(universeGroup);

    // 1. Digital Singularity Core: Geodesic Hyper-Structure (Royal Purple / Violet)
    const outerGeo = new THREE.IcosahedronGeometry(1.65, 2);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x6366f1,
      emissiveIntensity: 0.95,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
      roughness: 0.12,
      metalness: 0.9,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    universeGroup.add(outerMesh);

    // 2. Quantum Bioluminescent Crystal Core (Electric Cyan / Blue)
    const crystalGeo = new THREE.OctahedronGeometry(0.85, 0);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00d4ff,
      emissiveIntensity: 1.8,
      roughness: 0.15,
      metalness: 0.85,
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    universeGroup.add(crystalMesh);

    // 3. Three Atmospheric Gyroscope Rings (Electric Cyan, Violet, Indigo)
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.35, 0.016, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.6 })
    );
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.65, 0.014, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.55 })
    );
    const ring3 = new THREE.Mesh(
      new THREE.TorusGeometry(2.95, 0.012, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.45 })
    );

    ring1.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    ring3.rotation.z = Math.PI / 6;

    universeGroup.add(ring1);
    universeGroup.add(ring2);
    universeGroup.add(ring3);

    // 4. Orbiting Satellite Photons (Electric Cyan Orbs)
    const photonGeo = new THREE.SphereGeometry(0.065, 12, 12);
    const photonMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const photons = [];
    for (let i = 0; i < 7; i++) {
      const p = new THREE.Mesh(photonGeo, photonMat);
      universeGroup.add(p);
      photons.push({
        mesh: p,
        radius: 2.35 + (i % 3) * 0.3,
        speed: 0.016 + (i * 0.004),
        angle: (i * Math.PI) / 3.5,
      });
    }

    // 5. Digital Universe Ember Swarm (1,200 Electric Cyan & Purple Embers)
    const swarmCount = 1200;
    const swarmGeo = new THREE.BufferGeometry();
    const swarmPos = new Float32Array(swarmCount * 3);

    for (let i = 0; i < swarmCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const dist = 1.6 + Math.random() * 6.5;

      swarmPos[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      swarmPos[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      swarmPos[i * 3 + 2] = dist * Math.cos(phi);
    }
    swarmGeo.setAttribute('position', new THREE.BufferAttribute(swarmPos, 3));

    const swarmMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.035,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const swarmMesh = new THREE.Points(swarmGeo, swarmMat);
    universeGroup.add(swarmMesh);

    // 6. Deep Cosmic Floating Embers (Soft Indigo)
    const bgDustCount = 600;
    const bgDustGeo = new THREE.BufferGeometry();
    const bgDustPos = new Float32Array(bgDustCount * 3);
    for (let i = 0; i < bgDustCount * 3; i += 3) {
      bgDustPos[i] = (Math.random() - 0.5) * 18;
      bgDustPos[i + 1] = (Math.random() - 0.5) * 18;
      bgDustPos[i + 2] = (Math.random() - 0.5) * 18;
    }
    bgDustGeo.setAttribute('position', new THREE.BufferAttribute(bgDustPos, 3));
    const bgDustMesh = new THREE.Points(
      bgDustGeo,
      new THREE.PointsMaterial({
        color: 0x818cf8,
        size: 0.02,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
      })
    );
    scene.add(bgDustMesh);

    // 7. Atmospheric Lighting: Deep Cosmic Indigo, Electric Cyan & Royal Purple
    scene.add(new THREE.AmbientLight(0x060818, 2.2));

    const cyanLight = new THREE.PointLight(0x00f0ff, 4.8, 20);
    cyanLight.position.set(4, 3, 4);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 4.2, 20);
    purpleLight.position.set(-4, -3, 3);
    scene.add(purpleLight);

    // 8. Smooth Mouse Dynamics
    let targetRotX = 0;
    let targetRotY = 0;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotX = y * 1.6;
      targetRotY = x * 1.6;
    };
    container.addEventListener('mousemove', handleMouseMove);

    // Click shockwave pulse
    const handleClick = () => {
      setPulseCount((c) => c + 1);
      outerMesh.scale.set(1.22, 1.22, 1.22);
      setTimeout(() => outerMesh.scale.set(1, 1, 1), 320);
    };
    container.addEventListener('click', handleClick);

    // 9. Render Loop: Slow Cinematic Camera Float + Rotation
    const clock = new THREE.Clock();
    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      universeGroup.rotation.x += (targetRotX - universeGroup.rotation.x) * 0.05 + Math.sin(t * 0.4) * 0.001;
      universeGroup.rotation.y += (targetRotY - universeGroup.rotation.y) * 0.05 + 0.0025;

      // Pulsating Crystal
      const pulse = 1 + Math.sin(t * 2.8) * 0.09;
      crystalMesh.scale.set(pulse, pulse, pulse);
      crystalMesh.rotation.x -= 0.015;
      crystalMesh.rotation.y += 0.02;

      // Orbital Gyro Ring Motion
      ring1.rotation.x += 0.007;
      ring1.rotation.y += 0.005;
      ring2.rotation.y -= 0.006;
      ring2.rotation.z += 0.004;
      ring3.rotation.z += 0.005;

      photons.forEach((p) => {
        p.angle += p.speed;
        p.mesh.position.x = Math.cos(p.angle) * p.radius;
        p.mesh.position.y = Math.sin(p.angle) * p.radius * 0.55;
        p.mesh.position.z = Math.sin(p.angle * 1.4) * (p.radius * 0.65);
      });

      // Cosmic Swarm Swirl
      swarmMesh.rotation.y = t * 0.03;
      bgDustMesh.rotation.y = t * 0.01;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] sm:h-[560px] flex items-center justify-center select-none">
      {/* 3D WebGL Canvas Mounting Node */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
        title="Cinematic 3D Synaptic Core: Move mouse to orbit, click to pulse"
      />

      {/* Floating HUD Telemetry Badges in Purple & Cyan */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#050505]/85 border border-purple-500/40 backdrop-blur-md shadow-lg shadow-black">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-ping" />
          <span className="font-mono text-[10px] text-purple-300 tracking-wider font-semibold">
            TELEMETRY MATRIX // ACTIVE
          </span>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-20 pointer-events-none hidden sm:block">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#050505]/85 border border-cyan-500/40 backdrop-blur-md">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono text-[10px] text-cyan-300">
            LATENCY: &lt; 12ms
          </span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden sm:block">
        <div className="px-3 py-1.5 rounded-lg bg-[#050505]/85 border border-white/10 backdrop-blur-md font-mono text-[9px] text-[#A3A3A3]">
          <div>// TELEMETRY PHOTONS: 1,200</div>
          <div>// SYNAPTIC PULSES: <span className="text-cyan-400 font-bold">{pulseCount}</span></div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[9px]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>THREE.JS 3D ENGINE</span>
        </div>
      </div>

      {/* Radial Atmospheric Ambient Aura in Purple & Blue */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-cyan-500/15 to-transparent pointer-events-none rounded-3xl blur-3xl z-0" />
    </div>
  );
}
