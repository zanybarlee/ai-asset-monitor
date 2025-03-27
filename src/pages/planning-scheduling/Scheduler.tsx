
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, Plus, Filter, BarChart3, CalendarRange } from "lucide-react";
import ScheduleGanttView from "@/components/planning-scheduling/ScheduleGanttView";
import ScheduleCalendarView from "@/components/planning-scheduling/ScheduleCalendarView";
import CreateTaskDialog from "@/components/planning-scheduling/CreateTaskDialog";
import { mockSchedules } from "@/components/planning-scheduling/mock-data";

const Scheduler = () => {
  const [currentView, setCurrentView] = useState("gantt");
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [showCreateTask, setShowCreateTask] = useState(false);

  // Filter schedules based on team
  const filteredSchedules = mockSchedules.filter((schedule) => {
    return selectedTeam === "all" || schedule.team === selectedTeam;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2 items-center">
          <Select 
            value={selectedTeam} 
            onValueChange={setSelectedTeam}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              <SelectItem value="mechanical">Mechanical</SelectItem>
              <SelectItem value="electrical">Electrical</SelectItem>
              <SelectItem value="hvac">HVAC</SelectItem>
              <SelectItem value="it">IT Support</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={selectedPeriod} 
            onValueChange={setSelectedPeriod}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day View</SelectItem>
              <SelectItem value="week">Week View</SelectItem>
              <SelectItem value="month">Month View</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <Button onClick={() => setShowCreateTask(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </div>

      <Tabs defaultValue="gantt" value={currentView} onValueChange={setCurrentView}>
        <TabsList>
          <TabsTrigger value="gantt">
            <BarChart3 className="h-4 w-4 mr-2" />
            Gantt View
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <CalendarRange className="h-4 w-4 mr-2" />
            Calendar View
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="gantt" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Maintenance Schedule - Gantt Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <ScheduleGanttView schedules={filteredSchedules} period={selectedPeriod} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Maintenance Schedule - Calendar View</CardTitle>
            </CardHeader>
            <CardContent>
              <ScheduleCalendarView schedules={filteredSchedules} period={selectedPeriod} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Upcoming Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSchedules.slice(0, 5).map((schedule) => (
              <div key={schedule.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-8 rounded-full ${
                    schedule.priority === "Critical" ? "bg-red-500" : 
                    schedule.priority === "High" ? "bg-orange-500" : 
                    schedule.priority === "Medium" ? "bg-blue-500" : 
                    "bg-green-500"
                  }`}></div>
                  <div>
                    <p className="font-medium">{schedule.title}</p>
                    <p className="text-sm text-muted-foreground">{schedule.id} • {schedule.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Type:</span> {schedule.type}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Team:</span> {schedule.team}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Due:</span> {new Date(schedule.startDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Task Dialog */}
      {showCreateTask && (
        <CreateTaskDialog
          open={showCreateTask}
          onClose={() => setShowCreateTask(false)}
        />
      )}
    </div>
  );
};

export default Scheduler;
