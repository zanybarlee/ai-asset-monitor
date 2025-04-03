
import { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Maximize2, Minimize2, ExternalLink } from "lucide-react";

const IFRAME_URL = "http://223.25.78.212:9999";

const GenerativeEngineering = () => {
  const [isDetached, setIsDetached] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [detachedWindow, setDetachedWindow] = useState<Window | null>(null);

  const detachIframe = () => {
    const newWindow = window.open(
      IFRAME_URL,
      "GenerativeEngineering",
      "width=1200,height=800,resizable=yes"
    );
    if (newWindow) {
      setDetachedWindow(newWindow);
      setIsDetached(true);
      
      // Handle window close event
      newWindow.addEventListener('beforeunload', () => {
        setIsDetached(false);
        setDetachedWindow(null);
      });
    }
  };

  const reattachIframe = () => {
    if (detachedWindow && !detachedWindow.closed) {
      detachedWindow.close();
    }
    setIsDetached(false);
    setDetachedWindow(null);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)]">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Generative Engineering</h2>
          <p className="text-muted-foreground">
            AI-powered engineering tools and utilities for facility management
          </p>
        </div>
        <div className="flex space-x-2">
          {!isDetached && (
            <>
              <Button variant="outline" size="icon" onClick={toggleMinimize}>
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon" onClick={detachIframe}>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </>
          )}
          {isDetached && (
            <Button variant="outline" onClick={reattachIframe}>
              Reattach Window
            </Button>
          )}
        </div>
      </div>

      {isMinimized && (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full">Open Generative Engineering</Button>
          </DrawerTrigger>
          <DrawerContent className="h-[80vh]">
            <div className="p-4 h-full">
              <iframe 
                src={IFRAME_URL}
                className="w-full h-full border rounded"
                title="Generative Engineering"
              />
            </div>
          </DrawerContent>
        </Drawer>
      )}

      {!isMinimized && !isDetached && (
        <ResizablePanelGroup direction="vertical" className="min-h-[calc(100vh-12rem)] rounded-lg border">
          <ResizablePanel defaultSize={75}>
            <iframe 
              src={IFRAME_URL}
              className="w-full h-full"
              title="Generative Engineering"
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={25}>
            <div className="p-6">
              <h3 className="text-lg font-medium">Notes and Observations</h3>
              <p className="text-muted-foreground mt-2">
                Use this space to document observations from the Generative Engineering tools.
              </p>
              <textarea 
                className="w-full h-[calc(100%-5rem)] mt-4 p-2 border rounded-md resize-none" 
                placeholder="Add your notes here..."
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      )}

      {isDetached && (
        <div className="flex items-center justify-center h-[calc(100vh-15rem)] border rounded-lg">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Generative Engineering is running in a separate window
            </p>
            <Button variant="outline" onClick={reattachIframe}>
              Reattach Window
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerativeEngineering;
