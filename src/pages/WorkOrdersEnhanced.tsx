
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from "@/components/work-orders/enhanced/PageHeader";
import WorkOrderKPICards from "@/components/work-orders/enhanced/WorkOrderKPICards";
import StandardWorkOrdersView from "@/components/work-orders/enhanced/StandardWorkOrdersView";
import TechnicianTasksView from "@/components/work-orders/enhanced/TechnicianTasksView";
import SupervisorDashboard from "@/components/work-orders/enhanced/SupervisorDashboard";
import EmergencySection from "@/components/work-orders/enhanced/EmergencySection";
import WorkOrderDialogs from "@/components/work-orders/enhanced/WorkOrderDialogs";
import { getStatusColor, getPriorityColor, getStatusIcon } from "@/components/work-orders/enhanced/WorkOrderStatusUtils";

const WorkOrdersEnhanced = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState("standard");
  
  const handleCreateWorkOrder = () => {
    setIsWizardOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleCloseWizard = () => {
    setIsWizardOpen(false);
  };

  const handleViewDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedOrderId(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader onCreateWorkOrder={handleCreateWorkOrder} />

      {/* KPI Cards */}
      <WorkOrderKPICards />

      <Tabs defaultValue="standard" value={viewMode} onValueChange={setViewMode} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="standard">Standard View</TabsTrigger>
          <TabsTrigger value="technician">Technician Tasks</TabsTrigger>
          <TabsTrigger value="supervisor">Supervisor Dashboard</TabsTrigger>
        </TabsList>
        
        {/* Standard View Tab */}
        <TabsContent value="standard">
          <StandardWorkOrdersView
            onViewDetails={handleViewDetails}
            getStatusColor={getStatusColor}
            getPriorityColor={getPriorityColor}
            getStatusIcon={getStatusIcon}
          />
        </TabsContent>
        
        {/* Technician Tasks Tab */}
        <TabsContent value="technician" className="space-y-4 mt-4">
          <TechnicianTasksView onViewDetails={handleViewDetails} />
        </TabsContent>
        
        {/* Supervisor Dashboard Tab */}
        <TabsContent value="supervisor" className="space-y-4 mt-4">
          <SupervisorDashboard onViewDetails={handleViewDetails} />
        </TabsContent>
      </Tabs>
      
      {/* Emergency Requests Table */}
      <EmergencySection onViewDetails={handleViewDetails} />

      {/* Work Order Dialogs */}
      <WorkOrderDialogs
        isFormOpen={isFormOpen}
        isWizardOpen={isWizardOpen}
        isDetailsOpen={isDetailsOpen}
        selectedOrderId={selectedOrderId}
        onCloseForm={handleCloseForm}
        onCloseWizard={handleCloseWizard}
        onCloseDetails={handleCloseDetails}
      />
    </div>
  );
};

export default WorkOrdersEnhanced;
