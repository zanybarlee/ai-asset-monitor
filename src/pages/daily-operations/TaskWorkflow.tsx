
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar, Plus } from "lucide-react";
import WorkOrderWorkflows from "@/components/workflows/WorkOrderWorkflows";
import MaintenanceWorkflows from "@/components/workflows/MaintenanceWorkflows";
import WorkOrderForm from "@/components/work-orders/WorkOrderForm";
import MaintenanceFormDialog from "@/components/maintenance/MaintenanceFormDialog";

const TaskWorkflow = () => {
  const [isWorkOrderFormOpen, setIsWorkOrderFormOpen] = useState(false);
  const [isMaintenanceFormOpen, setIsMaintenanceFormOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Task & Workflow Management</h3>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="gap-1" 
            onClick={() => setIsWorkOrderFormOpen(true)}
          >
            <Plus className="h-4 w-4" />
            New Work Order
          </Button>
          <Button 
            size="sm" 
            className="gap-1" 
            onClick={() => setIsMaintenanceFormOpen(true)}
          >
            <Calendar className="h-4 w-4" />
            Schedule Maintenance
          </Button>
        </div>
      </div>

      <Tabs defaultValue="work-order">
        <TabsList>
          <TabsTrigger value="work-order">Work Order Workflows</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance Workflows</TabsTrigger>
        </TabsList>

        <TabsContent value="work-order" className="pt-4">
          <WorkOrderWorkflows />
        </TabsContent>

        <TabsContent value="maintenance" className="pt-4">
          <MaintenanceWorkflows />
        </TabsContent>
      </Tabs>

      {/* Reused Work Order Form Dialog */}
      {isWorkOrderFormOpen && (
        <WorkOrderForm
          open={isWorkOrderFormOpen}
          onClose={() => setIsWorkOrderFormOpen(false)}
        />
      )}

      {/* Reused Maintenance Form Dialog */}
      {isMaintenanceFormOpen && (
        <MaintenanceFormDialog
          open={isMaintenanceFormOpen}
          onClose={() => setIsMaintenanceFormOpen(false)}
        />
      )}
    </div>
  );
};

export default TaskWorkflow;
