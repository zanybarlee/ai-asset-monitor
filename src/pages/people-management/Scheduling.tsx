
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockSchedules } from "@/components/people-management/mock-data";
import ScheduleCalendarView from "@/components/people-management/ScheduleCalendarView";
import ScheduleGanttView from "@/components/people-management/ScheduleGanttView";
import AddScheduleDialog from "@/components/people-management/AddScheduleDialog";

const Scheduling = () => {
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState("calendar");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedWeek, setSelectedWeek] = useState("current");
  const [showAddSchedule, setShowAddSchedule] = useState(false);

  // Filter schedules based on department
  const filteredSchedules = mockSchedules.filter((schedule) => {
    return selectedDepartment === "all" || schedule.department === selectedDepartment;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2 items-center">
          <Select 
            value={selectedDepartment} 
            onValueChange={setSelectedDepartment}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="Facilities">Facilities</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
              <SelectItem value="Security">Security</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={selectedWeek} 
            onValueChange={setSelectedWeek}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Week</SelectItem>
              <SelectItem value="next">Next Week</SelectItem>
              <SelectItem value="following">Following Week</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={() => setShowAddSchedule(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Schedule
        </Button>
      </div>

      <Tabs defaultValue="calendar" value={currentView} onValueChange={setCurrentView}>
        <TabsList>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="gantt">Gantt View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Staff Schedule - {selectedWeek === "current" ? "Current Week" : selectedWeek === "next" ? "Next Week" : "Following Week"}</CardTitle>
            </CardHeader>
            <CardContent>
              <ScheduleCalendarView schedules={filteredSchedules} week={selectedWeek} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="gantt" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Staff Schedule - Gantt Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <ScheduleGanttView schedules={filteredSchedules} week={selectedWeek} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Upcoming Shifts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSchedules.slice(0, 5).map((schedule) => (
              <div key={schedule.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-8 bg-primary rounded-full"></div>
                  <div>
                    <p className="font-medium">{schedule.person}</p>
                    <p className="text-sm text-muted-foreground">{schedule.role} • {schedule.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{new Date(schedule.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{schedule.startTime} - {schedule.endTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Schedule Dialog */}
      {showAddSchedule && (
        <AddScheduleDialog
          open={showAddSchedule}
          onClose={() => setShowAddSchedule(false)}
        />
      )}
    </div>
  );
};

export default Scheduling;
