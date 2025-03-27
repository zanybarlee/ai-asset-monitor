
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Box } from 'lucide-react';
import SceneInitializer from './SceneInitializer';
import CameraControls from './CameraControls';
import ControlButtons from './ControlButtons';
import { floorConfigs, FloorConfig } from './FloorSceneConfig';

interface DigitalTwinSceneProps {
  className?: string;
  activeFloor?: string;
}

const DigitalTwinScene = ({ className, activeFloor = "serverRoom" }: DigitalTwinSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const initializedRef = useRef(false);
  
  // Get the floor configuration based on the active floor
  const floorConfig = floorConfigs[activeFloor];
  
  // Clear the scene when the floor changes
  useEffect(() => {
    initializedRef.current = false;
  }, [activeFloor]);
  
  return (
    <div className="relative">
      <div 
        ref={containerRef} 
        className={`aspect-video bg-black/5 rounded-md border relative ${className}`}
      />
      <SceneInitializer 
        containerRef={containerRef}
        sceneRef={sceneRef}
        cameraRef={cameraRef}
        rendererRef={rendererRef}
        animationFrameId={animationFrameId}
        initializedRef={initializedRef}
        floorConfig={floorConfig}
      />
      <CameraControls 
        containerRef={containerRef}
        sceneRef={sceneRef}
        cameraRef={cameraRef}
      />
      <ControlButtons cameraRef={cameraRef} />
      
      {floorConfig && (
        <div className="absolute top-4 left-4 bg-white/80 p-2 rounded-md shadow-sm max-w-xs">
          <h3 className="font-medium text-sm">{floorConfig.title}</h3>
          <p className="text-xs text-muted-foreground">{floorConfig.description}</p>
        </div>
      )}
    </div>
  );
};

export default DigitalTwinScene;
