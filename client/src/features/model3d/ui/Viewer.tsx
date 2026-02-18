import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

type Props = { modelUrl?: string | null; height?: number };

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

type MapKey = typeof MAP_KEYS[number];
type MaterialWithMaps = THREE.Material & Partial<Record<MapKey, THREE.Texture | null>>;

const disposeMaterial = (material: THREE.Material) => {
  const m = material as MaterialWithMaps;
  for (const key of MAP_KEYS) {
    const tex = m[key];
    tex?.dispose?.();
  }
  material.dispose();
};

export const Model3DViewer = ({ modelUrl, height = 500 }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const rafRef = useRef<number | null>(null);

  // init
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
    container.appendChild(renderer.domElement);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(3, 10, 10);
    scene.add(dir);

    const grid = new THREE.GridHelper(10, 10);
    grid.position.y = -0.0001;
    scene.add(grid);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };
    window.addEventListener('resize', onResize);

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    sceneRef.current = scene;
    rendererRef.current = renderer;
    controlsRef.current = controls;

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

      // удалить модель, если ещё есть
      if (modelRef.current) {
        scene.remove(modelRef.current);
        modelRef.current.traverse((obj: THREE.Object3D) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry.dispose();
            const mat = obj.material;
            if (Array.isArray(mat)) mat.forEach(disposeMaterial);
            else disposeMaterial(mat);
          }
        });
        modelRef.current = null;
      }

      controls.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, [height]);

  // load/unload model
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // очистить прежнюю модель
    if (modelRef.current) {
      scene.remove(modelRef.current);
      modelRef.current.traverse((obj: THREE.Object3D) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mat = obj.material;
          if (Array.isArray(mat)) mat.forEach(disposeMaterial);
          else disposeMaterial(mat);
        }
      });
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

        // автоцентрирование и скейл
        const box = new THREE.Box3().setFromObject(root);
        const size = box.getSize(new THREE.Vector3()).length() || 1;
        const center = box.getCenter(new THREE.Vector3());
        root.position.sub(center);
        root.scale.setScalar(3 / size);

        scene.add(root);
        modelRef.current = root;
      },
      undefined,
      (err: unknown) => {
        // тит onError в three бывает "любой", оставляем unknown
        // тут можно отправить в трекинг
        // console.error('GLTF load error', err);
      },
    );

    return () => {
      if (!revoked && modelUrl.startsWith('blob:')) {
        URL.revokeObjectURL(modelUrl);
        revoked = true;
      }
    };
  }, [modelUrl]);

  return <div ref={containerRef} style={{ width: '100%', height }} />;
};