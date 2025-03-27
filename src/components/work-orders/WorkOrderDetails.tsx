
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockOrders } from "./work-orders-data";
import { useToast } from "@/hooks/use-toast";
import OrderInfoHeader from "./details/OrderInfoHeader";
import BreakdownTab from "./details/BreakdownTab";
import TechnicianTab from "./details/TechnicianTab";
import AttachmentsTab from "./details/AttachmentsTab";
import CostTrackingPanel from "./details/CostTrackingPanel";

interface WorkOrderDetailsProps {
  open: boolean;
  onClose: () => void;
  orderId: string;
}

const WorkOrderDetails = ({ open, onClose, orderId }: WorkOrderDetailsProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("breakdown");
  const [attachments, setAttachments] = useState<string[]>([
    "Inspection Report.pdf",
    "Site Photos.zip"
  ]);
  
  const workOrder = mockOrders.find(order => order.id === orderId) || mockOrders[0];
  
  const [parts, setParts] = useState(workOrder.parts || []);
  const [laborTasks, setLaborTasks] = useState(workOrder.laborTasks || []);
  
  const handleUploadAttachment = (file: File) => {
    setAttachments([...attachments, file.name]);
    toast({
      title: "Attachment uploaded",
      description: `${file.name} has been uploaded successfully.`
    });
  };
  
  const handleAddPart = () => {
    const newPart = {
      id: `P${Date.now()}`,
      name: "Replacement Part",
      partNumber: "RP-1234",
      unitCost: 45.99,
      quantity: 1,
      total: 45.99
    };
    
    setParts([...parts, newPart]);
  };
  
  const handleAddLabor = () => {
    const newLabor = {
      id: `L${Date.now()}`,
      description: "Maintenance Work",
      assignedTo: "Current User",
      estimatedHours: 1,
      hourlyRate: 85,
      total: 85
    };
    
    setLaborTasks([...laborTasks, newLabor]);
  };
  
  const calculateTotal = () => {
    const partsTotal = parts.reduce((sum, part) => sum + part.total, 0);
    const laborTotal = laborTasks.reduce((sum, task) => sum + task.total, 0);
    return partsTotal + laborTotal;
  };
  
  const handleUpdate = () => {
    toast({
      title: "Work Order Updated",
      description: "Your response has been recorded successfully."
    });
    onClose();
  };
  
  const handleCompleteWorkOrder = (data: any) => {
    console.log("Completion data:", data);
    toast({
      title: "Work Order Completed",
      description: "The work order has been marked as completed."
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <span>{workOrder.id}</span>
            <span className="text-lg font-normal">-</span>
            <span className="font-normal">{workOrder.title}</span>
          </DialogTitle>
        </DialogHeader>
        
        <OrderInfoHeader workOrder={workOrder} />
        
        <Tabs defaultValue="breakdown" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="breakdown">Breakdown Information</TabsTrigger>
            <TabsTrigger value="technician">Technician Form</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="breakdown" className="py-4 space-y-4">
            <BreakdownTab />
          </TabsContent>
          
          <TabsContent value="technician" className="py-4">
            <TechnicianTab onComplete={handleCompleteWorkOrder} />
          </TabsContent>
          
          <TabsContent value="attachments" className="py-4 space-y-4">
            <AttachmentsTab 
              attachments={attachments} 
              onUpload={handleUploadAttachment} 
            />
            
            <CostTrackingPanel 
              parts={parts}
              laborTasks={laborTasks}
              onAddPart={handleAddPart}
              onAddLabor={handleAddLabor}
              totalCost={calculateTotal()}
            />
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkOrderDetails;
