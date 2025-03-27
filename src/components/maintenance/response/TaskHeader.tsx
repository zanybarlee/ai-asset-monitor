
import { Building, LocateFixed, Clock, CalendarClock } from "lucide-react";
import { MaintenanceTask } from "../schedule/maintenance-data";

interface TaskHeaderProps {
  task: MaintenanceTask;
}

const TaskHeader = ({ task }: TaskHeaderProps) => {
  return (
    <>
      <div className="flex flex-wrap gap-4 text-sm mb-4">
        <div className="flex items-center">
          <Building className="mr-1 h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{task.location}</span>
        </div>
        <div className="flex items-center">
          <LocateFixed className="mr-1 h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{task.asset}</span>
        </div>
        <div className="flex items-center">
          <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Due: {task.dueDate}</span>
        </div>
        <div className="flex items-center">
          <CalendarClock className="mr-1 h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Assigned: {task.assignee}</span>
        </div>
      </div>
      
      {/* SLA Breach indicator bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>SLA Breach</span>
          <span>1 Day 4 Hours Left</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full" style={{ width: "40%" }}></div>
        </div>
      </div>
    </>
  );
};

export default TaskHeader;
