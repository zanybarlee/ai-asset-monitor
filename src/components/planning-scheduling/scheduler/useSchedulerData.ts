
import { useState, useMemo } from "react";
import { DateRange } from "react-day-picker";
import { mockSchedules, getUpcomingTasks, getScheduledMaintenance } from "@/components/planning-scheduling/mock-data/schedule-data";

export const useSchedulerData = () => {
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });

  const filteredSchedules = useMemo(() => {
    return mockSchedules.filter((schedule) => {
      if (selectedTeam !== "all" && schedule.team !== selectedTeam) {
        return false;
      }
      
      if (dateRange?.from) {
        const scheduleDate = new Date(schedule.startDate);
        if (scheduleDate < dateRange.from) {
          return false;
        }
        
        if (dateRange.to && scheduleDate > dateRange.to) {
          return false;
        }
      }
      
      return true;
    });
  }, [selectedTeam, dateRange]);

  // Get upcoming tasks
  const upcomingTasks = useMemo(() => {
    return getUpcomingTasks();
  }, []);

  // Get scheduled maintenance tasks
  const scheduledMaintenance = useMemo(() => {
    return getScheduledMaintenance();
  }, []);

  return {
    selectedTeam,
    setSelectedTeam,
    selectedPeriod,
    setSelectedPeriod,
    dateRange,
    setDateRange,
    filteredSchedules,
    upcomingTasks,
    scheduledMaintenance
  };
};
