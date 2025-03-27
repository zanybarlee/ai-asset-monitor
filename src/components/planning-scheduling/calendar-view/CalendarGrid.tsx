
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

interface CalendarGridProps {
  currentDate: Date;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  getTasksForDate: (date: Date) => any[];
}

const CalendarGrid = ({ 
  currentDate, 
  selectedDate, 
  setSelectedDate,
  getTasksForDate
}: CalendarGridProps) => {
  
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

  return (
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
  );
};

export default CalendarGrid;
