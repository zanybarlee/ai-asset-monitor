
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkOrderWorkflows from "@/components/workflows/WorkOrderWorkflows";
import MaintenanceWorkflows from "@/components/workflows/MaintenanceWorkflows";
import WorkflowHeader from "@/components/workflows/WorkflowHeader";

const Workflows = () => {
  const [activeTab, setActiveTab] = useState("workorders");

  return (
    <div className="space-y-6">
      <WorkflowHeader />
      
      <Tabs defaultValue="workorders" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="workorders">Work Order Checklists</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance Checklists</TabsTrigger>
        </TabsList>
        
        <TabsContent value="workorders" className="space-y-4 mt-4">
          <WorkOrderWorkflows />
        </TabsContent>
        
        <TabsContent value="maintenance" className="space-y-4 mt-4">
          <MaintenanceWorkflows />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Workflows;
