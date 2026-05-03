import React from 'react';
import { useThreeViewer } from '@shared/hooks/useThreeViewer';
import { useGltfModel } from '@shared/hooks/useGltfModel';
import type { ModelProps } from '../types';

/**
 * Показывает 3D‑модель glTF в канвасе THREE.js.
 * Настраивает сцену и подгружает модель. Ничего не знает о Redux.
 * @param props.modelUrl - URL glTF (может быть blob:)
 * @param props.height - высота канваса в пикселях
 * @returns React‑элемент контейнера
 */
export const Model3DViewer: React.FC<ModelProps> = ({ modelUrl, height = 500 }) => {
  const { containerRef, sceneRef } = useThreeViewer(height);
  useGltfModel(sceneRef, modelUrl, 3);

  return <div ref={containerRef} style={{ width: '100%', height }} />;
};