
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface GanttTaskRowProps {
  task: any;
  days: Date[];
  calculateTaskBar: (task: any) => { left: string; width: string } | null;
  isTaskOnDay: (task: any, day: Date) => boolean;
}

const GanttTaskRow = ({ task, days, calculateTaskBar, isTaskOnDay }: GanttTaskRowProps) => {
  return (
    <div className="grid grid-cols-[200px_1fr] border-b hover:bg-muted/30">
      <div className="p-2 flex flex-col justify-center">
        <div className="font-medium truncate">{task.title}</div>
        <div className="flex items-center space-x-2 mt-1">
          <Badge variant="outline" className={cn(
            "text-xs",
            task.priority === "Critical" ? "bg-red-100 text-red-800 hover:bg-red-100" : 
            task.priority === "High" ? "bg-orange-100 text-orange-800 hover:bg-orange-100" : 
            task.priority === "Medium" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" : 
            "bg-green-100 text-green-800 hover:bg-green-100"
          )}>
            {task.priority}
          </Badge>
          <span className="text-xs text-muted-foreground">{task.location}</span>
        </div>
      </div>
      
      <div className="relative" style={{ gridTemplateColumns: `repeat(${days.length}, 1fr)` }}>
        {task.startDate && task.endDate && calculateTaskBar(task) && (
          <div 
            className={cn(
              "absolute top-1/2 transform -translate-y-1/2 h-6 rounded-sm flex items-center justify-center text-xs px-2 text-white",
              task.type === "PM" ? "bg-blue-500" : 
              task.type === "CM" ? "bg-orange-500" : 
              "bg-purple-500"
            )}
            style={calculateTaskBar(task)}
          >
            {task.type}: {task.id}
          </div>
        )}
        
        {/* Grid lines */}
        <div className="grid h-full" style={{ gridTemplateColumns: `repeat(${days.length}, 1fr)` }}>
          {days.map((day, i) => (
            <div 
              key={i} 
              className={cn(
                "h-14 border-l", 
                new Date().toDateString() === day.toDateString() ? "bg-primary/10" : "",
                isTaskOnDay(task, day) ? "bg-muted/20" : ""
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GanttTaskRow;
