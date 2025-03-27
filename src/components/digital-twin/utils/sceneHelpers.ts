
import * as THREE from 'three';

export const createServerRack = (x: number, z: number) => {
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

export const handleResize = (
  containerRef: React.RefObject<HTMLDivElement>, 
  cameraRef: React.RefObject<THREE.PerspectiveCamera>, 
  rendererRef: React.RefObject<THREE.WebGLRenderer>
) => {
  if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
  
  const width = containerRef.current.clientWidth;
  const height = containerRef.current.clientHeight;
  
  cameraRef.current.aspect = width / height;
  cameraRef.current.updateProjectionMatrix();
  rendererRef.current.setSize(width, height);
};
