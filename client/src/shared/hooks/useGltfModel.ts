import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { disposeObject3D } from '@shared/three/dispose';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

/**
 * Загружает/выгружает glTF‑модель в сцену. Центрирует и нормализует масштаб.
 * @param sceneRef - ссылка на THREE.Scene
 * @param modelUrl - URL glTF (возможно blob:)
 * @param targetSize - целевая диагональ нормализованной модели
 */
export function useGltfModel(
  sceneRef: React.MutableRefObject<THREE.Scene | null>,
  modelUrl: string | null | undefined,
  targetSize: number = 3
) {
  const modelRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const cleanupCurrentModel = () => {
      if (!modelRef.current) return;
      scene.remove(modelRef.current);
      disposeObject3D(modelRef.current);
      modelRef.current = null;
    };

    cleanupCurrentModel();

    if (!modelUrl) return;

    const loader = new GLTFLoader();
    let revoked = false;
    let cancelled = false;

    loader.load(
      modelUrl,
      (gltf) => {
        if (cancelled) {
          const rootCancelled = gltf.scene ?? gltf.scenes?.[0];
          if (rootCancelled) disposeObject3D(rootCancelled);
          return;
        }

        const root = gltf.scene ?? gltf.scenes?.[0];
        if (!root) return;

        const bbox = new THREE.Box3().setFromObject(root);
        const diagonal = bbox.getSize(new THREE.Vector3()).length() || 1;
        const center = bbox.getCenter(new THREE.Vector3());

        root.position.sub(center);
        root.scale.setScalar(targetSize / diagonal);

        scene.add(root);
        modelRef.current = root;
      },
      undefined,
      () => { /* ignore */ }
    );

    return () => {
      cancelled = true;

      // Если модель уже успела добавиться в сцену — убрать и освободить ресурсы.
      cleanupCurrentModel();

      if (!revoked && modelUrl.startsWith('blob:')) {
        try { URL.revokeObjectURL(modelUrl); } catch { /* ignore */ }
        revoked = true;
      }
    };
  }, [modelUrl, sceneRef, targetSize]);

  return { modelRef } as const;
}