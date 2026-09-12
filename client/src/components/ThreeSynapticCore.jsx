import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Terminal, Globe, Activity, Cpu } from 'lucide-react';

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
    camera.position.z = 8.0;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    const universeGroup = new THREE.Group();
    scene.add(universeGroup);

    // 1. Central Internet Core: TorusKnot & Dodecahedron Cyber Matrix Processor
    const coreGeo = new THREE.TorusKnotGeometry(1.1, 0.32, 128, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00ff88,
      emissiveIntensity: 1.2,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
      roughness: 0.1,
      metalness: 0.95,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    universeGroup.add(coreMesh);

    // Inner Quantum Singularity Crystal
    const innerGeo = new THREE.OctahedronGeometry(0.6, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x9d4edd,
      emissive: 0x00f0ff,
      emissiveIntensity: 2.0,
      roughness: 0.1,
      metalness: 0.9,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    universeGroup.add(innerMesh);

    // 2. Internet & Code Structure Network (Neural Topology Graph: 48 Nodes & Lines)
    const nodeCount = 48;
    const nodeGeo = new THREE.SphereGeometry(0.05, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00ffcc });
    const nodes = [];
    const nodePositions = [];

    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.2 + Math.random() * 1.6;
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      nodePositions.push(new THREE.Vector3(x, y, z));
      const m = new THREE.Mesh(nodeGeo, nodeMat);
      m.position.set(x, y, z);
      universeGroup.add(m);
      nodes.push({ mesh: m, basePos: new THREE.Vector3(x, y, z) });
    }

    // Connecting Internet / Code Structure Edges
    const linePositions = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 2.1) {
          linePositions.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
          linePositions.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z);
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const networkLines = new THREE.LineSegments(lineGeo, lineMat);
    universeGroup.add(networkLines);

    // 3. Four Holographic Code Matrix Rings
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.015, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0x00ff66, wireframe: true, transparent: true, opacity: 0.65 })
    );
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.6, 0.014, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.6 })
    );
    const ring3 = new THREE.Mesh(
      new THREE.TorusGeometry(4.0, 0.012, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0x9d4edd, wireframe: true, transparent: true, opacity: 0.5 })
    );
    const ring4 = new THREE.Mesh(
      new THREE.TorusGeometry(4.4, 0.01, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0xffd166, wireframe: true, transparent: true, opacity: 0.4 })
    );

    ring1.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    ring3.rotation.z = Math.PI / 5;
    ring4.rotation.x = Math.PI / 6;

    universeGroup.add(ring1);
    universeGroup.add(ring2);
    universeGroup.add(ring3);
    universeGroup.add(ring4);

    // 4. Traveling Data Packets (Binary/Code streams)
    const packetGeo = new THREE.SphereGeometry(0.07, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const packets = [];
    for (let i = 0; i < 14; i++) {
      const p = new THREE.Mesh(packetGeo, packetMat);
      universeGroup.add(p);
      packets.push({
        mesh: p,
        pathRadius: 3.2 + (i % 4) * 0.4,
        speed: 0.022 + (i * 0.003),
        angle: (i * Math.PI) / 6,
        axis: i % 3,
      });
    }

    // 5. Code Embers & Data Matrix Swarm (1,800 Particles)
    const swarmCount = 1800;
    const swarmGeo = new THREE.BufferGeometry();
    const swarmPos = new Float32Array(swarmCount * 3);

    for (let i = 0; i < swarmCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const dist = 1.5 + Math.random() * 7.0;

      swarmPos[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      swarmPos[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      swarmPos[i * 3 + 2] = dist * Math.cos(phi);
    }
    swarmGeo.setAttribute('position', new THREE.BufferAttribute(swarmPos, 3));

    const swarmMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.04,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const swarmMesh = new THREE.Points(swarmGeo, swarmMat);
    universeGroup.add(swarmMesh);

    // 6. Atmospheric Lighting
    scene.add(new THREE.AmbientLight(0x0a0f25, 2.5));
    const cyanLight = new THREE.PointLight(0x00f0ff, 6.0, 25);
    cyanLight.position.set(5, 4, 5);
    scene.add(cyanLight);

    const greenLight = new THREE.PointLight(0x00ff66, 5.0, 25);
    greenLight.position.set(-5, -4, 4);
    scene.add(greenLight);

    // Mouse & Click Dynamics
    let targetRotX = 0;
    let targetRotY = 0;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotX = y * 1.8;
      targetRotY = x * 1.8;
    };
    container.addEventListener('mousemove', handleMouseMove);

    const handleClick = () => {
      setPulseCount((c) => c + 1);
      coreMesh.scale.set(1.3, 1.3, 1.3);
      setTimeout(() => coreMesh.scale.set(1, 1, 1), 350);
    };
    container.addEventListener('click', handleClick);

    // Render Loop
    const clock = new THREE.Clock();
    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      universeGroup.rotation.x += (targetRotX - universeGroup.rotation.x) * 0.06 + Math.sin(t * 0.5) * 0.0015;
      universeGroup.rotation.y += (targetRotY - universeGroup.rotation.y) * 0.06 + 0.003;

      // Pulsating Core & Inner Crystal
      const corePulse = 1 + Math.sin(t * 3.2) * 0.08;
      coreMesh.scale.set(corePulse, corePulse, corePulse);
      coreMesh.rotation.x += 0.008;
      coreMesh.rotation.y += 0.012;

      const innerPulse = 1 + Math.cos(t * 4.0) * 0.12;
      innerMesh.scale.set(innerPulse, innerPulse, innerPulse);
      innerMesh.rotation.x -= 0.02;
      innerMesh.rotation.y += 0.025;

      // Ring Rotations
      ring1.rotation.x += 0.008;
      ring1.rotation.y += 0.006;
      ring2.rotation.y -= 0.007;
      ring2.rotation.z += 0.005;
      ring3.rotation.z += 0.006;
      ring4.rotation.x -= 0.005;
      ring4.rotation.y += 0.004;

      // Data packets movement
      packets.forEach((p) => {
        p.angle += p.speed;
        if (p.axis === 0) {
          p.mesh.position.x = Math.cos(p.angle) * p.pathRadius;
          p.mesh.position.y = Math.sin(p.angle) * p.pathRadius * 0.6;
          p.mesh.position.z = Math.sin(p.angle * 1.5) * (p.pathRadius * 0.5);
        } else if (p.axis === 1) {
          p.mesh.position.x = Math.sin(p.angle * 1.2) * (p.pathRadius * 0.5);
          p.mesh.position.y = Math.cos(p.angle) * p.pathRadius;
          p.mesh.position.z = Math.sin(p.angle) * p.pathRadius * 0.7;
        } else {
          p.mesh.position.x = Math.sin(p.angle) * p.pathRadius * 0.7;
          p.mesh.position.y = Math.sin(p.angle * 1.3) * (p.pathRadius * 0.5);
          p.mesh.position.z = Math.cos(p.angle) * p.pathRadius;
        }
      });

      // Swarm swirl
      swarmMesh.rotation.y = t * 0.035;

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
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
        title="Neural Internet & Code Core Matrix: Move mouse to orbit, click to pulse network"
      />

      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#050505]/90 border border-emerald-500/40 backdrop-blur-md shadow-lg shadow-black">
          <Terminal className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="font-mono text-[10px] text-emerald-300 tracking-wider font-semibold">
            SYNAPTIC CODE MATRIX // 99.99% UPTIME
          </span>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-20 pointer-events-none hidden sm:block">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#050505]/85 border border-cyan-500/40 backdrop-blur-md">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono text-[10px] text-cyan-300">
            LATENCY: &lt; 8ms
          </span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden sm:block">
        <div className="px-3 py-1.5 rounded-lg bg-[#050505]/85 border border-white/10 backdrop-blur-md font-mono text-[9px] text-[#A3A3A3]">
          <div>// INTERNET NODES: 48 ACTIVE</div>
          <div>// DATA PULSES: <span className="text-cyan-400 font-bold">{pulseCount}</span></div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[9px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>NEURAL MATRIX 3D</span>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/15 via-cyan-500/15 to-purple-600/15 pointer-events-none rounded-3xl blur-3xl z-0" />
    </div>
  );
}
