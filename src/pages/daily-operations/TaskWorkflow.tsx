
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, CheckCircle, AlertCircle, Clock, UserCheck } from "lucide-react";
import { useState } from "react";

// Mock data for tasks
const initialTasks = [
  {
    id: 1,
    title: "Daily HVAC Inspection",
    assignedTo: "John Smith",
    dueDate: "2023-08-15",
    priority: "High",
    status: "Pending",
    description: "Inspect HVAC systems in Data Center A"
  },
  {
    id: 2,
    title: "UPS Maintenance Check",
    assignedTo: "Sarah Johnson",
    dueDate: "2023-08-14",
    priority: "Critical",
    status: "In Progress",
    description: "Perform scheduled maintenance on UPS systems"
  },
  {
    id: 3,
    title: "Generator Testing",
    assignedTo: "Mike Williams",
    dueDate: "2023-08-16",
    priority: "Medium",
    status: "Completed",
    description: "Run monthly test on backup generators"
  },
  {
    id: 4,
    title: "Cooling System Inspection",
    assignedTo: "Lisa Thompson",
    dueDate: "2023-08-15",
    priority: "High",
    status: "Pending",
    description: "Check cooling systems in Server Room B"
  }
];

const TaskWorkflow = () => {
  const [tasks, setTasks] = useState(initialTasks);

  // Get task counts by status
  const pendingCount = tasks.filter(task => task.status === "Pending").length;
  const inProgressCount = tasks.filter(task => task.status === "In Progress").length;
  const completedCount = tasks.filter(task => task.status === "Completed").length;

  // Update task status
  const updateTaskStatus = (taskId: number, newStatus: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{tasks.length}</div>
              <ClipboardList className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{pendingCount}</div>
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{inProgressCount}</div>
              <UserCheck className="h-5 w-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{completedCount}</div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task List */}
      <div>
        <h3 className="text-lg font-medium mb-4">Task List</h3>
        <div className="space-y-4">
          {tasks.map(task => (
            <Card key={task.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">{task.title}</CardTitle>
                  <div className={`px-2 py-1 text-xs rounded-full ${
                    task.priority === "Critical" ? "bg-red-100 text-red-800" :
                    task.priority === "High" ? "bg-orange-100 text-orange-800" :
                    "bg-blue-100 text-blue-800"
                  }`}>
                    {task.priority}
                  </div>
                </div>
                <CardDescription>Assigned to: {task.assignedTo} • Due: {task.dueDate}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm">{task.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center pt-2 pb-4">
                <div className={`px-2 py-1 text-xs rounded-full ${
                  task.status === "Completed" ? "bg-green-100 text-green-800" :
                  task.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                  "bg-amber-100 text-amber-800"
                }`}>
                  {task.status}
                </div>
                <div className="flex gap-2">
                  {task.status !== "In Progress" && task.status !== "Completed" && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateTaskStatus(task.id, "In Progress")}
                    >
                      Start
                    </Button>
                  )}
                  {task.status !== "Completed" && (
                    <Button 
                      size="sm"
                      onClick={() => updateTaskStatus(task.id, "Completed")}
                    >
                      Complete
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskWorkflow;
