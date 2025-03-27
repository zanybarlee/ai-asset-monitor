
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MaintenanceFormDialog from "./MaintenanceFormDialog";
import MaintenanceChecklist from "./MaintenanceChecklist";
import MaintenanceListView from "./schedule/MaintenanceListView";
import RaisedMaintenanceView from "./schedule/RaisedMaintenanceView";
import CalendarView from "./schedule/CalendarView";
import { 
  scheduledMaintenanceList, 
  pendingTasks, 
  involvedTasks,
  MaintenanceTask
} from "./schedule/maintenance-data";

const ScheduleMaintenance = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("sm-list");

  const handleScheduleNew = () => {
    setIsFormOpen(true);
  };

  const handleViewChecklist = (task: MaintenanceTask) => {
    setSelectedTask(task);
    setIsChecklistOpen(true);
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
          <MaintenanceListView 
            maintenanceList={scheduledMaintenanceList}
            onScheduleNew={handleScheduleNew}
            onViewChecklist={handleViewChecklist}
          />
        </TabsContent>
        
        {/* Raised SM Tab */}
        <TabsContent value="raised-sm" className="space-y-4 mt-4">
          <RaisedMaintenanceView 
            pendingTasks={pendingTasks}
            involvedTasks={involvedTasks}
            onViewChecklist={handleViewChecklist}
          />
        </TabsContent>
        
        {/* Calendar Tab */}
        <TabsContent value="calendar" className="space-y-4 mt-4">
          <CalendarView onScheduleNew={handleScheduleNew} />
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
