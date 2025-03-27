
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Filter, Check, Clock, AlertTriangle, Wrench } from "lucide-react";
import { mockOrders } from "@/components/work-orders/work-orders-data";
import WorkOrdersList from "@/components/work-orders/WorkOrdersList";
import WorkOrderForm from "@/components/work-orders/WorkOrderForm";
import WorkOrderDetails from "@/components/work-orders/WorkOrderDetails";
import { useToast } from "@/hooks/use-toast";

const WorkOrders = () => {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [filterTab, setFilterTab] = useState("all");
  const [taskFilter, setTaskFilter] = useState("involved");
  
  const handleCreateWorkOrder = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
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
      title: "Work Order Generated",
      description: "New work order WO-1006 created from UPS Alert ALT-4523",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-500";
      case "In Progress":
        return "bg-amber-500";
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
        return <AlertTriangle className="h-4 w-4" />;
      case "Completed":
        return <Check className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Filter orders based on both status tab and task type (pending/involved)
  const filteredOrders = mockOrders.filter(order => {
    // First filter by status tab
    if (filterTab !== "all" && order.status.toLowerCase().replace(/\s+/g, '') !== filterTab) {
      return false;
    }
    
    // Then filter by task type (pending/involved)
    if (taskFilter === "pending") {
      return order.assignee === "Current User" && order.status !== "Completed";
    } else if (taskFilter === "involved") {
      return order.createdBy === "Current User" || order.status === "Completed";
    }
    
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Work Orders</h2>
          <p className="text-muted-foreground">
            Create and manage maintenance tasks
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleGenerateFromAlert}>
            <AlertTriangle className="mr-2 h-4 w-4" />
            Generate from Alert
          </Button>
          <Button onClick={handleCreateWorkOrder}>
            <Plus className="mr-2 h-4 w-4" />
            Create Work Order
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={filterTab} onValueChange={setFilterTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="inprogress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <div className="flex justify-between items-center mt-4">
          <select 
            className="bg-background border rounded-md p-2 text-sm"
            value={taskFilter}
            onChange={(e) => setTaskFilter(e.target.value)}
          >
            <option value="involved">Involved Tasks</option>
            <option value="pending">Pending Tasks</option>
          </select>
          
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        
        <TabsContent value="all" className="space-y-4 mt-4">
          <WorkOrdersList 
            orders={filteredOrders} 
            getStatusColor={getStatusColor} 
            getPriorityColor={getPriorityColor} 
            getStatusIcon={getStatusIcon}
            onViewDetails={handleViewDetails}
          />
        </TabsContent>
        
        <TabsContent value="open" className="mt-4">
          <WorkOrdersList 
            orders={filteredOrders} 
            getStatusColor={getStatusColor} 
            getPriorityColor={getPriorityColor} 
            getStatusIcon={getStatusIcon}
            onViewDetails={handleViewDetails} 
          />
        </TabsContent>
        
        <TabsContent value="inprogress" className="mt-4">
          <WorkOrdersList 
            orders={filteredOrders} 
            getStatusColor={getStatusColor} 
            getPriorityColor={getPriorityColor} 
            getStatusIcon={getStatusIcon}
            onViewDetails={handleViewDetails} 
          />
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <WorkOrdersList 
            orders={filteredOrders} 
            getStatusColor={getStatusColor} 
            getPriorityColor={getPriorityColor} 
            getStatusIcon={getStatusIcon}
            onViewDetails={handleViewDetails} 
          />
        </TabsContent>
      </Tabs>

      {isFormOpen && <WorkOrderForm open={isFormOpen} onClose={handleCloseForm} />}
      
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

export default WorkOrders;
