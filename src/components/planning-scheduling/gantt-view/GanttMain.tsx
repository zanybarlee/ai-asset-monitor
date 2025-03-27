
import { cn } from "@/lib/utils";
import GanttDaysHeader from "./GanttDaysHeader";
import GanttTaskRow from "./GanttTaskRow";

interface GanttMainProps {
  schedules: any[];
  days: Date[];
  calculateTaskBar: (task: any) => { left: string; width: string } | null;
  isTaskOnDay: (task: any, day: Date) => boolean;
}

const GanttMain = ({ schedules, days, calculateTaskBar, isTaskOnDay }: GanttMainProps) => {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        <GanttDaysHeader days={days} />
        
        {/* Tasks */}
        {schedules.map((task, taskIndex) => (
          <GanttTaskRow 
            key={task.id} 
            task={task} 
            days={days} 
            calculateTaskBar={calculateTaskBar} 
            isTaskOnDay={isTaskOnDay} 
          />
        ))}
        
        {schedules.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No maintenance tasks scheduled for this period
          </div>
        )}
      </div>
    </div>
  );
};

export default GanttMain;
