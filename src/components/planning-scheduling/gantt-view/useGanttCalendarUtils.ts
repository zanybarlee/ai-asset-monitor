
import { useState } from "react";

interface UseGanttCalendarUtilsOptions {
  period: string;
}

export const useGanttCalendarUtils = ({ period }: UseGanttCalendarUtilsOptions) => {
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

  return {
    days,
    navigatePeriod,
    isTaskOnDay,
    calculateTaskBar
  };
};
