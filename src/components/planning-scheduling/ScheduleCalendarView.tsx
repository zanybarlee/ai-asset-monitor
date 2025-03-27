
import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format, startOfWeek, startOfMonth, endOfWeek, eachDayOfInterval, isSameDay, addMonths, subMonths } from "date-fns";

interface ScheduleCalendarViewProps {
  schedules: any[];
  period: string;
}

const ScheduleCalendarView = ({ schedules, period }: ScheduleCalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Navigate through months
  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentDate(prevDate => subMonths(prevDate, 1));
    } else {
      setCurrentDate(prevDate => addMonths(prevDate, 1));
    }
  };
  
  // Get tasks for selected date
  const getTasksForDate = (date: Date) => {
    if (!date) return [];
    
    return schedules.filter(task => {
      const taskStart = new Date(task.startDate);
      const taskEnd = new Date(task.endDate || task.startDate);
      
      // Reset hours to compare just the dates
      taskStart.setHours(0, 0, 0, 0);
      taskEnd.setHours(0, 0, 0, 0);
      date.setHours(0, 0, 0, 0);
      
      return date >= taskStart && date <= taskEnd;
    });
  };
  
  // Get date decoration based on tasks
  const getDateDecoration = (date: Date) => {
    const tasksOnDate = getTasksForDate(date);
    
    if (tasksOnDate.length === 0) return null;
    
    // Determine if there are any critical tasks
    const hasCritical = tasksOnDate.some(task => task.priority === "Critical");
    const hasHigh = tasksOnDate.some(task => task.priority === "High");
    
    if (hasCritical) {
      return "bg-red-500";
    } else if (hasHigh) {
      return "bg-orange-500";
    } else {
      return "bg-blue-500";
    }
  };
  
  const selectedTasks = selectedDate ? getTasksForDate(selectedDate) : [];
  
  return (
    <div className="space-y-6">
      <div className="border rounded-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {/* Calendar */}
          <div className="md:col-span-3 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Maintenance Calendar</h3>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  {format(currentDate, 'MMMM yyyy')}
                </span>
                <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentDate}
              className={cn("rounded-md border p-3 pointer-events-auto")}
              modifiers={{
                booked: (date) => getTasksForDate(date).length > 0,
              }}
              modifiersStyles={{
                booked: {
                  fontWeight: 'bold'
                }
              }}
              components={{
                DayContent: (props) => {
                  const decoration = getDateDecoration(props.date);
                  return (
                    <div className="relative w-full h-full flex items-center justify-center">
                      {props.date.getDate()}
                      {decoration && (
                        <div className={cn(
                          "absolute bottom-1 w-3/4 h-1 rounded-full",
                          decoration
                        )} />
                      )}
                    </div>
                  );
                }
              }}
            />
            
            <div className="flex flex-wrap gap-2 text-xs">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                <span>Critical</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-orange-500 mr-1"></div>
                <span>High Priority</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                <span>Scheduled</span>
              </div>
            </div>
          </div>
          
          {/* Daily schedule */}
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

export default ScheduleCalendarView;
