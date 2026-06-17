import * as THREE from 'three';

/**
 * Выставляет корректное цветовое пространство рендера
 * для разных версий three:
 * - r152+ — renderer.outputColorSpace = SRGB
 * - r151- — renderer.outputEncoding = sRGBEncoding
 * @param renderer - экземпляр WebGLRenderer
 * @returns void
 */
export function setRendererColorSpace(renderer: THREE.WebGLRenderer): void {
  type CompatRenderer = THREE.WebGLRenderer & {
    outputColorSpace?: unknown;
    outputEncoding?: unknown;
  };

  const compat = renderer as CompatRenderer;

  // Пытаемся использовать новую схему
  if ('outputColorSpace' in compat) {
    const threeCompat = THREE as unknown as { SRGBColorSpace?: string };
    const srgb = typeof threeCompat.SRGBColorSpace === 'string' ? threeCompat.SRGBColorSpace : 'srgb';
    (compat as { outputColorSpace: string }).outputColorSpace = srgb;
    return;
  }

  // Фолбэк на старые версии
  if ('outputEncoding' in compat) {
    const threeCompat = THREE as unknown as { sRGBEncoding?: number };
    if (typeof threeCompat.sRGBEncoding === 'number') {
      (compat as { outputEncoding: number }).outputEncoding = threeCompat.sRGBEncoding;
    }
  }
}