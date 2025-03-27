import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Part, LaborTask } from "./work-orders-data";

import BasicInformationTab from "./form/BasicInformationTab";
import PartsTab, { PartsTotals } from "./form/PartsTab";
import LaborTasksTab, { LaborTotals } from "./form/LaborTasksTab";
import OrderTotals from "./form/OrderTotals";

interface WorkOrderFormProps {
  open: boolean;
  onClose: () => void;
}

const WorkOrderForm = ({ open, onClose }: WorkOrderFormProps) => {
  const { toast } = useToast();
  const [formTab, setFormTab] = useState("basic");
  
  const [selectedParts, setSelectedParts] = useState<Part[]>([]);
  const [selectedLaborTasks, setSelectedLaborTasks] = useState<LaborTask[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Work Order Created",
      description: "The work order has been created and assigned to the technician.",
    });
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Work Order</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new work order. Add parts and labor as needed.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" value={formTab} onValueChange={setFormTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="parts">Parts ({selectedParts.length})</TabsTrigger>
              <TabsTrigger value="labor">Labor Tasks ({selectedLaborTasks.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <BasicInformationTab />
            </TabsContent>
            
            <TabsContent value="parts" className="space-y-4">
              <PartsTab />
            </TabsContent>
            
            <TabsContent value="labor" className="space-y-4">
              <LaborTasksTab />
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-6 border-t pt-4">
            <div className="flex-1">
              {(selectedParts.length > 0 || selectedLaborTasks.length > 0) && (
                <OrderTotals 
                  parts={selectedParts} 
                  laborTasks={selectedLaborTasks} 
                />
              )}
            </div>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Submit to Technician</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WorkOrderForm;
