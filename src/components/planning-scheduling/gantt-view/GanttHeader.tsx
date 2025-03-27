
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GanttHeaderProps {
  period: string;
  days: Date[];
  navigatePeriod: (direction: 'prev' | 'next') => void;
}

const GanttHeader = ({ period, days, navigatePeriod }: GanttHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-medium">
        {period === 'day' ? 'Daily' : period === 'week' ? 'Weekly' : 'Monthly'} Schedule
      </h3>
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
  );
};

export default GanttHeader;
