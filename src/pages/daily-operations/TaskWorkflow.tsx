
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, CheckCircle, AlertCircle, Clock, UserCheck, CalendarClock, ListChecks } from "lucide-react";
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

// Mock data for checklists
const initialChecklists = [
  {
    id: 1,
    title: "Server Room Daily Checklist",
    items: [
      { id: 1, description: "Verify room temperature (68-75°F)", completed: true },
      { id: 2, description: "Check humidity levels (40-60%)", completed: true },
      { id: 3, description: "Inspect for water leaks", completed: false },
      { id: 4, description: "Verify CRAC units operation", completed: false },
      { id: 5, description: "Inspect fire suppression system", completed: true }
    ],
    assignedTo: "John Smith",
    dueDate: "2023-08-15"
  },
  {
    id: 2,
    title: "UPS Monthly Inspection",
    items: [
      { id: 1, description: "Check battery status indicators", completed: false },
      { id: 2, description: "Record input/output voltages", completed: false },
      { id: 3, description: "Verify cooling fans operation", completed: false },
      { id: 4, description: "Inspect for unusual noises", completed: false },
      { id: 5, description: "Check event logs", completed: false }
    ],
    assignedTo: "Sarah Johnson",
    dueDate: "2023-08-20"
  }
];

// Mock data for maintenance schedule
const initialSchedule = [
  {
    id: 1,
    title: "Quarterly HVAC System Maintenance",
    assignedTo: "HVAC Team",
    scheduledDate: "2023-09-15",
    status: "Upcoming",
    recurrence: "Quarterly",
    description: "Complete system check, filter replacement, and performance testing"
  },
  {
    id: 2,
    title: "Annual Fire Suppression Test",
    assignedTo: "Safety Team",
    scheduledDate: "2023-10-05",
    status: "Upcoming",
    recurrence: "Yearly",
    description: "Test all fire suppression systems with authority having jurisdiction"
  },
  {
    id: 3,
    title: "UPS Battery Replacement",
    assignedTo: "Electrical Team",
    scheduledDate: "2023-08-25",
    status: "Upcoming",
    recurrence: "As needed",
    description: "Replace batteries in UPS system that are past their warranty period"
  }
];

const TaskWorkflow = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [checklists, setChecklists] = useState(initialChecklists);
  const [schedule, setSchedule] = useState(initialSchedule);
  const [activeTab, setActiveTab] = useState("tasks");

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

  // Toggle checklist item completion
  const toggleChecklistItem = (checklistId: number, itemId: number) => {
    setChecklists(checklists.map(checklist => 
      checklist.id === checklistId 
        ? {
            ...checklist, 
            items: checklist.items.map(item => 
              item.id === itemId ? { ...item, completed: !item.completed } : item
            )
          } 
        : checklist
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

      {/* Task Workflow Tabs */}
      <Tabs defaultValue="tasks" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="tasks">Work Tasks</TabsTrigger>
          <TabsTrigger value="checklists">Digital Checklists</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance Schedule</TabsTrigger>
        </TabsList>
        
        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Task List</h3>
            <Button>
              <ClipboardList className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
          
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
        </TabsContent>
        
        {/* Digital Checklists Tab */}
        <TabsContent value="checklists" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Digital Operational Checklists</h3>
            <Button>
              <ListChecks className="mr-2 h-4 w-4" />
              New Checklist
            </Button>
          </div>
          
          <div className="space-y-6">
            {checklists.map(checklist => {
              const completedCount = checklist.items.filter(item => item.completed).length;
              const progress = Math.round((completedCount / checklist.items.length) * 100);
              
              return (
                <Card key={checklist.id} className="overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-blue-300 to-blue-600" style={{ width: `${progress}%` }} />
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{checklist.title}</CardTitle>
                        <CardDescription>Assigned to: {checklist.assignedTo} • Due: {checklist.dueDate}</CardDescription>
                      </div>
                      <div className="text-sm font-medium">{progress}% Complete</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {checklist.items.map(item => (
                        <li key={item.id} className="flex items-start gap-2">
                          <div 
                            onClick={() => toggleChecklistItem(checklist.id, item.id)}
                            className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center cursor-pointer
                              ${item.completed ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}
                          >
                            {item.completed && <CheckCircle className="h-4 w-4 text-white" />}
                          </div>
                          <span className={`text-sm ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {item.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button size="sm">View Details</Button>
                    <Button 
                      size="sm" 
                      variant={progress === 100 ? 'default' : 'outline'}
                      disabled={progress !== 100}
                    >
                      {progress === 100 ? 'Submit' : 'Complete All Items'}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        
        {/* Maintenance Schedule Tab */}
        <TabsContent value="maintenance" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Preventive Maintenance Schedule</h3>
            <Button>
              <CalendarClock className="mr-2 h-4 w-4" />
              Schedule Maintenance
            </Button>
          </div>
          
          <div className="space-y-4">
            {schedule.map(item => (
              <Card key={item.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">{item.title}</CardTitle>
                    <div className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {item.recurrence}
                    </div>
                  </div>
                  <CardDescription>
                    Assigned to: {item.assignedTo} • Scheduled: {item.scheduledDate}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm">{item.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-2 pb-4">
                  <div className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                    {item.status}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Reschedule</Button>
                    <Button size="sm">View Details</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskWorkflow;
