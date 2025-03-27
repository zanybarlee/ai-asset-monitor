
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Wrench, DollarSign } from "lucide-react";
import { Part, LaborTask } from "../work-orders-data";
import PartsTab from "./PartsTab";
import LaborTab from "./LaborTab";

interface CostTrackingPanelProps {
  parts: Part[];
  laborTasks: LaborTask[];
  onAddPart: () => void;
  onAddLabor: () => void;
  totalCost: number;
}

const CostTrackingPanel = ({ 
  parts, 
  laborTasks, 
  onAddPart, 
  onAddLabor, 
  totalCost 
}: CostTrackingPanelProps) => {
  return (
    <div className="mt-8 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Cost Tracking</h3>
        <div className="text-sm font-medium">Total: ${totalCost.toFixed(2)}</div>
      </div>
      
      <Tabs defaultValue="parts" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="parts">
            <Package className="h-4 w-4 mr-2" />
            Parts
          </TabsTrigger>
          <TabsTrigger value="labor">
            <Wrench className="h-4 w-4 mr-2" />
            Labor
          </TabsTrigger>
          <TabsTrigger value="additional">
            <DollarSign className="h-4 w-4 mr-2" />
            Additional
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="parts" className="space-y-4 py-4">
          <PartsTab parts={parts} onAddPart={onAddPart} />
        </TabsContent>
        
        <TabsContent value="labor" className="space-y-4 py-4">
          <LaborTab laborTasks={laborTasks} onAddLabor={onAddLabor} />
        </TabsContent>
        
        <TabsContent value="additional" className="py-4">
          <div className="p-4 text-center text-muted-foreground">
            No additional costs added yet
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CostTrackingPanel;
