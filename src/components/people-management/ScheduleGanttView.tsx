
import { BarChart3 } from "lucide-react";

interface ScheduleGanttViewProps {
  schedules: any[];
  week: string;
}

const ScheduleGanttView = ({ schedules, week }: ScheduleGanttViewProps) => {
  // In a real application, this would be a proper Gantt chart
  // For this example, we'll show a simple placeholder
  
  return (
    <div className="border rounded-md p-6 text-center">
      <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">Gantt Chart View</h3>
      <p className="text-muted-foreground">
        This would display a Gantt chart for {week} week with {schedules.length} schedules.
      </p>
      <p className="text-muted-foreground mt-2">
        Integration with a proper Gantt chart library would be implemented in the full version.
      </p>
    </div>
  );
};

export default ScheduleGanttView;
