
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { DateRange } from "react-day-picker";

interface SchedulerFiltersProps {
  selectedTeam: string;
  setSelectedTeam: (team: string) => void;
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  dateRange: DateRange | undefined;
  setDateRange: (date: DateRange | undefined) => void;
}

const SchedulerFilters = ({
  selectedTeam,
  setSelectedTeam,
  selectedPeriod,
  setSelectedPeriod,
  dateRange,
  setDateRange
}: SchedulerFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Select 
        value={selectedTeam} 
        onValueChange={setSelectedTeam}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Team" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Teams</SelectItem>
          <SelectItem value="mechanical">Mechanical</SelectItem>
          <SelectItem value="electrical">Electrical</SelectItem>
          <SelectItem value="hvac">HVAC</SelectItem>
          <SelectItem value="it">IT Support</SelectItem>
        </SelectContent>
      </Select>
      
      <Select 
        value={selectedPeriod} 
        onValueChange={setSelectedPeriod}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">Day View</SelectItem>
          <SelectItem value="week">Week View</SelectItem>
          <SelectItem value="month">Month View</SelectItem>
        </SelectContent>
      </Select>
      
      <DateRangePicker
        date={dateRange}
        onDateChange={setDateRange}
      />

      <Button variant="outline" size="icon">
        <Filter className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SchedulerFilters;
