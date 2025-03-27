
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkOrderWorkflows from "@/components/workflows/WorkOrderWorkflows";
import MaintenanceWorkflows from "@/components/workflows/MaintenanceWorkflows";
import WorkflowHeader from "@/components/workflows/WorkflowHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const Workflows = () => {
  const [activeTab, setActiveTab] = useState("workorders");

  return (
    <div className="space-y-6">
      <WorkflowHeader />
      
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4" />
        <AlertTitle>New Feature</AlertTitle>
        <AlertDescription>
          You can now design workflows visually with our new Flow Editor. Try it when creating a new workflow!
        </AlertDescription>
      </Alert>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Workflow Templates</CardTitle>
          <CardDescription>
            Standardized checklists and procedures for work orders and maintenance tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Workflows;
