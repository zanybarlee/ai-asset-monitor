
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, MessageSquare, AlertTriangle, FileText } from "lucide-react";
import { mockOrders } from "@/components/work-orders/work-orders-data";

interface TechnicianTasksViewProps {
  onViewDetails: (orderId: string) => void;
}

const TechnicianTasksView = ({ onViewDetails }: TechnicianTasksViewProps) => {
  const [filterStatus, setFilterStatus] = useState("assigned");
  
  // Filter orders assigned to current user
  const myTasks = mockOrders.filter(order => order.assignee === "Current User");
  
  // Further filter by status
  const filteredTasks = filterStatus === "all" 
    ? myTasks 
    : filterStatus === "assigned" 
      ? myTasks.filter(task => task.status === "Open") 
      : filterStatus === "inprogress" 
        ? myTasks.filter(task => task.status === "In Progress") 
        : myTasks.filter(task => task.status === "Completed");

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">My Tasks</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Filter:</span>
          <select 
            className="bg-background border rounded-md p-2 text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Tasks</option>
            <option value="assigned">Assigned to Me</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      
      {filteredTasks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-muted-foreground">No tasks found matching your filter criteria</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredTasks.map(task => (
            <Card key={task.id} className="overflow-hidden">
              <div className={`h-1.5 ${task.priority === "Critical" ? "bg-destructive" : task.priority === "High" ? "bg-amber-500" : "bg-blue-500"}`} />
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{task.id}</span>
                      <Badge className={
                        task.priority === "Critical" ? "bg-destructive" : 
                        task.priority === "High" ? "bg-amber-500" : "bg-blue-500"
                      }>
                        {task.priority}
                      </Badge>
                      {task.status === "Open" && (
                        <Badge variant="outline" className="border-blue-500 text-blue-500">New</Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <div className="text-sm text-muted-foreground line-clamp-2">{task.description}</div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        <span>Asset: {task.asset || "HVAC-001"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>Location: {task.location || "Server Room A"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button onClick={() => onViewDetails(task.id)}>View Details</Button>
                    {task.status === "Open" && (
                      <Button variant="outline">Start Work</Button>
                    )}
                    {task.status === "In Progress" && (
                      <Button variant="outline">Mark Complete</Button>
                    )}
                    <Button variant="ghost" className="flex items-center gap-1 justify-center">
                      <MessageSquare className="h-4 w-4" />
                      <span>Comments (2)</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <div className="rounded-md border p-4 bg-muted/30 mt-8">
        <h4 className="font-medium mb-2">Shift Handover Notes</h4>
        <p className="text-sm text-muted-foreground mb-4">
          These tasks require completion or handover to the next shift
        </p>
        
        <div className="grid gap-2">
          {myTasks.slice(0, 2).map(task => (
            <div key={`handover-${task.id}`} className="flex items-center justify-between p-2 rounded-md bg-background border">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${task.priority === "Critical" ? "bg-destructive" : "bg-amber-500"}`} />
                <span className="text-sm font-medium">{task.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Incomplete</Badge>
                <Button variant="ghost" size="sm">Transfer</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnicianTasksView;
