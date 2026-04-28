import * as THREE from 'three';

const MAP_KEYS = [
  'map',
  'normalMap',
  'metalnessMap',
  'roughnessMap',
  'emissiveMap',
  'specularMap',
  'alphaMap',
  'aoMap',
  'bumpMap',
  'displacementMap',
  'lightMap',
] as const;

type MapKey = (typeof MAP_KEYS)[number];
type MaterialWithMaps = THREE.Material & Partial<Record<MapKey, THREE.Texture | null>>;

/**
 * Освобождает GPU‑ресурсы у материала: все текстуры + сам материал.
 * @param material - материал THREE.js
 */
export function disposeMaterial(material: THREE.Material): void {
  const materialWithMaps = material as MaterialWithMaps;
  for (const key of MAP_KEYS) {
    const texture = materialWithMaps[key];
    texture?.dispose?.();
  }
  material.dispose();
}

/**
 * Рекурсивно освобождает ресурсы объекта: геометрии и материалы всех Mesh‑узлов.
 * @param object3D - корневой Object3D для очистки
 */
export function disposeObject3D(object3D: THREE.Object3D): void {
  object3D.traverse((node) => {
    if (node instanceof THREE.Mesh) {
      node.geometry?.dispose?.();
      const mat = node.material;
      if (Array.isArray(mat)) mat.forEach(disposeMaterial);
      else if (mat) disposeMaterial(mat);
    }
  });
}