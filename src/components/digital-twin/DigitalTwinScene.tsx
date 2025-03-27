
import { useRef } from 'react';
import * as THREE from 'three';
import { Box } from 'lucide-react';
import SceneInitializer from './SceneInitializer';
import CameraControls from './CameraControls';
import ControlButtons from './ControlButtons';

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
      />
      <CameraControls 
        containerRef={containerRef}
        sceneRef={sceneRef}
        cameraRef={cameraRef}
      />
      <ControlButtons cameraRef={cameraRef} />
    </div>
  );
};

export default DigitalTwinScene;
