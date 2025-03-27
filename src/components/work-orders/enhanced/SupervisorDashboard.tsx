
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Clock, 
  AlertTriangle, 
  BellRing, 
  Search, 
  BarChart2, 
  Users
} from "lucide-react";
import { mockOrders } from "@/components/work-orders/work-orders-data";

interface SupervisorDashboardProps {
  onViewDetails: (orderId: string) => void;
}

const SupervisorDashboard = ({ onViewDetails }: SupervisorDashboardProps) => {
  const [dashboardTab, setDashboardTab] = useState("priority");
  
  // Filter for high priority and overdue tasks
  const highPriorityTasks = mockOrders.filter(
    order => order.priority === "Critical" || order.priority === "High"
  );
  
  const overdueTasks = mockOrders.filter(order => {
    const dueDate = new Date(order.dueDate);
    const today = new Date();
    return dueDate < today && order.status !== "Completed";
  });
  
  // Tasks requiring approval
  const pendingApprovalTasks = mockOrders.filter(
    order => order.status === "Pending"
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              High Priority Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highPriorityTasks.length}</div>
            <p className="text-xs text-muted-foreground">{highPriorityTasks.filter(t => t.status === "Open").length} require immediate attention</p>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50 border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-red-600" />
              Overdue Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overdueTasks.length}</div>
            <p className="text-xs text-muted-foreground">Average of 2.5 days overdue</p>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              Technician Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">3 technicians available for new assignments</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Escalation Alerts */}
      {highPriorityTasks.length > 0 && (
        <Alert variant="destructive" className="border-destructive/50 text-destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Critical Work Orders Requiring Attention</AlertTitle>
          <AlertDescription>
            {highPriorityTasks.length} high priority tasks need immediate action. 
            {overdueTasks.length > 0 && ` ${overdueTasks.length} tasks are now overdue.`}
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="priority" value={dashboardTab} onValueChange={setDashboardTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="priority">Priority Tasks</TabsTrigger>
          <TabsTrigger value="approval">Pending Approval</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>
        
        {/* Priority Tasks Tab */}
        <TabsContent value="priority" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">High Priority & Overdue Tasks</h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search tasks..." 
                className="pl-8 h-9 rounded-md border border-input bg-background px-3"
              />
            </div>
          </div>
          
          <div className="grid gap-4">
            {[...highPriorityTasks, ...overdueTasks]
              .filter((task, index, self) => 
                index === self.findIndex(t => t.id === task.id)
              )
              .slice(0, 5)
              .map(task => (
                <Card key={`priority-${task.id}`} className="overflow-hidden">
                  <div className={`h-1.5 ${
                    task.priority === "Critical" ? "bg-destructive" : 
                    new Date(task.dueDate) < new Date() ? "bg-amber-500" : "bg-blue-500"
                  }`} />
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{task.id}</span>
                          <Badge className={
                            task.priority === "Critical" ? "bg-destructive" : 
                            task.priority === "High" ? "bg-amber-500" : "bg-blue-500"
                          }>
                            {task.priority}
                          </Badge>
                          {new Date(task.dueDate) < new Date() && (
                            <Badge variant="outline" className="text-destructive border-destructive">
                              Overdue
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-semibold">{task.title}</h4>
                        <div className="text-sm text-muted-foreground flex items-center gap-4">
                          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          <span>Assigned: {task.assignee}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2 md:mt-0">
                        <Button size="sm" onClick={() => onViewDetails(task.id)}>View</Button>
                        <Button size="sm" variant="outline">Reassign</Button>
                        <Button size="sm" variant="outline">Escalate</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        {/* Pending Approval Tab */}
        <TabsContent value="approval" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Tasks Requiring Approval</h3>
            <Button variant="outline" size="sm">Approve All</Button>
          </div>
          
          {pendingApprovalTasks.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground">No tasks pending approval</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {pendingApprovalTasks.slice(0, 5).map(task => (
                <Card key={`approval-${task.id}`} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{task.id}</span>
                          <Badge className="bg-purple-500">Pending Approval</Badge>
                        </div>
                        <h4 className="font-semibold">{task.title}</h4>
                        <div className="text-sm text-muted-foreground">
                          Completed by: {task.assignee} on {new Date().toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => onViewDetails(task.id)}>Review</Button>
                        <Button size="sm" variant="outline">Approve</Button>
                        <Button size="sm" variant="outline" className="text-destructive">Reject</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Technician Workload</h3>
            <Button variant="outline" size="sm">Balance Workload</Button>
          </div>
          
          <div className="grid gap-4">
            {["John Smith", "Maria Rodriguez", "Tyrone Jackson", "Sarah Chen"].map((tech, index) => (
              <Card key={`tech-${index}`}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-semibold">{tech}</h4>
                      <div className="text-sm text-muted-foreground">
                        <span>{3 + index} active tasks</span>
                        <span className="mx-2">•</span>
                        <span>{80 - index * 5}% utilization</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View Tasks</Button>
                      <Button size="sm">Assign New</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Resources Available Card */}
      <Card className="bg-muted/30 mt-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-medium">Resource Planning</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-sm">Available Technicians: 3</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-sm">Partially Available: 2</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm">Fully Booked: 4</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupervisorDashboard;
