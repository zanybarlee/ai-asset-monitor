
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WorkOrder } from "./work-orders-data";
import { Wrench } from "lucide-react";

interface WorkOrdersListProps {
  orders: WorkOrder[];
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
}

const WorkOrdersList = ({ 
  orders, 
  getStatusColor, 
  getPriorityColor, 
  getStatusIcon 
}: WorkOrdersListProps) => {
  return (
    <div className="grid gap-4">
      {orders.length === 0 ? (
        <div className="flex items-center justify-center p-8 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground">No work orders found matching the current filters.</p>
        </div>
      ) : (
        orders.map((order) => (
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
                <div className="flex justify-end items-center gap-2">
                  {order.status !== "Completed" && (
                    <Button variant="outline" size="sm">
                      <Wrench className="mr-2 h-4 w-4" />
                      Dispatch
                    </Button>
                  )}
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>

              {(order.parts?.length > 0 || order.laborTasks?.length > 0) && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium">Cost Summary</h4>
                    <p className="text-sm font-medium">${order.costTotal?.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {order.parts && order.parts.length > 0 && (
                      <div className="text-xs">
                        <p className="text-muted-foreground mb-1">Parts: ${order.parts.reduce((sum, part) => sum + part.total, 0).toFixed(2)}</p>
                        <p className="text-muted-foreground">{order.parts.length} items</p>
                      </div>
                    )}
                    {order.laborTasks && order.laborTasks.length > 0 && (
                      <div className="text-xs md:text-right">
                        <p className="text-muted-foreground mb-1">Labor: ${order.laborTasks.reduce((sum, task) => sum + task.total, 0).toFixed(2)}</p>
                        <p className="text-muted-foreground">{order.laborTasks.reduce((sum, task) => sum + task.estimatedHours, 0)} hours</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default WorkOrdersList;
