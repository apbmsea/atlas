import { useEffect, useRef } from 'react';
import { setRendererColorSpace } from '@shared/three/compat';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';



/**
 * Инициализирует трёхмерную сцену: Scene, Camera, Renderer, OrbitControls, свет, сетку, resize и rAF.
 * @param height - высота канваса в px
 * @returns ссылки на контейнер и сущности THREE
 */
export function useThreeViewer(height: number) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const rafRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(2, 2, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    setRendererColorSpace(renderer);

    container.appendChild(renderer.domElement);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(3, 10, 10);
    const grid = new THREE.GridHelper(10, 10);
    grid.position.y = -0.0001;
    scene.add(hemiLight, dirLight, grid);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const handleResize = () => {
      const nextWidth = container.clientWidth;
      camera.aspect = nextWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, height);
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);
    resizeObserverRef.current = ro;

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    controlsRef.current = controls;

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;

      controls.dispose();
      renderer.dispose();
      scene.clear();

      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }

      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      controlsRef.current = null;
    };
  }, [height]);

  return { containerRef, sceneRef, cameraRef, rendererRef, controlsRef } as const;
}