
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";

interface ReportFiltersProps {
  reportType: string;
  onReportTypeChange: (value: string) => void;
  timePeriod: string;
  onTimePeriodChange: (value: string) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (date: DateRange | undefined) => void;
}

const ReportFilters = ({
  reportType,
  onReportTypeChange,
  timePeriod,
  onTimePeriodChange,
  dateRange,
  onDateRangeChange
}: ReportFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div className="flex flex-wrap gap-2 items-center">
        <Select 
          value={reportType} 
          onValueChange={onReportTypeChange}
        >
          <SelectTrigger className="w-[260px]">
            <SelectValue placeholder="Report Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pm-compliance">PM Compliance</SelectItem>
            <SelectItem value="backlog-analysis">Backlog Analysis</SelectItem>
            <SelectItem value="resource-utilization">Resource Utilization</SelectItem>
            <SelectItem value="work-order-analysis">Work Order Analysis</SelectItem>
          </SelectContent>
        </Select>
        
        <Select 
          value={timePeriod} 
          onValueChange={onTimePeriodChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>

        {timePeriod === "custom" && (
          <DateRangePicker 
            date={dateRange}
            onDateChange={onDateRangeChange}
          />
        )}
      </div>
      
      <Button>
        <Download className="mr-2 h-4 w-4" />
        Export Report
      </Button>
    </div>
  );
};

export default ReportFilters;
