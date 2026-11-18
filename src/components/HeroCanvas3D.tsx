import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  createCodeGlyphTexture,
  detectSoftwareGl,
  isWebGLAvailable,
  prefersReducedMotion,
  scheduleAfterDraw,
} from '../utils/webglUtils';

interface HeroCanvas3DProps {
  isLightMode?: boolean;
}

// Reusable math objects outside animation loop (zero per-frame GC)
const _targetCameraPos = new THREE.Vector3();
const _lookTarget = new THREE.Vector3(0, 0, 0);

export const HeroCanvas3D: React.FC<HeroCanvas3DProps> = ({ isLightMode = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isLightRef = useRef<boolean>(isLightMode);
  const [fallbackActive, setFallbackActive] = useState<boolean>(false);

  useEffect(() => {
    isLightRef.current = isLightMode;
  }, [isLightMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (!isWebGLAvailable() || prefersReducedMotion()) {
      setFallbackActive(true);
      return;
    }

    const isSoftwareGl = detectSoftwareGl();

    // 1. Scene & Atmospheric Fog
    const scene = new THREE.Scene();
    const fogColor = isLightRef.current ? 0xf1f5f9 : 0x030612;
    scene.fog = new THREE.FogExp2(fogColor, 0.045);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 2. Perspective Camera
    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 9.2);

    // 3. Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setFallbackActive(true);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Context loss safety
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setFallbackActive(true);
    };
    const handleContextRestored = () => {
      setFallbackActive(false);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);

    // 4. Procedural Studio Environment Map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    // 5. Three-Point Studio Lighting + Hemisphere Fill
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x1e1b4b, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0x67e8f9, 2.2);
    keyLight.position.set(6, 7, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xa855f7, 2.0);
    rimLight.position.set(-7, -3, -5);
    scene.add(rimLight);

    const warmAccent = new THREE.PointLight(0xf59e0b, 1.4, 18, 2);
    warmAccent.position.set(3.5, -2.5, 4);
    scene.add(warmAccent);

    // 6. Composite Hero 3D Sculpture Group (Offset right on desktop so left typography breathes)
    const rootGroup = new THREE.Group();
    const updateGroupOffset = () => {
      const w = container.clientWidth || window.innerWidth;
      if (w >= 1024) {
        rootGroup.position.set(2.35, 0.1, 0);
        rootGroup.scale.setScalar(1.0);
      } else {
        rootGroup.position.set(0, 0.25, -1.2);
        rootGroup.scale.setScalar(0.82);
      }
    };
    updateGroupOffset();
    scene.add(rootGroup);

    const disposables: Array<{ dispose: () => void }> = [envTarget];

    // Part A: Inner Energy Core (Faceted Physical Glass Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(1.18, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0ea5e9,
      emissive: 0x082f49,
      emissiveIntensity: 0.7,
      metalness: 0.15,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transmission: isSoftwareGl ? 0 : 0.78,
      transparent: true,
      opacity: isSoftwareGl ? 0.55 : 0.95,
      ior: 1.6,
      thickness: 1.2,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);
    disposables.push(coreGeo, coreMat);

    // Part B: Outer Brushed Titanium Geodesic Lattice Cage
    const cageGeo = new THREE.IcosahedronGeometry(1.48, 1);
    const cageMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35,
      metalness: 0.85,
      roughness: 0.22,
      wireframe: true,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    rootGroup.add(cageMesh);
    disposables.push(cageGeo, cageMat);

    // Part C: Inner glowing nucleus sphere
    const nucleusGeo = new THREE.OctahedronGeometry(0.58, 2);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x6d28d9,
      emissiveIntensity: 1.4,
      metalness: 0.9,
      roughness: 0.18,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    rootGroup.add(nucleusMesh);
    disposables.push(nucleusGeo, nucleusMat);

    // Part D: Three Intersecting Orbital Gyroscope Rings with Node Accents
    const ringConfigs = [
      { radius: 2.15, tube: 0.028, color: 0x22d3ee, emissive: 0x0891b2, tiltX: Math.PI / 3.2, tiltY: 0.3 },
      { radius: 2.55, tube: 0.022, color: 0x8b5cf6, emissive: 0x6d28d9, tiltX: -Math.PI / 4, tiltY: -0.6 },
      { radius: 2.95, tube: 0.018, color: 0x3b82f6, emissive: 0x1d4ed8, tiltX: Math.PI / 2.1, tiltY: 0.9 },
    ];

    const ringGroups: THREE.Group[] = [];
    const nodeGeo = new THREE.SphereGeometry(0.085, 16, 16);
    disposables.push(nodeGeo);

    ringConfigs.forEach((cfg, idx) => {
      const rGroup = new THREE.Group();
      rGroup.rotation.set(cfg.tiltX, cfg.tiltY, idx * 0.5);

      const torusGeo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 96);
      const torusMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.emissive,
        emissiveIntensity: 0.65,
        metalness: 0.88,
        roughness: 0.18,
      });
      const ringMesh = new THREE.Mesh(torusGeo, torusMat);
      rGroup.add(ringMesh);

      // Two opposing metallic beacon nodes per ring
      const beaconMat = new THREE.MeshStandardMaterial({
        color: idx === 1 ? 0xf59e0b : 0xe0f2fe,
        emissive: idx === 1 ? 0xd97706 : cfg.color,
        emissiveIntensity: 1.2,
        metalness: 0.4,
        roughness: 0.2,
      });
      const node1 = new THREE.Mesh(nodeGeo, beaconMat);
      node1.position.set(cfg.radius, 0, 0);
      const node2 = new THREE.Mesh(nodeGeo, beaconMat);
      node2.position.set(-cfg.radius, 0, 0);
      rGroup.add(node1, node2);

      rootGroup.add(rGroup);
      ringGroups.push(rGroup);
      disposables.push(torusGeo, torusMat, beaconMat);
    });

    // Part E: 8 Orbiting Code & Technology Glyph Satellites
    const glyphSpecs = [
      { symbol: '</>', color: '#22d3ee', r: 3.35, speed: 0.32, yOff: 0.9, phase: 0.0 },
      { symbol: '{ }', color: '#8b5cf6', r: 3.15, speed: -0.26, yOff: -0.8, phase: 1.1 },
      { symbol: 'TS', color: '#3b82f6', r: 3.55, speed: 0.24, yOff: 0.3, phase: 2.2 },
      { symbol: 'API', color: '#10b981', r: 3.25, speed: -0.3, yOff: 1.3, phase: 3.3 },
      { symbol: 'DB', color: '#f59e0b', r: 3.45, speed: 0.28, yOff: -1.1, phase: 4.1 },
      { symbol: '01', color: '#38bdf8', r: 2.95, speed: 0.36, yOff: -0.2, phase: 5.2 },
    ];

    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const boxGeo = new THREE.BoxGeometry(0.46, 0.46, 0.46);
    disposables.push(boxGeo);

    const satellites: Array<{
      mesh: THREE.Mesh;
      r: number;
      speed: number;
      yOff: number;
      phase: number;
    }> = [];

    glyphSpecs.forEach((spec) => {
      const tex = createCodeGlyphTexture(spec.symbol, spec.color, maxAniso);
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.28,
        metalness: 0.65,
        emissive: new THREE.Color(spec.color),
        emissiveIntensity: 0.18,
      });
      const mesh = new THREE.Mesh(boxGeo, mat);
      rootGroup.add(mesh);
      satellites.push({
        mesh,
        r: spec.r,
        speed: spec.speed,
        yOff: spec.yOff,
        phase: spec.phase,
      });
      disposables.push(tex, mat);
    });

    // Part F: Cosmic Particle Starfield
    const particleCount = isSoftwareGl ? 240 : 520;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const palette = [
      new THREE.Color(0x22d3ee), // Cyan
      new THREE.Color(0x3b82f6), // Electric blue
      new THREE.Color(0x8b5cf6), // Purple
      new THREE.Color(0xf59e0b), // Subtle amber
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 3.2 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = radius * Math.cos(phi) - 2;

      const c = palette[i % palette.length];
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.78,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    disposables.push(particleGeo, particleMat);

    // Pre-warm shaders on GPU
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Mouse Parallax Tracking
    const handlePointerMove = (e: PointerEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Resize Listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      updateGroupOffset();
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const clock = new THREE.Clock();
    let frameId = 0;
    let isDisposed = false;
    const timers: number[] = [];

    const registerTimer = (id: number) => {
      timers.push(id);
    };

    const tick = () => {
      if (isDisposed) return;

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // Update fog tint subtly if user switches light/dark mode
      const targetFog = isLightRef.current ? 0xf8fafc : 0x030612;
      if (scene.fog instanceof THREE.FogExp2 && scene.fog.color.getHex() !== targetFog) {
        scene.fog.color.setHex(targetFog);
      }

      // Core & cage counter-rotation
      coreMesh.rotation.y += delta * 0.25;
      coreMesh.rotation.x += delta * 0.14;
      cageMesh.rotation.y -= delta * 0.18;
      cageMesh.rotation.z += delta * 0.11;
      nucleusMesh.rotation.y += delta * 0.6;
      const pulseScale = 1 + Math.sin(elapsed * 2.2) * 0.05;
      nucleusMesh.scale.setScalar(pulseScale);

      // Gyroscope rings rotation
      ringGroups[0].rotation.z += delta * 0.38;
      ringGroups[1].rotation.x += delta * 0.28;
      ringGroups[2].rotation.y -= delta * 0.34;

      // Orbiting code satellites
      for (let i = 0; i < satellites.length; i++) {
        const sat = satellites[i];
        const angle = elapsed * sat.speed + sat.phase;
        sat.mesh.position.set(
          Math.cos(angle) * sat.r,
          sat.yOff + Math.sin(elapsed * 1.1 + sat.phase) * 0.32,
          Math.sin(angle) * sat.r
        );
        sat.mesh.rotation.x += delta * 0.55;
        sat.mesh.rotation.y += delta * 0.7;
      }

      // Particle field slow drift
      particles.rotation.y = elapsed * 0.025 + pointerRef.current.x * 0.12;
      particles.rotation.x = pointerRef.current.y * 0.08;

      // Smooth pointer parallax on root sculpture & camera
      rootGroup.rotation.y = THREE.MathUtils.damp(
        rootGroup.rotation.y,
        pointerRef.current.x * 0.35,
        3.5,
        delta
      );
      rootGroup.rotation.x = THREE.MathUtils.damp(
        rootGroup.rotation.x,
        -pointerRef.current.y * 0.22,
        3.5,
        delta
      );

      _targetCameraPos.set(
        pointerRef.current.x * 0.55,
        0.4 + pointerRef.current.y * 0.35,
        9.2
      );
      camera.position.x = THREE.MathUtils.damp(camera.position.x, _targetCameraPos.x, 3.2, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, _targetCameraPos.y, 3.2, delta);
      camera.lookAt(_lookTarget);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        scheduleAfterDraw(renderer, tick, registerTimer);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(frameId);
      timers.forEach((id) => clearTimeout(id));
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);

      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (fallbackActive) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-1/3 right-[12%] w-[420px] h-[420px] rounded-full border border-cyan-500/20 bg-gradient-to-tr from-blue-600/15 via-cyan-500/10 to-purple-600/20 blur-[2px]" />
        <div className="absolute top-[36%] right-[16%] w-[300px] h-[300px] rounded-full border border-purple-500/25 rotate-45" />
        <div className="absolute top-[42%] right-[22%] w-[160px] h-[160px] rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-600/20 blur-xl" />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};
