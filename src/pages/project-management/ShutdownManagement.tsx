
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AlertTriangle, CheckSquare, ClipboardList, Download, Filter, ListChecks, Power, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import NewShutdownDialog from "@/components/project-management/NewShutdownDialog";

const ShutdownManagement = () => {
  const [showNewShutdownDialog, setShowNewShutdownDialog] = useState(false);
  
  const handleNewShutdown = () => {
    setShowNewShutdownDialog(true);
  };
  
  const mockShutdownTasks = [
    {
      id: "TASK-101",
      description: "Isolate UPS systems",
      team: "Electrical",
      assignee: "John Doe",
      status: "Completed",
      time: "08:00",
      duration: "30 min",
      dependencies: [],
      checklist: ["Verify load status", "Notify NOC", "Switch to maintenance bypass"]
    },
    {
      id: "TASK-102",
      description: "Power down cooling systems",
      team: "Mechanical",
      assignee: "Sarah Jones",
      status: "In Progress",
      time: "08:30",
      duration: "20 min",
      dependencies: ["TASK-101"],
      checklist: ["Confirm UPS isolation", "Shutdown chillers", "Monitor temperature"]
    },
    {
      id: "TASK-103",
      description: "Replace circuit breakers in panel A",
      team: "Electrical",
      assignee: "Mike Chen",
      status: "Pending",
      time: "09:00",
      duration: "45 min",
      dependencies: ["TASK-101", "TASK-102"],
      checklist: ["Verify voltage", "Replace breakers", "Test manually"]
    },
    {
      id: "TASK-104",
      description: "Perform UPS maintenance",
      team: "Vendor",
      assignee: "Lisa Wong",
      status: "Pending",
      time: "09:00",
      duration: "2 hr",
      dependencies: ["TASK-101"],
      checklist: ["Replace batteries", "Clean connections", "Test alarms"]
    },
    {
      id: "TASK-105",
      description: "Power up cooling systems",
      team: "Mechanical",
      assignee: "Sarah Jones",
      status: "Pending",
      time: "11:30",
      duration: "30 min",
      dependencies: ["TASK-103", "TASK-104"],
      checklist: ["Verify electrical work complete", "Start chillers", "Monitor temperatures"]
    },
    {
      id: "TASK-106",
      description: "Power up UPS systems",
      team: "Electrical",
      assignee: "John Doe",
      status: "Pending",
      time: "12:00",
      duration: "30 min",
      dependencies: ["TASK-104", "TASK-105"],
      checklist: ["Verify maintenance complete", "Switch from bypass", "Test on battery"]
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold">Shutdown Management</h3>
          <p className="text-muted-foreground">Plan and coordinate maintenance shutdown activities</p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print Checklist
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" onClick={handleNewShutdown}>
            <ListChecks className="mr-2 h-4 w-4" />
            New Shutdown
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <CardTitle className="flex items-center">
              <Power className="mr-2 h-5 w-5 text-destructive" />
              Quarterly Scheduled Shutdown
            </CardTitle>
            <div className="mt-2 sm:mt-0 flex items-center gap-2">
              <Badge>In Progress</Badge>
              <Badge variant="outline">Q4-2023</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="border rounded-md p-4">
              <p className="text-sm font-medium">Start Time</p>
              <p className="text-xl">08:00 AM</p>
              <p className="text-sm text-muted-foreground">October 1, 2023</p>
            </div>
            <div className="border rounded-md p-4">
              <p className="text-sm font-medium">End Time</p>
              <p className="text-xl">12:30 PM</p>
              <p className="text-sm text-muted-foreground">October 1, 2023</p>
            </div>
            <div className="border rounded-md p-4">
              <p className="text-sm font-medium">Duration</p>
              <p className="text-xl">4h 30m</p>
              <p className="text-sm text-muted-foreground">Total downtime</p>
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <p className="text-sm font-medium">Overall Progress</p>
              <p className="text-sm">33%</p>
            </div>
            <Progress value={33} className="h-2" />
          </div>
          
          <Tabs defaultValue="tasks">
            <TabsList>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="teams">By Team</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tasks" className="mt-6">
              <div className="border rounded-md divide-y">
                {mockShutdownTasks.map(task => (
                  <div key={task.id} className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <div className="flex items-start gap-3">
                        {task.status === "Completed" ? (
                          <CheckSquare className="h-5 w-5 text-emerald-500 mt-0.5" />
                        ) : task.status === "In Progress" ? (
                          <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mt-0.5" />
                        ) : (
                          <ClipboardList className="h-5 w-5 text-muted-foreground mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium">{task.description}</p>
                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mt-1">
                            <span>{task.id}</span>
                            <span>•</span>
                            <span>{task.team}</span>
                            <span>•</span>
                            <span>{task.assignee}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-0 flex flex-wrap items-center gap-2">
                        <Badge variant={task.status === "Completed" ? "default" : 
                                task.status === "In Progress" ? "outline" : "secondary"}>
                          {task.status}
                        </Badge>
                        <Badge variant="outline" className="border-amber-500 text-amber-500">
                          {task.time} ({task.duration})
                        </Badge>
                      </div>
                    </div>
                    
                    {task.dependencies.length > 0 && (
                      <div className="ml-8 mt-2 text-sm">
                        <span className="text-muted-foreground">Dependencies: </span>
                        {task.dependencies.map((dep, index) => (
                          <span key={dep} className="text-primary">
                            {dep}{index < task.dependencies.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-3 ml-8">
                      <p className="text-sm font-medium mb-2">Checklist:</p>
                      <ul className="space-y-1">
                        {task.checklist.map((item, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <span className="h-4 w-4 border rounded-sm flex items-center justify-center mr-2">
                              {task.status === "Completed" && <CheckSquare className="h-3 w-3 text-emerald-500" />}
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="teams" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Electrical Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {mockShutdownTasks
                        .filter(task => task.team === "Electrical")
                        .map(task => (
                          <li key={task.id} className="flex justify-between border-b pb-2">
                            <div>
                              <p>{task.description}</p>
                              <p className="text-sm text-muted-foreground">{task.assignee}</p>
                            </div>
                            <Badge>{task.status}</Badge>
                          </li>
                        ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Mechanical Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {mockShutdownTasks
                        .filter(task => task.team === "Mechanical")
                        .map(task => (
                          <li key={task.id} className="flex justify-between border-b pb-2">
                            <div>
                              <p>{task.description}</p>
                              <p className="text-sm text-muted-foreground">{task.assignee}</p>
                            </div>
                            <Badge>{task.status}</Badge>
                          </li>
                        ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Vendor Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {mockShutdownTasks
                        .filter(task => task.team === "Vendor")
                        .map(task => (
                          <li key={task.id} className="flex justify-between border-b pb-2">
                            <div>
                              <p>{task.description}</p>
                              <p className="text-sm text-muted-foreground">{task.assignee}</p>
                            </div>
                            <Badge>{task.status}</Badge>
                          </li>
                        ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="timeline" className="mt-6">
              <div className="flex items-center justify-center p-12 border-2 border-dashed rounded-md">
                <div className="text-center">
                  <p className="text-muted-foreground">Timeline visualization would render here</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Showing task sequence, dependencies, and critical path
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-md flex items-start">
        <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
        <div>
          <p className="font-medium text-amber-800">Important Reminders</p>
          <ul className="mt-2 space-y-2 text-amber-700 text-sm">
            <li>• All teams must complete safety briefing before shutdown starts</li>
            <li>• Emergency contact: John Smith (+1-555-123-4567)</li>
            <li>• Critical systems will be on generator backup</li>
            <li>• Communication checks required every 30 minutes</li>
          </ul>
        </div>
      </div>
      
      {showNewShutdownDialog && (
        <NewShutdownDialog 
          open={showNewShutdownDialog} 
          onClose={() => setShowNewShutdownDialog(false)} 
        />
      )}
    </div>
  );
};

export default ShutdownManagement;
