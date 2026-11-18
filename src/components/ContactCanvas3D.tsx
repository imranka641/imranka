import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  detectSoftwareGl,
  isWebGLAvailable,
  prefersReducedMotion,
  scheduleAfterDraw,
} from '../utils/webglUtils';

export const ContactCanvas3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (!isWebGLAvailable() || prefersReducedMotion()) {
      setFallback(true);
      return;
    }

    const isSoftwareGl = detectSoftwareGl();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 60);
    camera.position.set(0, 2.5, 9);
    camera.lookAt(0, 0, 0);

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
    container.appendChild(renderer.domElement);

    // Flowing 3D Neural Wave Particle Grid
    const cols = isSoftwareGl ? 24 : 38;
    const rows = isSoftwareGl ? 14 : 22;
    const count = cols * rows;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const c1 = new THREE.Color(0x06b6d4);
    const c2 = new THREE.Color(0x8b5cf6);

    let idx = 0;
    for (let ix = 0; ix < cols; ix++) {
      for (let iz = 0; iz < rows; iz++) {
        const i3 = idx * 3;
        positions[i3] = (ix - cols / 2) * 0.52;
        positions[i3 + 1] = 0;
        positions[i3 + 2] = (iz - rows / 2) * 0.52;

        const mix = ix / cols;
        colors[i3] = THREE.MathUtils.lerp(c1.r, c2.r, mix);
        colors[i3 + 1] = THREE.MathUtils.lerp(c1.g, c2.g, mix);
        colors[i3 + 2] = THREE.MathUtils.lerp(c1.b, c2.b, mix);
        idx++;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const points = new THREE.Points(geo, mat);
    points.position.y = -1.2;
    scene.add(points);

    const handlePointerMove = (e: PointerEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let frameId = 0;
    let disposed = false;
    const timers: number[] = [];

    const tick = () => {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      const posAttr = geo.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      let i = 0;
      for (let ix = 0; ix < cols; ix++) {
        for (let iz = 0; iz < rows; iz++) {
          const i3 = i * 3;
          arr[i3 + 1] =
            Math.sin((ix + elapsed * 1.4) * 0.28) * 0.42 +
            Math.cos((iz + elapsed * 1.1) * 0.32) * 0.35;
          i++;
        }
      }
      posAttr.needsUpdate = true;

      points.rotation.y = THREE.MathUtils.damp(
        points.rotation.y,
        pointerRef.current.x * 0.18,
        2.5,
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
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (fallback) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-500/5 to-purple-500/5"
      />
    );
  }

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-65"
    />
  );
};
