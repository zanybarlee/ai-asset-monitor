
import { useState } from "react";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Visitor } from "./types";
import PhotoCapture from "./badge/PhotoCapture";
import VisitorBadge from "./badge/VisitorBadge";

interface BadgePrintingDialogProps {
  visitor: Visitor;
}

const BadgePrintingDialog = ({ visitor }: BadgePrintingDialogProps) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("preview");
  
  const handlePhotoCapture = (photoData: string) => {
    setPhoto(photoData);
    setActiveTab("preview");
  };
  
  const handlePrint = () => {
    // In a real application, this would connect to a printer API
    // For now, we'll use the browser's print functionality
    window.print();
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Visitor Badge</DialogTitle>
        <DialogDescription>
          Print a visitor badge for {visitor.name}
        </DialogDescription>
      </DialogHeader>
      
      <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Badge Preview</TabsTrigger>
          <TabsTrigger value="photo">Add Photo</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="py-4">
          <VisitorBadge 
            visitor={visitor} 
            photo={photo} 
            onPrint={handlePrint} 
          />
        </TabsContent>
        
        <TabsContent value="photo" className="py-4">
          <PhotoCapture onPhotoCapture={handlePhotoCapture} />
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};

export default BadgePrintingDialog;
