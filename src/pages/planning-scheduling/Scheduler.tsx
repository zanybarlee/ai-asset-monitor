
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import CreateTaskDialog from "@/components/planning-scheduling/CreateTaskDialog";
import SchedulerFilters from "@/components/planning-scheduling/scheduler/SchedulerFilters";
import SchedulerViewTabs from "@/components/planning-scheduling/scheduler/SchedulerViewTabs";
import CreateTaskButton from "@/components/planning-scheduling/scheduler/CreateTaskButton";
import { useSchedulerData } from "@/components/planning-scheduling/scheduler/useSchedulerData";

const Scheduler = () => {
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState("gantt");
  const [showCreateTask, setShowCreateTask] = useState(false);
  
  const {
    selectedTeam,
    setSelectedTeam,
    selectedPeriod,
    setSelectedPeriod,
    dateRange,
    setDateRange,
    filteredSchedules
  } = useSchedulerData();
  
  const handleCreateTask = () => {
    setShowCreateTask(true);
  };
  
  const handleCloseDialog = () => {
    setShowCreateTask(false);
    toast({
      title: "Task created",
      description: "The maintenance task has been scheduled successfully."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <SchedulerFilters
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
        
        <CreateTaskButton onClick={handleCreateTask} />
      </div>

      <SchedulerViewTabs
        currentView={currentView}
        setCurrentView={setCurrentView}
        filteredSchedules={filteredSchedules}
        selectedPeriod={selectedPeriod}
      />

      {showCreateTask && (
        <CreateTaskDialog
          open={showCreateTask}
          onClose={handleCloseDialog}
        />
      )}
    </div>
  );
};

export default Scheduler;
