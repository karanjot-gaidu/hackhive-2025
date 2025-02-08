import * as THREE from "three";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const SolarSystemModel = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable alpha for transparent background

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);
    // renderer.setClearColor(0x000000, 0); // Transparent background

    // ✅ Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // ✅ Load GLB Models
    const loader = new GLTFLoader();

    // Load Sun Model
    loader.load("/models/sun.glb", (gltf) => {
      const sunModel = gltf.scene;
      sunModel.position.set(0, 2, 0);
      sunModel.scale.set(5, 5, 5);
      scene.add(sunModel);
      console.log("Sun model loaded");

      // Rotate the sun
      const rotateSun = () => {
        sunModel.rotation.y += 0.01; // Adjust rotation speed here
      };

      // ✅ Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        rotateSun();
        renderer.render(scene, camera);
      };
      animate();
    });

    // ✅ Camera position
    camera.position.set(0, 2, 20); // Zoomed out to see the sun

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onWindowResize);

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default SolarSystemModel;
