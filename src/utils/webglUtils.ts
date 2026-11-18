import * as THREE from 'three';

let cachedIsSoftwareGl: boolean | null = null;

/**
 * Detects software WebGL renderers (SwiftShader, llvmpipe, WARP)
 * from the GPU renderer string so rendering cost (DPR, antialiasing,
 * frame pacing) adapts smoothly without changing scene composition.
 */
export function detectSoftwareGl(): boolean {
  if (cachedIsSoftwareGl !== null) return cachedIsSoftwareGl;
  if (typeof document === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
      cachedIsSoftwareGl = true;
      return true;
    }
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    cachedIsSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    return cachedIsSoftwareGl;
  } catch {
    cachedIsSoftwareGl = true;
    return true;
  }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isWebGLAvailable(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return false;
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/**
 * Schedules the next animation tick after software WebGL finishes rasterizing
 * so the CPU thread is never starved.
 */
export function scheduleAfterDraw(
  renderer: THREE.WebGLRenderer,
  cb: () => void,
  registerTimer: (id: number) => void
): void {
  const gl = renderer.getContext() as WebGL2RenderingContext;
  if (!gl || typeof gl.fenceSync !== 'function') {
    registerTimer(window.setTimeout(cb, 80));
    return;
  }

  const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
  gl.flush();
  const poll = () => {
    const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
    if (state === gl.UNSIGNALED) {
      registerTimer(window.setTimeout(poll, 5));
    } else {
      if (sync) gl.deleteSync(sync);
      registerTimer(window.setTimeout(cb, 80));
    }
  };
  registerTimer(window.setTimeout(poll, 5));
}

/**
 * Generates a crisp procedural CanvasTexture for 3D floating code/tech badges.
 */
export function createCodeGlyphTexture(
  symbol: string,
  accentHex: string,
  maxAnisotropy: number
): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Deep navy frosted tile
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, '#09122b');
    grad.addColorStop(1, '#050816');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Subtle border frame
    ctx.strokeStyle = accentHex;
    ctx.lineWidth = 6;
    ctx.strokeRect(10, 10, size - 20, size - 20);

    // Corner micro ticks
    ctx.fillStyle = accentHex;
    ctx.fillRect(10, 10, 22, 6);
    ctx.fillRect(10, 10, 6, 22);
    ctx.fillRect(size - 32, size - 16, 22, 6);
    ctx.fillRect(size - 16, size - 32, 6, 22);

    // Centered crisp symbol
    ctx.fillStyle = '#f8fafc';
    ctx.font = '700 76px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = accentHex;
    ctx.shadowBlur = 18;
    ctx.fillText(symbol, size / 2, size / 2 + 4);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(8, maxAnisotropy || 1);
  texture.needsUpdate = true;
  return texture;
}
