
import { useEffect } from 'react';
import * as THREE from 'three';

interface CameraControlsProps {
  containerRef: React.RefObject<HTMLDivElement>;
  sceneRef: React.RefObject<THREE.Scene>;
  cameraRef: React.RefObject<THREE.PerspectiveCamera>;
}

const CameraControls = ({ containerRef, sceneRef, cameraRef }: CameraControlsProps) => {
  useEffect(() => {
    if (!containerRef.current) return;
    
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
      containerRef.current?.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('wheel', handleWheel);
    };
  }, [containerRef, sceneRef, cameraRef]);

  return null;
};

export default CameraControls;
