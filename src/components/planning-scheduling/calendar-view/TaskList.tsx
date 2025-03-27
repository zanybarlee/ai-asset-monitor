
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TaskListProps {
  selectedDate: Date | undefined;
  selectedTasks: any[];
}

const TaskList = ({ selectedDate, selectedTasks }: TaskListProps) => {
  return (
    <div className="md:col-span-4 border rounded-md overflow-hidden">
      <div className="bg-muted p-2 border-b">
        <h3 className="font-medium">
          {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Select a date'}
        </h3>
        <p className="text-xs text-muted-foreground">
          {selectedTasks.length} {selectedTasks.length === 1 ? 'task' : 'tasks'} scheduled
        </p>
      </div>
      
      <div className="divide-y max-h-[450px] overflow-auto">
        {selectedTasks.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No maintenance tasks scheduled for this date
          </div>
        ) : (
          selectedTasks.map(task => (
            <div key={task.id} className="p-3 hover:bg-muted/20">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm text-muted-foreground">{task.id} • {task.location}</div>
                </div>
                <Badge className={cn(
                  "text-xs",
                  task.priority === "Critical" ? "bg-red-100 text-red-800" : 
                  task.priority === "High" ? "bg-orange-100 text-orange-800" : 
                  task.priority === "Medium" ? "bg-blue-100 text-blue-800" : 
                  "bg-green-100 text-green-800"
                )}>
                  {task.priority}
                </Badge>
              </div>
              
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                <div className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <span>{task.startTime} - {task.endTime}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Type:</span> {task.type}
                </div>
                <div>
                  <span className="text-muted-foreground">Assignee:</span> {task.assignee}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
