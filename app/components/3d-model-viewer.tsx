import * as THREE from "three";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import AiChat from "./ai-chat";
import { FaTimes } from "react-icons/fa";

const ModelViewer = ({ selectedPlanet, onClose }: { selectedPlanet: string; onClose: () => void }) => {
  const modelUrl=`/models/${selectedPlanet}.glb`
  const mountRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!mountRef.current) return;

    // ✅ Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    const container = mountRef.current;
    const { clientWidth, clientHeight } = container;
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // ✅ Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // ✅ Load Model
    const loader = new GLTFLoader();
    let model: THREE.Object3D | null = null;

    loader.load(modelUrl, (gltf) => {
      model = gltf.scene;
      
      // Center the model
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      // Reset model position to center
      model.position.sub(center);
      
      // Adjust camera position based on model size
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      const cameraZ = Math.abs(maxDim / Math.sin(fov / 2) / 2);
      
      camera.position.set(0, 0, cameraZ * 1.5); // Multiply by 1.5 to give some padding
      camera.lookAt(0, 0, 0);
      
      scene.add(model);
      console.log(`Model loaded from ${modelUrl}`);
    });

    // ✅ Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (model) {
        model.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    };
    animate();

    // ✅ Resize Handler
    const handleResize = () => {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
      scene.clear(); // Remove all objects
    };
  }, [modelUrl]);

  return (
    <div className="fixed inset-0 flex bg-black bg-opacity-75 z-50">
      <div className="flex-1 relative h-full">
        <div ref={mountRef} className="w-full h-full aspect-square" />
      </div>
      <button onClick={onClose} className="absolute top-2 right-[-80px] text-gray-300 rounded-full p-2 z-10">
        <FaTimes className="w-3 h-3" />
      </button>
      <div className="w-1/2 border-l border-gray-600">
        <AiChat selectedPlanet={selectedPlanet} />
      </div>
    </div>
  );
};

export default ModelViewer;
