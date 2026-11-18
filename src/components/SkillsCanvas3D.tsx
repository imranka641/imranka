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

interface SkillsCanvas3DProps {
  activeCategory: string;
}

const CATEGORY_COLORS: Record<string, number> = {
  all: 0x22d3ee,
  frontend: 0x38bdf8,
  backend: 0x8b5cf6,
  databases: 0xf59e0b,
  tools: 0x10b981,
  additional: 0x3b82f6,
};

export const SkillsCanvas3D: React.FC<SkillsCanvas3DProps> = ({ activeCategory }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeCatRef = useRef<string>(activeCategory);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    activeCatRef.current = activeCategory;
  }, [activeCategory]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (!isWebGLAvailable() || prefersReducedMotion()) {
      setFallback(true);
      return;
    }

    const isSoftwareGl = detectSoftwareGl();
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    camera.position.set(0, 0.3, 6.8);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setFallback(true);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmrem.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();
    pmrem.dispose();

    const hemi = new THREE.HemisphereLight(0x38bdf8, 0x1e1b4b, 0.8);
    const dir1 = new THREE.DirectionalLight(0x67e8f9, 1.9);
    dir1.position.set(4, 5, 5);
    const dir2 = new THREE.DirectionalLight(0xa855f7, 1.6);
    dir2.position.set(-5, -3, -3);
    scene.add(hemi, dir1, dir2);

    const clusterGroup = new THREE.Group();
    scene.add(clusterGroup);

    const disposables: Array<{ dispose: () => void }> = [envTarget];

    // Central Octahedral Tech Hub
    const hubGeo = new THREE.OctahedronGeometry(0.95, 1);
    const hubMat = new THREE.MeshPhysicalMaterial({
      color: 0x0ea5e9,
      emissive: 0x0369a1,
      emissiveIntensity: 0.65,
      metalness: 0.7,
      roughness: 0.18,
      clearcoat: 1.0,
    });
    const hubMesh = new THREE.Mesh(hubGeo, hubMat);
    clusterGroup.add(hubMesh);
    disposables.push(hubGeo, hubMat);

    // Outer Wireframe Shield
    const shieldGeo = new THREE.IcosahedronGeometry(1.25, 1);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      metalness: 0.8,
      roughness: 0.2,
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    clusterGroup.add(shieldMesh);
    disposables.push(shieldGeo, shieldMat);

    // Orbital Skill Nodes (JS, TS, React, Node, PHP, SQL, Kotlin, Git)
    const nodes = [
      { label: 'JS', color: '#f59e0b', r: 2.05, y: 0.65, phase: 0.0, speed: 0.42 },
      { label: 'TS', color: '#3b82f6', r: 2.15, y: -0.55, phase: 0.9, speed: 0.38 },
      { label: 'React', color: '#22d3ee', r: 2.25, y: 0.15, phase: 1.8, speed: 0.35 },
      { label: 'Node', color: '#10b981', r: 2.0, y: 0.85, phase: 2.7, speed: 0.4 },
      { label: 'PHP', color: '#8b5cf6', r: 2.2, y: -0.85, phase: 3.6, speed: 0.36 },
      { label: 'SQL', color: '#06b6d4', r: 2.1, y: -0.1, phase: 4.5, speed: 0.44 },
      { label: 'KT', color: '#a855f7', r: 1.95, y: 0.35, phase: 5.4, speed: 0.39 },
      { label: 'Git', color: '#f97316', r: 2.25, y: -0.45, phase: 6.0, speed: 0.34 },
    ];

    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const cubeGeo = new THREE.BoxGeometry(0.42, 0.42, 0.42);
    disposables.push(cubeGeo);

    const orbitingMeshes: Array<{
      mesh: THREE.Mesh;
      r: number;
      y: number;
      phase: number;
      speed: number;
    }> = [];

    nodes.forEach((n) => {
      const tex = createCodeGlyphTexture(n.label, n.color, maxAniso);
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.25,
        metalness: 0.55,
      });
      const mesh = new THREE.Mesh(cubeGeo, mat);
      clusterGroup.add(mesh);
      orbitingMeshes.push({ mesh, r: n.r, y: n.y, phase: n.phase, speed: n.speed });
      disposables.push(tex, mat);
    });

    // Orbital Track Ring
    const trackGeo = new THREE.TorusGeometry(2.1, 0.015, 12, 80);
    const trackMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
    });
    const trackMesh = new THREE.Mesh(trackGeo, trackMat);
    trackMesh.rotation.x = Math.PI / 2.4;
    clusterGroup.add(trackMesh);
    disposables.push(trackGeo, trackMat);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      pointerRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    container.addEventListener('pointermove', handlePointerMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 360;
      const h = container.clientHeight || 360;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let frameId = 0;
    let disposed = false;
    const timers: number[] = [];
    const targetColor = new THREE.Color();

    const tick = () => {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      const catHex = CATEGORY_COLORS[activeCatRef.current] ?? 0x22d3ee;
      targetColor.setHex(catHex);
      hubMat.color.lerp(targetColor, Math.min(1, delta * 4));
      trackMat.color.lerp(targetColor, Math.min(1, delta * 4));

      hubMesh.rotation.y += delta * 0.5;
      hubMesh.rotation.x += delta * 0.25;
      shieldMesh.rotation.y -= delta * 0.22;

      for (let i = 0; i < orbitingMeshes.length; i++) {
        const item = orbitingMeshes[i];
        const a = elapsed * item.speed + item.phase;
        item.mesh.position.set(
          Math.cos(a) * item.r,
          item.y + Math.sin(elapsed * 1.4 + item.phase) * 0.16,
          Math.sin(a) * item.r
        );
        item.mesh.rotation.y += delta * 0.65;
        item.mesh.rotation.x += delta * 0.3;
      }

      clusterGroup.rotation.y = THREE.MathUtils.damp(
        clusterGroup.rotation.y,
        pointerRef.current.x * 0.45,
        4,
        delta
      );
      clusterGroup.rotation.x = THREE.MathUtils.damp(
        clusterGroup.rotation.x,
        -pointerRef.current.y * 0.25,
        4,
        delta
      );

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        scheduleAfterDraw(renderer, tick, (id) => timers.push(id));
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      timers.forEach((id) => clearTimeout(id));
      container.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (fallback) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-44 h-44 rounded-full border border-cyan-500/30 bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-purple-500/20 flex items-center justify-center font-mono text-xs text-cyan-300">
          Web &amp; Mobile Stack
        </div>
      </div>
    );
  }

  return <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
};
