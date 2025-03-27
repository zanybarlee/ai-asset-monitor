
import { useEffect } from 'react';
import * as THREE from 'three';
import { createServerRack, handleResize } from './utils/sceneHelpers';

interface SceneInitializerProps {
  containerRef: React.RefObject<HTMLDivElement>;
  sceneRef: React.MutableRefObject<THREE.Scene | null>;
  cameraRef: React.MutableRefObject<THREE.PerspectiveCamera | null>;
  rendererRef: React.MutableRefObject<THREE.WebGLRenderer | null>;
  animationFrameId: React.MutableRefObject<number | null>;
  initializedRef: React.MutableRefObject<boolean>;
}

const SceneInitializer = ({
  containerRef,
  sceneRef,
  cameraRef,
  rendererRef,
  animationFrameId,
  initializedRef
}: SceneInitializerProps) => {
  useEffect(() => {
    if (!containerRef.current || initializedRef.current) return;
    
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 10, 20);
    cameraRef.current = camera;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Add ground
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xcccccc,
      side: THREE.DoubleSide,
      roughness: 0.8
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Add grid helper
    const gridHelper = new THREE.GridHelper(50, 50);
    scene.add(gridHelper);
    
    // Add server racks in a row
    for (let i = 0; i < 5; i++) {
      const rack = createServerRack(-10 + i * 4, -5);
      scene.add(rack);
    }
    
    // Add another row of racks
    for (let i = 0; i < 5; i++) {
      const rack = createServerRack(-10 + i * 4, 5);
      scene.add(rack);
    }
    
    // Add central storage unit
    const storageGeometry = new THREE.BoxGeometry(4, 3, 3);
    const storageMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x0066cc,
      metalness: 0.7,
      roughness: 0.2
    });
    const storageUnit = new THREE.Mesh(storageGeometry, storageMaterial);
    storageUnit.position.set(0, 1.5, 0);
    storageUnit.castShadow = true;
    scene.add(storageUnit);
    
    // Add cooling units
    const coolingUnitGeometry = new THREE.CylinderGeometry(1, 1, 3, 8);
    const coolingUnitMaterial = new THREE.MeshStandardMaterial({ color: 0x66ccff });
    
    const coolingUnit1 = new THREE.Mesh(coolingUnitGeometry, coolingUnitMaterial);
    coolingUnit1.position.set(-12, 1.5, 0);
    coolingUnit1.castShadow = true;
    scene.add(coolingUnit1);
    
    const coolingUnit2 = new THREE.Mesh(coolingUnitGeometry, coolingUnitMaterial);
    coolingUnit2.position.set(12, 1.5, 0);
    coolingUnit2.castShadow = true;
    scene.add(coolingUnit2);
    
    // Add walls
    const wallMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xeeeeee,
      side: THREE.DoubleSide
    });
    
    // Back wall
    const backWallGeometry = new THREE.PlaneGeometry(50, 10);
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.set(0, 5, -25);
    scene.add(backWall);
    
    // Front wall
    const frontWallGeometry = new THREE.PlaneGeometry(50, 10);
    const frontWall = new THREE.Mesh(frontWallGeometry, wallMaterial);
    frontWall.position.set(0, 5, 25);
    frontWall.rotation.y = Math.PI;
    scene.add(frontWall);
    
    // Left wall
    const leftWallGeometry = new THREE.PlaneGeometry(50, 10);
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.position.set(-25, 5, 0);
    leftWall.rotation.y = Math.PI / 2;
    scene.add(leftWall);
    
    // Right wall
    const rightWallGeometry = new THREE.PlaneGeometry(50, 10);
    const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
    rightWall.position.set(25, 5, 0);
    rightWall.rotation.y = -Math.PI / 2;
    scene.add(rightWall);
    
    // Animation function
    const animate = () => {
      const id = requestAnimationFrame(animate);
      animationFrameId.current = id;
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
    initializedRef.current = true;
    
    // Add window resize handler
    window.addEventListener('resize', () => handleResize(containerRef, cameraRef, rendererRef));
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', () => handleResize(containerRef, cameraRef, rendererRef));
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, [containerRef, sceneRef, cameraRef, rendererRef, animationFrameId, initializedRef]);

  return null;
};

export default SceneInitializer;
