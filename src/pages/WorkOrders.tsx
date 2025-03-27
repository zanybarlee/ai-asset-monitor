
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Filter, Check, Clock, AlertTriangle, Wrench } from "lucide-react";
import { mockOrders } from "@/components/work-orders/work-orders-data";
import WorkOrdersList from "@/components/work-orders/WorkOrdersList";
import WorkOrderForm from "@/components/work-orders/WorkOrderForm";
import { useToast } from "@/hooks/use-toast";

const WorkOrders = () => {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterTab, setFilterTab] = useState("all");
  
  const handleCreateWorkOrder = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
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

  const filteredOrders = mockOrders.filter(order => {
    if (filterTab === "all") return true;
    return order.status.toLowerCase().replace(/\s+/g, '') === filterTab;
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
        
        <TabsContent value="all" className="space-y-4 mt-4">
          <div className="flex justify-end">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          
          <WorkOrdersList 
            orders={filteredOrders} 
            getStatusColor={getStatusColor} 
            getPriorityColor={getPriorityColor} 
            getStatusIcon={getStatusIcon} 
          />
        </TabsContent>
        
        <TabsContent value="open" className="mt-4">
          <WorkOrdersList 
            orders={filteredOrders} 
            getStatusColor={getStatusColor} 
            getPriorityColor={getPriorityColor} 
            getStatusIcon={getStatusIcon} 
          />
        </TabsContent>
        
        <TabsContent value="inprogress" className="mt-4">
          <WorkOrdersList 
            orders={filteredOrders} 
            getStatusColor={getStatusColor} 
            getPriorityColor={getPriorityColor} 
            getStatusIcon={getStatusIcon} 
          />
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <WorkOrdersList 
            orders={filteredOrders} 
            getStatusColor={getStatusColor} 
            getPriorityColor={getPriorityColor} 
            getStatusIcon={getStatusIcon} 
          />
        </TabsContent>
      </Tabs>

      {isFormOpen && <WorkOrderForm open={isFormOpen} onClose={handleCloseForm} />}
    </div>
  );
};

export default WorkOrders;
