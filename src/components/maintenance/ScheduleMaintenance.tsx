
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  FileDown, 
  Filter, 
  Search, 
  Clock, 
  Calendar as CalendarIcon,
  CheckCircle,
  ClipboardList,
  ListChecks,
  Building,
  AlertCircle,
  LocateFixed,
  CalendarClock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import MaintenanceFormDialog from "./MaintenanceFormDialog";
import MaintenanceChecklist from "./MaintenanceChecklist";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";

// Mock data for scheduled maintenance
const scheduledMaintenanceList = [
  {
    id: "SM-2023-001",
    title: "HVAC MAINTENANCE DAILY",
    location: "Server Room A",
    asset: "CRAC Unit 01",
    assignee: "John Doe",
    dueDate: "2023-08-15",
    status: "Pending",
    priority: "High"
  },
  {
    id: "SM-2023-002",
    title: "UPS BATTERY CHECK",
    location: "Power Room",
    asset: "UPS System",
    assignee: "Sarah Johnson",
    dueDate: "2023-08-18",
    status: "Pending",
    priority: "Critical"
  },
  {
    id: "SM-2023-003",
    title: "GENERATOR TEST RUN",
    location: "Basement",
    asset: "Backup Generator",
    assignee: "Mike Davis",
    dueDate: "2023-08-20",
    status: "Pending",
    priority: "Medium"
  },
  {
    id: "SM-2023-004",
    title: "STORM WATER PUMP INSPECTION",
    location: "Drainage System",
    asset: "Pump Station 2",
    assignee: "Alex Wong",
    dueDate: "2023-08-12",
    status: "Completed",
    priority: "High"
  }
];

// Mock data for pending tasks
const pendingTasks = [
  {
    id: "SM-2023-001",
    title: "HVAC MAINTENANCE DAILY",
    location: "Server Room A",
    asset: "CRAC Unit 01",
    assignee: "Current User",
    dueDate: "2023-08-15",
    status: "Pending",
    priority: "High"
  },
  {
    id: "SM-2023-002",
    title: "UPS BATTERY CHECK",
    location: "Power Room",
    asset: "UPS System",
    assignee: "Current User",
    dueDate: "2023-08-18",
    status: "Pending",
    priority: "Critical"
  }
];

// Mock data for involved tasks
const involvedTasks = [
  {
    id: "SM-2023-004",
    title: "STORM WATER PUMP INSPECTION",
    location: "Drainage System",
    asset: "Pump Station 2",
    assignee: "Alex Wong",
    dueDate: "2023-08-12",
    status: "Completed",
    priority: "High"
  }
];

const ScheduleMaintenance = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("sm-list");
  const [raisedSmTab, setRaisedSmTab] = useState("pending");
  const [date, setDate] = useState<Date>();

  const handleScheduleNew = () => {
    setIsFormOpen(true);
  };

  const handleViewChecklist = (task: any) => {
    setSelectedTask(task);
    setIsChecklistOpen(true);
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Critical":
        return <Badge className="bg-red-500 hover:bg-red-600">{priority}</Badge>;
      case "High":
        return <Badge className="bg-orange-500 hover:bg-orange-600">{priority}</Badge>;
      case "Medium":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{priority}</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="sm-list" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="sm-list">SM List</TabsTrigger>
          <TabsTrigger value="raised-sm">Raised SM</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        
        {/* SM List Tab */}
        <TabsContent value="sm-list" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by ID/Name..." className="pl-8" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleScheduleNew}>
              <CalendarClock className="mr-2 h-4 w-4" />
              Schedule
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {scheduledMaintenanceList.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className={`h-1 ${item.status === 'Completed' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">{item.id}</span>
                        {getPriorityBadge(item.priority)}
                      </div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Building className="mr-1 h-4 w-4" />
                          {item.location}
                        </div>
                        <div className="flex items-center">
                          <LocateFixed className="mr-1 h-4 w-4" />
                          {item.asset}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          Due: {item.dueDate}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2 md:mt-0">
                      <Button variant="outline" size="sm" onClick={() => handleViewChecklist(item)}>
                        <ListChecks className="mr-2 h-4 w-4" />
                        View Checklist
                      </Button>
                      <Button size="sm">
                        <ClipboardList className="mr-2 h-4 w-4" />
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Raised SM Tab */}
        <TabsContent value="raised-sm" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <Tabs defaultValue="pending" value={raisedSmTab} onValueChange={setRaisedSmTab} className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="pending">Pending Tasks</TabsTrigger>
                <TabsTrigger value="involved">Involved Tasks</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pending" className="space-y-4 mt-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <div className="relative w-64">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search by ID/Name..." className="pl-8" />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {pendingTasks.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="h-1 bg-amber-500" />
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-muted-foreground">{item.id}</span>
                              {getPriorityBadge(item.priority)}
                            </div>
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Building className="mr-1 h-4 w-4" />
                                {item.location}
                              </div>
                              <div className="flex items-center">
                                <LocateFixed className="mr-1 h-4 w-4" />
                                {item.asset}
                              </div>
                              <div className="flex items-center">
                                <Clock className="mr-1 h-4 w-4" />
                                Due: {item.dueDate}
                              </div>
                              <div className="flex items-center">
                                <AlertCircle className="mr-1 h-4 w-4 text-amber-500" />
                                Action Required
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-2 md:mt-0">
                            <Button size="sm" onClick={() => handleViewChecklist(item)}>
                              <ListChecks className="mr-2 h-4 w-4" />
                              Complete Checklist
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="involved" className="space-y-4 mt-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <div className="relative w-64">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search by ID/Name..." className="pl-8" />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {involvedTasks.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="h-1 bg-emerald-500" />
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-muted-foreground">{item.id}</span>
                              {getPriorityBadge(item.priority)}
                            </div>
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Building className="mr-1 h-4 w-4" />
                                {item.location}
                              </div>
                              <div className="flex items-center">
                                <LocateFixed className="mr-1 h-4 w-4" />
                                {item.asset}
                              </div>
                              <div className="flex items-center">
                                <CheckCircle className="mr-1 h-4 w-4 text-emerald-500" />
                                Completed
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-2 md:mt-0">
                            <Button variant="outline" size="sm">
                              <ClipboardList className="mr-2 h-4 w-4" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>
        
        {/* Calendar Tab */}
        <TabsContent value="calendar" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleScheduleNew}>
              <CalendarClock className="mr-2 h-4 w-4" />
              Schedule
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8 border rounded-md border-dashed">
                <div className="text-center">
                  <Calendar className="h-16 w-16 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">Calendar view would display scheduled maintenance tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Maintenance Form Dialog */}
      {isFormOpen && <MaintenanceFormDialog open={isFormOpen} onClose={() => setIsFormOpen(false)} />}
      
      {/* Maintenance Checklist Dialog */}
      {isChecklistOpen && selectedTask && (
        <MaintenanceChecklist 
          open={isChecklistOpen} 
          onClose={() => setIsChecklistOpen(false)} 
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default ScheduleMaintenance;
