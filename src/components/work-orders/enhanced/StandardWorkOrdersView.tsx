
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { mockOrders } from "@/components/work-orders/work-orders-data";
import WorkOrdersList from "@/components/work-orders/WorkOrdersList";

interface StandardWorkOrdersViewProps {
  onViewDetails: (orderId: string) => void;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
}

const StandardWorkOrdersView = ({ 
  onViewDetails, 
  getStatusColor, 
  getPriorityColor, 
  getStatusIcon 
}: StandardWorkOrdersViewProps) => {
  const [filterTab, setFilterTab] = useState("all");

  // Filter orders based on status tab
  const filteredOrders = mockOrders.filter(order => {
    if (filterTab !== "all" && order.status.toLowerCase().replace(/\s+/g, '') !== filterTab) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-4 mt-4">
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
            onViewDetails={onViewDetails}
          />
        </div>
      </Tabs>
    </div>
  );
};

export default StandardWorkOrdersView;
