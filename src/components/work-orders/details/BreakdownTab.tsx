
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";

const BreakdownTab = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="problem-description">Problem Description</Label>
          <Textarea 
            id="problem-description" 
            placeholder="Describe the issue in detail"
            className="mt-1 h-24"
          />
        </div>
        <div>
          <Label htmlFor="action-taken">Action Taken</Label>
          <Textarea 
            id="action-taken" 
            placeholder="Describe what actions were taken"
            className="mt-1 h-24"
          />
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <Label>Image Evidence</Label>
          <Button variant="outline" size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Image
          </Button>
        </div>
        
        <div className="border rounded-md p-4 flex items-center justify-center h-40">
          <img 
            src="/lovable-uploads/077160d5-bf38-4a19-b83d-913b1139786d.png" 
            alt="Car Door Issue" 
            className="max-h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default BreakdownTab;
