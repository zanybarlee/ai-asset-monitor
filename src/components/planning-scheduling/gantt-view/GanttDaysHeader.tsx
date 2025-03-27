
import { cn } from "@/lib/utils";

interface GanttDaysHeaderProps {
  days: Date[];
}

const GanttDaysHeader = ({ days }: GanttDaysHeaderProps) => {
  return (
    <div className="grid grid-cols-[200px_1fr] border-b">
      <div className="p-2 font-medium text-sm">Task</div>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${days.length}, 1fr)` }}>
        {days.map((day, i) => (
          <div 
            key={i} 
            className={cn(
              "p-2 text-center text-sm border-l", 
              new Date().toDateString() === day.toDateString() ? "bg-primary/10" : ""
            )}
          >
            <div className="font-medium">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
            <div className="text-xs">{day.getDate()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GanttDaysHeader;
