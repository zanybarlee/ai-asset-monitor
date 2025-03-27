
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Clock, AlertTriangle, Wrench, BarChart2 } from "lucide-react";
import { mockOrders } from "@/components/work-orders/work-orders-data";
import WorkOrdersList from "@/components/work-orders/WorkOrdersList";
import WorkOrderForm from "@/components/work-orders/WorkOrderForm";
import WorkOrderDetails from "@/components/work-orders/WorkOrderDetails";
import WorkOrderCreationWizard from "@/components/work-orders/enhanced/WorkOrderCreationWizard";
import TechnicianTasksView from "@/components/work-orders/enhanced/TechnicianTasksView";
import SupervisorDashboard from "@/components/work-orders/enhanced/SupervisorDashboard";
import WorkOrderKPICards from "@/components/work-orders/enhanced/WorkOrderKPICards";
import EmergencyRequestsTable from "@/components/work-orders/enhanced/EmergencyRequestsTable";
import { useToast } from "@/hooks/use-toast";

const WorkOrdersEnhanced = () => {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [filterTab, setFilterTab] = useState("all");
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

  const handleGenerateFromAlert = () => {
    toast({
      title: "Emergency Work Order Generated",
      description: "New emergency work order WO-1006 created from Critical Alert ALT-4523",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-500";
      case "In Progress":
        return "bg-amber-500";
      case "Pending":
        return "bg-purple-500";
      case "Completed":
        return "bg-emerald-500";
      case "Delayed":
        return "bg-destructive";
      default:
        return "bg-secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-destructive/90 text-white";
      case "High":
        return "bg-amber-500/90 text-white";
      case "Medium":
        return "bg-blue-500/90 text-white";
      case "Low":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <Clock className="h-4 w-4" />;
      case "In Progress":
        return <Wrench className="h-4 w-4" />;
      case "Pending":
        return <Clock className="h-4 w-4" />;
      case "Completed":
        return <Clock className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Filter orders based on status tab
  const filteredOrders = mockOrders.filter(order => {
    if (filterTab !== "all" && order.status.toLowerCase().replace(/\s+/g, '') !== filterTab) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Work Orders Management</h2>
          <p className="text-muted-foreground">
            Create, manage, and track maintenance tasks across your facility
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleGenerateFromAlert}>
            <AlertTriangle className="mr-2 h-4 w-4" />
            Create from Alert
          </Button>
          <Button onClick={handleCreateWorkOrder}>
            <Plus className="mr-2 h-4 w-4" />
            Create Work Order
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <WorkOrderKPICards />

      <Tabs defaultValue="standard" value={viewMode} onValueChange={setViewMode} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="standard">Standard View</TabsTrigger>
          <TabsTrigger value="technician">Technician Tasks</TabsTrigger>
          <TabsTrigger value="supervisor">Supervisor Dashboard</TabsTrigger>
        </TabsList>
        
        {/* Standard View Tab */}
        <TabsContent value="standard" className="space-y-4 mt-4">
          <Tabs defaultValue="all" value={filterTab} onValueChange={setFilterTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="inprogress">In Progress</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <div className="flex justify-between items-center mt-4">
              <select 
                className="bg-background border rounded-md p-2 text-sm"
                defaultValue="all"
              >
                <option value="all">All Work Order Types</option>
                <option value="preventive">Preventive Maintenance</option>
                <option value="corrective">Corrective Maintenance</option>
                <option value="emergency">Emergency Repairs</option>
                <option value="service">Service Requests</option>
                <option value="project">Project Work</option>
              </select>
              
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Advanced Filters
              </Button>
            </div>
            
            <div className="mt-4">
              <WorkOrdersList 
                orders={filteredOrders} 
                getStatusColor={getStatusColor} 
                getPriorityColor={getPriorityColor} 
                getStatusIcon={getStatusIcon}
                onViewDetails={handleViewDetails}
              />
            </div>
          </Tabs>
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
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />
          Emergency Requests
        </h3>
        <EmergencyRequestsTable onViewDetails={handleViewDetails} />
      </div>

      {/* Work Order Form Dialog */}
      {isFormOpen && <WorkOrderForm open={isFormOpen} onClose={handleCloseForm} />}
      
      {/* Work Order Creation Wizard */}
      {isWizardOpen && <WorkOrderCreationWizard open={isWizardOpen} onClose={handleCloseWizard} />}
      
      {/* Work Order Details Dialog */}
      {isDetailsOpen && selectedOrderId && (
        <WorkOrderDetails 
          open={isDetailsOpen} 
          onClose={handleCloseDetails} 
          orderId={selectedOrderId} 
        />
      )}
    </div>
  );
};

export default WorkOrdersEnhanced;
