
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, CalendarRange } from "lucide-react";
import ScheduleGanttView from "@/components/planning-scheduling/gantt-view";
import ScheduleCalendarView from "@/components/planning-scheduling/calendar-view";

interface SchedulerViewTabsProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  filteredSchedules: any[];
  selectedPeriod: string;
  upcomingTasks?: any[];
  scheduledMaintenance?: any[];
}

const SchedulerViewTabs = ({
  currentView,
  setCurrentView,
  filteredSchedules,
  selectedPeriod,
  upcomingTasks,
  scheduledMaintenance
}: SchedulerViewTabsProps) => {
  return (
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
            <ScheduleGanttView 
              schedules={filteredSchedules} 
              period={selectedPeriod} 
              upcomingTasks={upcomingTasks}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="calendar" className="mt-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Maintenance Schedule - Calendar View</CardTitle>
          </CardHeader>
          <CardContent>
            <ScheduleCalendarView 
              schedules={filteredSchedules} 
              period={selectedPeriod} 
              upcomingTasks={upcomingTasks}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SchedulerViewTabs;
