
import { useEffect } from 'react';
import * as THREE from 'three';
import { createServerRack, handleResize } from './utils/sceneHelpers';
import { FloorConfig } from './FloorSceneConfig';

interface SceneInitializerProps {
  containerRef: React.RefObject<HTMLDivElement>;
  sceneRef: React.MutableRefObject<THREE.Scene | null>;
  cameraRef: React.MutableRefObject<THREE.PerspectiveCamera | null>;
  rendererRef: React.MutableRefObject<THREE.WebGLRenderer | null>;
  animationFrameId: React.MutableRefObject<number | null>;
  initializedRef: React.MutableRefObject<boolean>;
  activeFloor?: string;
  floorConfig?: FloorConfig;
}

const SceneInitializer = ({
  containerRef,
  sceneRef,
  cameraRef,
  rendererRef,
  animationFrameId,
  initializedRef,
  floorConfig
}: SceneInitializerProps) => {
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear the previous scene if it exists
    if (sceneRef.current && initializedRef.current) {
      // Dispose geometries and materials to prevent memory leaks
      sceneRef.current.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      
      // Clear the scene
      while(sceneRef.current.children.length > 0) { 
        sceneRef.current.remove(sceneRef.current.children[0]); 
      }
    }
    
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    // Create scene if it doesn't exist
    if (!sceneRef.current) {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f0f0);
      sceneRef.current = scene;
    } else {
      // Reset background color
      sceneRef.current.background = new THREE.Color(0xf0f0f0);
    }
    
    // Create camera if it doesn't exist
    if (!cameraRef.current) {
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.set(0, 10, 20);
      cameraRef.current = camera;
    } else {
      // Reset camera position
      cameraRef.current.position.set(0, 10, 20);
      cameraRef.current.lookAt(0, 0, 0);
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
    }
    
    // Create renderer if it doesn't exist
    if (!rendererRef.current) {
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      renderer.shadowMap.enabled = true;
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } else {
      rendererRef.current.setSize(width, height);
    }
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    sceneRef.current.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    sceneRef.current.add(directionalLight);
    
    // If we have a floor configuration, use it to set up the scene
    if (floorConfig && sceneRef.current) {
      floorConfig.sceneSetup(sceneRef.current);
    } else {
      // Default scene setup if no specific floor is selected
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
      sceneRef.current.add(ground);
      
      // Add grid helper
      const gridHelper = new THREE.GridHelper(50, 50);
      sceneRef.current.add(gridHelper);
      
      // Add server racks in a row
      for (let i = 0; i < 5; i++) {
        const rack = createServerRack(-10 + i * 4, -5);
        sceneRef.current.add(rack);
      }
      
      // Add another row of racks
      for (let i = 0; i < 5; i++) {
        const rack = createServerRack(-10 + i * 4, 5);
        sceneRef.current.add(rack);
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
      sceneRef.current.add(storageUnit);
      
      // Add cooling units
      const coolingUnitGeometry = new THREE.CylinderGeometry(1, 1, 3, 8);
      const coolingUnitMaterial = new THREE.MeshStandardMaterial({ color: 0x66ccff });
      
      const coolingUnit1 = new THREE.Mesh(coolingUnitGeometry, coolingUnitMaterial);
      coolingUnit1.position.set(-12, 1.5, 0);
      coolingUnit1.castShadow = true;
      sceneRef.current.add(coolingUnit1);
      
      const coolingUnit2 = new THREE.Mesh(coolingUnitGeometry, coolingUnitMaterial);
      coolingUnit2.position.set(12, 1.5, 0);
      coolingUnit2.castShadow = true;
      sceneRef.current.add(coolingUnit2);
      
      // Add walls
      const wallMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xeeeeee,
        side: THREE.DoubleSide
      });
      
      // Back wall
      const backWallGeometry = new THREE.PlaneGeometry(50, 10);
      const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
      backWall.position.set(0, 5, -25);
      sceneRef.current.add(backWall);
      
      // Front wall
      const frontWallGeometry = new THREE.PlaneGeometry(50, 10);
      const frontWall = new THREE.Mesh(frontWallGeometry, wallMaterial);
      frontWall.position.set(0, 5, 25);
      frontWall.rotation.y = Math.PI;
      sceneRef.current.add(frontWall);
      
      // Left wall
      const leftWallGeometry = new THREE.PlaneGeometry(50, 10);
      const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
      leftWall.position.set(-25, 5, 0);
      leftWall.rotation.y = Math.PI / 2;
      sceneRef.current.add(leftWall);
      
      // Right wall
      const rightWallGeometry = new THREE.PlaneGeometry(50, 10);
      const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
      rightWall.position.set(25, 5, 0);
      rightWall.rotation.y = -Math.PI / 2;
      sceneRef.current.add(rightWall);
    }
    
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
    };
  }, [containerRef, sceneRef, cameraRef, rendererRef, animationFrameId, initializedRef, floorConfig]);

  return null;
};

export default SceneInitializer;
