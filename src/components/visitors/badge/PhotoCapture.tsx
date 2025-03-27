
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera } from "lucide-react";

interface PhotoCaptureProps {
  onPhotoCapture: (photoData: string) => void;
}

const PhotoCapture = ({ onPhotoCapture }: PhotoCaptureProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    return () => {
      // Clean up stream when component unmounts
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 320, height: 240, facingMode: "user" } 
      });
      
      setStream(mediaStream);
      setIsCapturing(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCapturing(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    
    if (!context) return;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Get data URL from canvas
    const photoData = canvas.toDataURL("image/jpeg");
    
    // Pass photo data to parent component
    onPhotoCapture(photoData);
    
    // Stop the camera
    stopCamera();
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="relative bg-black rounded-md overflow-hidden">
          {isCapturing ? (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline
              className="w-full h-[240px] object-cover"
            />
          ) : (
            <div className="w-full h-[240px] flex items-center justify-center bg-muted">
              <Camera className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
        
        <div className="flex justify-center">
          {isCapturing ? (
            <div className="space-x-2">
              <Button onClick={capturePhoto} variant="default">
                Capture Photo
              </Button>
              <Button onClick={stopCamera} variant="outline">
                Cancel
              </Button>
            </div>
          ) : (
            <Button onClick={startCamera}>
              <Camera className="mr-2 h-4 w-4" />
              Start Camera
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotoCapture;
