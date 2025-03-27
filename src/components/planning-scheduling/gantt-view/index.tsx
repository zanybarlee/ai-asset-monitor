
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import GanttHeader from "./GanttHeader";
import GanttMain from "./GanttMain";
import GanttLegend from "./GanttLegend";
import UpcomingTasks from "../common/UpcomingTasks";
import { useGanttCalendarUtils } from "./useGanttCalendarUtils";

interface ScheduleGanttViewProps {
  schedules: any[];
  period: string;
}

const ScheduleGanttView = ({ schedules, period }: ScheduleGanttViewProps) => {
  const { days, navigatePeriod, isTaskOnDay, calculateTaskBar } = useGanttCalendarUtils({ period });
  
  return (
    <div className="space-y-6">
      <div className="border rounded-md p-4">
        <GanttHeader 
          period={period} 
          days={days} 
          navigatePeriod={navigatePeriod} 
        />
        
        <GanttMain 
          schedules={schedules} 
          days={days}
          calculateTaskBar={calculateTaskBar}
          isTaskOnDay={isTaskOnDay}
        />
        
        <GanttLegend />
      </div>
      
      {/* Upcoming Tasks Section */}
      <UpcomingTasks schedules={schedules} />
    </div>
  );
};

export default ScheduleGanttView;
