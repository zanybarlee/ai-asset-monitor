import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Box3D, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface DigitalTwinSceneProps {
  className?: string;
}

const DigitalTwinScene = ({ className }: DigitalTwinSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const initializedRef = useRef(false);

  const handleReset = () => {
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 10, 20);
      cameraRef.current.lookAt(0, 0, 0);
    }
  };

  const handleZoomIn = () => {
    if (cameraRef.current) {
      cameraRef.current.position.z -= 5;
    }
  };

  const handleZoomOut = () => {
    if (cameraRef.current) {
      cameraRef.current.position.z += 5;
    }
  };

  const initScene = () => {
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
    
    // Create server racks
    const createServerRack = (x: number, z: number) => {
      const rackGroup = new THREE.Group();
      
      // Create rack frame
      const rackGeometry = new THREE.BoxGeometry(2, 4, 1);
      const rackMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
      const rack = new THREE.Mesh(rackGeometry, rackMaterial);
      rack.position.set(0, 2, 0);
      rack.castShadow = true;
      rackGroup.add(rack);
      
      // Add servers to rack
      for (let i = 0; i < 6; i++) {
        const serverGeometry = new THREE.BoxGeometry(1.8, 0.5, 0.9);
        const serverMaterial = new THREE.MeshStandardMaterial({ 
          color: 0x555555, 
          metalness: 0.5, 
          roughness: 0.2 
        });
        const server = new THREE.Mesh(serverGeometry, serverMaterial);
        server.position.set(0, 0.5 + i * 0.6, 0);
        server.castShadow = true;
        rackGroup.add(server);
        
        // Add LED lights
        const ledGeometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
        const ledMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const led = new THREE.Mesh(ledGeometry, ledMaterial);
        led.position.set(0.8, 0.5 + i * 0.6, 0.4);
        rackGroup.add(led);
      }
      
      rackGroup.position.set(x, 0, z);
      return rackGroup;
    };
    
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
      animationFrameId.current = requestAnimationFrame(animate);
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
    initializedRef.current = true;
    
    // Add window resize handler
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Handle mouse interactions
    let isMouseDown = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      previousMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
    };
    
    const handleMouseUp = () => {
      isMouseDown = false;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown || !sceneRef.current) return;
      
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };
      
      if (cameraRef.current) {
        // Rotate camera around scene center
        const cameraDirection = new THREE.Vector3();
        cameraRef.current.getWorldDirection(cameraDirection);
        
        const rotationSpeed = 0.01;
        
        // Create rotation matrices
        const rotateY = new THREE.Matrix4().makeRotationY(-deltaMove.x * rotationSpeed);
        const rotateX = new THREE.Matrix4().makeRotationX(-deltaMove.y * rotationSpeed);
        
        // Apply rotations to camera position
        const cameraPosition = new THREE.Vector3().copy(cameraRef.current.position);
        cameraPosition.applyMatrix4(rotateY);
        cameraPosition.applyMatrix4(rotateX);
        
        cameraRef.current.position.copy(cameraPosition);
        cameraRef.current.lookAt(0, 0, 0);
      }
      
      previousMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
    };
    
    const handleWheel = (e: WheelEvent) => {
      if (!cameraRef.current) return;
      
      // Calculate zoom factor
      const zoomSpeed = 0.1;
      const zoomFactor = e.deltaY > 0 ? 1 + zoomSpeed : 1 - zoomSpeed;
      
      // Apply zoom by scaling distance from target
      const cameraPosition = new THREE.Vector3().copy(cameraRef.current.position);
      cameraPosition.multiplyScalar(zoomFactor);
      
      // Limit how close and far the camera can be
      const distance = cameraPosition.length();
      if (distance > 5 && distance < 50) {
        cameraRef.current.position.copy(cameraPosition);
      }
    };
    
    containerRef.current.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('wheel', handleWheel);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('wheel', handleWheel);
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  };
  
  useEffect(() => {
    const cleanup = initScene();
    
    return () => {
      if (cleanup) cleanup();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);
  
  return (
    <div className="relative">
      <div 
        ref={containerRef} 
        className={`aspect-video bg-black/5 rounded-md border relative ${className}`}
      />
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button variant="outline" size="icon" onClick={handleZoomIn}>
          <Maximize2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleZoomOut}>
          <Minimize2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleReset}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DigitalTwinScene;
