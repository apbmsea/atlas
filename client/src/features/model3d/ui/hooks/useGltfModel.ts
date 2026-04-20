import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { disposeObject3D } from '@shared/three/dispose';

/**
 * Загружает/отгружает glTF‑модель в/из сцены. Центрирует и масштабирует модель.
 * @param sceneRef - ссылка на THREE.Scene, куда монтировать модель
 * @param modelUrl - URL glTF (может быть blob:)
 * @param targetSize - желаемый размер (диагональ) нормализованной модели
 * @returns ссылка на текущий Object3D модели
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

    // удалить прежнюю модель
    if (modelRef.current) {
      scene.remove(modelRef.current);
      disposeObject3D(modelRef.current);
      modelRef.current = null;
    }

    if (!modelUrl) return;

    const loader = new GLTFLoader();
    let revoked = false;

    loader.load(
      modelUrl,
      (gltf: GLTF) => {
        const root = gltf.scene ?? gltf.scenes?.[0];
        if (!root) return;

        // автоцентрирование и нормализация масштаба
        const bbox = new THREE.Box3().setFromObject(root);
        const diagonal = bbox.getSize(new THREE.Vector3()).length() || 1;
        const center = bbox.getCenter(new THREE.Vector3());

        root.position.sub(center);
        root.scale.setScalar(targetSize / diagonal);

        scene.add(root);
        modelRef.current = root;
      },
      undefined,
      // Ошибку можно пробрасывать наружу через колбэк, пока просто игнорируем
      // чтобы не спамить консоль — соответствие правилам eslint
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (_error: unknown) => { }
    );

    return () => {
      // ревокаем только входящий blob: URL, если это наш локальный объект
      if (!revoked && modelUrl.startsWith('blob:')) {
        try { URL.revokeObjectURL(modelUrl); } catch { /* ignore */ }
        revoked = true;
      }
    };
  }, [modelUrl, sceneRef, targetSize]);

  return { modelRef } as const;
}