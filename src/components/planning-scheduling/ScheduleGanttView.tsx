
import { useState } from "react";
import { BarChart3, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ScheduleGanttViewProps {
  schedules: any[];
  period: string;
}

const ScheduleGanttView = ({ schedules, period }: ScheduleGanttViewProps) => {
  const [currentPeriodStart, setCurrentPeriodStart] = useState(new Date());
  
  const getDaysInView = () => {
    switch (period) {
      case 'day':
        return 1;
      case 'week':
        return 7;
      case 'month':
        return 30;
      default:
        return 7;
    }
  };

  const daysInView = getDaysInView();
  
  // Generate days array for header
  const generateDays = () => {
    const days = [];
    const startDate = new Date(currentPeriodStart);
    
    for (let i = 0; i < daysInView; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    
    return days;
  };
  
  const days = generateDays();
  
  // Navigate through periods
  const navigatePeriod = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentPeriodStart);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - daysInView);
    } else {
      newDate.setDate(newDate.getDate() + daysInView);
    }
    setCurrentPeriodStart(newDate);
  };
  
  // Check if a task falls on a specific day
  const isTaskOnDay = (task: any, day: Date) => {
    const taskStart = new Date(task.startDate);
    const taskEnd = new Date(task.endDate);
    const dayDate = new Date(day);
    
    // Reset hours to compare just the dates
    taskStart.setHours(0, 0, 0, 0);
    taskEnd.setHours(0, 0, 0, 0);
    dayDate.setHours(0, 0, 0, 0);
    
    return dayDate >= taskStart && dayDate <= taskEnd;
  };
  
  // Calculate position and width for task bar
  const calculateTaskBar = (task: any) => {
    const taskStart = new Date(task.startDate);
    const taskEnd = new Date(task.endDate);
    taskStart.setHours(0, 0, 0, 0);
    taskEnd.setHours(0, 0, 0, 0);
    
    const viewStart = new Date(days[0]);
    const viewEnd = new Date(days[days.length - 1]);
    viewStart.setHours(0, 0, 0, 0);
    viewEnd.setHours(0, 0, 0, 0);
    
    // If task is completely outside our view
    if (taskEnd < viewStart || taskStart > viewEnd) {
      return null;
    }
    
    // Calculate visible portion
    const visibleStart = taskStart < viewStart ? viewStart : taskStart;
    const visibleEnd = taskEnd > viewEnd ? viewEnd : taskEnd;
    
    // Calculate percentage positions
    const totalDays = (viewEnd.getTime() - viewStart.getTime()) / (1000 * 60 * 60 * 24);
    const startOffset = (visibleStart.getTime() - viewStart.getTime()) / (1000 * 60 * 60 * 24);
    const duration = (visibleEnd.getTime() - visibleStart.getTime()) / (1000 * 60 * 60 * 24) + 1; // +1 to include the end day
    
    const left = (startOffset / totalDays) * 100;
    const width = (duration / totalDays) * 100;
    
    return {
      left: `${left}%`,
      width: `${width}%`,
    };
  };
  
  return (
    <div className="space-y-6">
      <div className="border rounded-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">{period === 'day' ? 'Daily' : period === 'week' ? 'Weekly' : 'Monthly'} Schedule</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigatePeriod('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              {new Date(days[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
              {new Date(days[days.length - 1]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <Button variant="outline" size="sm" onClick={() => navigatePeriod('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header with dates */}
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
            
            {/* Tasks */}
            {schedules.map((task, taskIndex) => (
              <div key={task.id} className="grid grid-cols-[200px_1fr] border-b hover:bg-muted/30">
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
            ))}
            
            {schedules.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                No maintenance tasks scheduled for this period
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4 flex space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm bg-blue-500 mr-1"></div>
            <span>Preventive</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm bg-orange-500 mr-1"></div>
            <span>Corrective</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm bg-purple-500 mr-1"></div>
            <span>Project</span>
          </div>
        </div>
      </div>
      
      {/* Upcoming Tasks Section */}
      <div className="border rounded-md p-4">
        <h3 className="font-medium mb-4">Upcoming Tasks</h3>
        <div className="space-y-3">
          {schedules.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No upcoming tasks scheduled
            </div>
          ) : (
            schedules.map((task) => (
              <div key={task.id} className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-full min-h-[40px] rounded-full ${
                    task.team === "electrical" ? "bg-red-500" : 
                    task.team === "hvac" ? "bg-blue-500" : 
                    task.team === "mechanical" ? "bg-orange-500" : 
                    "bg-green-500"
                  }`}></div>
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">{task.id} • {task.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Type:</span> {task.type}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Team:</span> {task.team}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Due:</span> {new Date(task.endDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleGanttView;
