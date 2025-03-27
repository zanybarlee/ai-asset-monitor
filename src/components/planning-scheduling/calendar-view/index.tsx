
import { useState } from "react";
import { format, isSameDay } from "date-fns";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import TaskList from "./TaskList";
import CalendarLegend from "./CalendarLegend";
import UpcomingTasks from "../common/UpcomingTasks";

interface CalendarViewProps {
  schedules: any[];
  period: string;
  upcomingTasks?: any[];
}

const CalendarView = ({ schedules, period, upcomingTasks }: CalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
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
  
  const selectedTasks = selectedDate ? getTasksForDate(selectedDate) : [];
  
  return (
    <div className="space-y-6">
      <div className="border rounded-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {/* Calendar */}
          <div className="md:col-span-3 space-y-4">
            <CalendarHeader 
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
            />
            
            <CalendarGrid
              currentDate={currentDate}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              getTasksForDate={getTasksForDate}
            />
            
            <CalendarLegend />
          </div>
          
          {/* Daily schedule */}
          <TaskList 
            selectedDate={selectedDate} 
            selectedTasks={selectedTasks}
          />
        </div>
      </div>
      
      {/* Upcoming Tasks Section */}
      <UpcomingTasks schedules={upcomingTasks || []} />
    </div>
  );
};

export default CalendarView;
