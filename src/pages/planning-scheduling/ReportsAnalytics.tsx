
import { useState } from "react";
import { DateRange } from "react-day-picker";
import PMComplianceReport from "@/components/planning-scheduling/reports/PMComplianceReport";
import BacklogAnalysisReport from "@/components/planning-scheduling/reports/BacklogAnalysisReport";
import ResourceUtilizationReport from "@/components/planning-scheduling/reports/ResourceUtilizationReport";
import WorkOrderAnalysisReport from "@/components/planning-scheduling/reports/WorkOrderAnalysisReport";
import ReportSidebar from "@/components/planning-scheduling/reports/ReportSidebar";
import ScheduleAdherenceChart from "@/components/planning-scheduling/reports/ScheduleAdherenceChart";
import ReportFilters from "@/components/planning-scheduling/reports/ReportFilters";

const ReportsAnalytics = () => {
  const [reportType, setReportType] = useState("pm-compliance");
  const [timePeriod, setTimePeriod] = useState("month");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({ 
    from: new Date(), 
    to: new Date() 
  });

  // Mock data for the backlog analysis chart
  const mockBacklogData = [
    { name: "Critical", count: 5, age: 4.5 },
    { name: "High", count: 12, age: 8.2 },
    { name: "Medium", count: 18, age: 14.6 },
    { name: "Low", count: 7, age: 18.5 },
  ];

  // Mock data for work order location distribution
  const workOrderLocationData = [
    { name: "Data Hall 1", pm: 45, cm: 12, other: 5 },
    { name: "Data Hall 2", pm: 38, cm: 18, other: 7 },
    { name: "UPS Room", pm: 25, cm: 8, other: 3 },
    { name: "Cooling Plant", pm: 35, cm: 22, other: 8 },
    { name: "Generator", pm: 15, cm: 5, other: 2 },
  ];

  return (
    <div className="space-y-6">
      <ReportFilters 
        reportType={reportType}
        onReportTypeChange={setReportType}
        timePeriod={timePeriod}
        onTimePeriodChange={setTimePeriod}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      {reportType === "pm-compliance" && <PMComplianceReport />}
      {reportType === "backlog-analysis" && <BacklogAnalysisReport backlogData={mockBacklogData} />}
      {reportType === "resource-utilization" && <ResourceUtilizationReport />}
      {reportType === "work-order-analysis" && (
        <WorkOrderAnalysisReport workOrderLocationData={workOrderLocationData} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ReportSidebar />
        <ScheduleAdherenceChart />
      </div>
    </div>
  );
};

export default ReportsAnalytics;
