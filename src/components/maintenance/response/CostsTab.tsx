
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Wrench } from "lucide-react";
import PartsTab from "./PartsTab";
import LaborTab from "./LaborTab";
import { Part, Labor } from "./types";

interface CostsTabProps {
  parts: Part[];
  setParts: React.Dispatch<React.SetStateAction<Part[]>>;
  labor: Labor[];
  setLabor: React.Dispatch<React.SetStateAction<Labor[]>>;
}

const CostsTab = ({ parts, setParts, labor, setLabor }: CostsTabProps) => {
  const calculateTotal = () => {
    const partsTotal = parts.reduce((sum, part) => sum + (part.quantity * part.cost), 0);
    const laborTotal = labor.reduce((sum, item) => sum + (item.hours * item.rate), 0);
    return partsTotal + laborTotal;
  };

  return (
    <div className="py-4 space-y-6">
      <Tabs defaultValue="parts" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="parts">
            <Package className="h-4 w-4 mr-2" />
            Parts Used
          </TabsTrigger>
          <TabsTrigger value="labor">
            <Wrench className="h-4 w-4 mr-2" />
            Labor
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="parts">
          <PartsTab parts={parts} setParts={setParts} />
        </TabsContent>
        
        <TabsContent value="labor">
          <LaborTab labor={labor} setLabor={setLabor} />
        </TabsContent>
      </Tabs>
      
      {/* Cost Summary */}
      {(parts.length > 0 || labor.length > 0) && (
        <div className="border-t pt-4 flex justify-between items-center">
          <span className="font-medium">Total Cost:</span>
          <span className="font-medium text-lg">${calculateTotal().toFixed(2)}</span>
        </div>
      )}
    </div>
  );
};

export default CostsTab;
