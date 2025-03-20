
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Filter, Check, Clock, AlertTriangle } from "lucide-react";

const mockOrders = [
  {
    id: "WO-1001",
    title: "HVAC Maintenance Check",
    priority: "High",
    status: "Open",
    assignee: "John Doe",
    dueDate: "2023-08-18",
    createdAt: "2023-08-10",
    description: "Perform routine maintenance check on the HVAC system in Server Room A."
  },
  {
    id: "WO-1002",
    title: "Power Supply Inspection",
    priority: "Critical",
    status: "In Progress",
    assignee: "Sarah Johnson",
    dueDate: "2023-08-15",
    createdAt: "2023-08-09",
    description: "Inspect and test the backup power supply systems following recent power fluctuations."
  },
  {
    id: "WO-1003",
    title: "Fire Suppression Test",
    priority: "Medium",
    status: "Completed",
    assignee: "Mike Brown",
    dueDate: "2023-08-12",
    createdAt: "2023-08-05",
    description: "Conduct quarterly testing of the fire suppression system in Server Room B."
  },
  {
    id: "WO-1004",
    title: "Replace UPS Batteries",
    priority: "High",
    status: "Open",
    assignee: "Unassigned",
    dueDate: "2023-08-20",
    createdAt: "2023-08-11",
    description: "Replace batteries in the UPS system that are showing signs of degradation."
  },
  {
    id: "WO-1005",
    title: "Network Switch Installation",
    priority: "Medium",
    status: "In Progress",
    assignee: "Alex Chen",
    dueDate: "2023-08-17",
    createdAt: "2023-08-08",
    description: "Install new network switches in Rack 5 to expand capacity."
  }
];

const WorkOrders = () => {
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Work Orders</h2>
          <p className="text-muted-foreground">
            Create and manage maintenance tasks
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Work Order
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="inProgress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-4">
          <div className="flex justify-end">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          
          <div className="grid gap-4">
            {mockOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <div className={`h-1.5 ${getStatusColor(order.status)}`} />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-muted-foreground">{order.id}</span>
                        <Badge className={getPriorityColor(order.priority)}>{order.priority}</Badge>
                      </div>
                      <CardTitle className="text-xl">{order.title}</CardTitle>
                    </div>
                    <Badge className="flex items-center gap-1.5">
                      {getStatusIcon(order.status)}
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{order.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Assignee</p>
                      <p className="text-muted-foreground">{order.assignee}</p>
                    </div>
                    <div>
                      <p className="font-medium">Created</p>
                      <p className="text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="font-medium">Due Date</p>
                      <p className="text-muted-foreground">{new Date(order.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex justify-end items-center">
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="open" className="mt-4">
          <div className="flex items-center justify-center p-8 text-muted-foreground">
            Filtered view of Open work orders would appear here
          </div>
        </TabsContent>
        
        <TabsContent value="inProgress" className="mt-4">
          <div className="flex items-center justify-center p-8 text-muted-foreground">
            Filtered view of In Progress work orders would appear here
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <div className="flex items-center justify-center p-8 text-muted-foreground">
            Filtered view of Completed work orders would appear here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkOrders;
