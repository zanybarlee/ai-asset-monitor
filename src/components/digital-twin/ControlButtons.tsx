
import React from 'react';
import { Button } from "@/components/ui/button";
import { RotateCcw, Maximize2, Minimize2 } from 'lucide-react';
import * as THREE from 'three';

interface ControlButtonsProps {
  cameraRef: React.RefObject<THREE.PerspectiveCamera>;
}

const ControlButtons = ({ cameraRef }: ControlButtonsProps) => {
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

  return (
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
  );
};

export default ControlButtons;
