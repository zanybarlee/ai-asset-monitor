import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Clock, BarChart, Calendar, Download, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateReportDialog } from "@/components/daily-operations/CreateReportDialog";
import MaintenanceFormDialog from "@/components/maintenance/MaintenanceFormDialog";

// Mock data for reports
const scheduledReports = [
  {
    id: 1,
    title: "Daily Operations Summary",
    frequency: "Daily",
    nextRun: "Today, 18:00",
    recipients: ["operations@aramco.com", "management@aramco.com"],
    format: "PDF"
  },
  {
    id: 2,
    title: "Weekly Maintenance Report",
    frequency: "Weekly",
    nextRun: "Monday, 09:00",
    recipients: ["maintenance@aramco.com"],
    format: "Excel"
  },
  {
    id: 3,
    title: "Monthly Efficiency Analysis",
    frequency: "Monthly",
    nextRun: "Sep 1, 00:00",
    recipients: ["analytics@aramco.com", "management@aramco.com"],
    format: "PDF"
  }
];

const recentReports = [
  {
    id: 101,
    title: "Daily Operations Summary",
    generated: "Aug 14, 18:00",
    status: "Completed",
    format: "PDF"
  },
  {
    id: 102,
    title: "Weekly Maintenance Report",
    generated: "Aug 7, 09:00",
    status: "Completed",
    format: "Excel"
  },
  {
    id: 103,
    title: "Infrastructure Health Check",
    generated: "Aug 14, 12:00",
    status: "Completed",
    format: "PDF"
  }
];

const ScheduledReporting = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [maintenanceDialogOpen, setMaintenanceDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Reporting Dashboard</h3>
        <div className="flex gap-2">
          <Button size="sm" className="gap-1" onClick={() => setCreateDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Create Report
          </Button>
          <Button size="sm" className="gap-1" onClick={() => setMaintenanceDialogOpen(true)}>
            <Calendar className="h-4 w-4" />
            Schedule Maintenance
          </Button>
        </div>
      </div>

      <Tabs defaultValue="scheduled">
        <TabsList>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="scheduled" className="space-y-4 pt-4">
          {scheduledReports.map(report => (
            <Card key={report.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">{report.title}</CardTitle>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{report.frequency}</span>
                  </div>
                </div>
                <CardDescription>
                  Next run: {report.nextRun}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-sm">
                  <div><strong>Recipients:</strong> {report.recipients.join(", ")}</div>
                  <div><strong>Format:</strong> {report.format}</div>
                </div>
              </CardContent>
              <CardFooter className="pt-2 pb-4 flex justify-end gap-2">
                <Button size="sm" variant="outline">Edit</Button>
                <Button size="sm" variant="outline">Run Now</Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4 pt-4">
          {recentReports.map(report => (
            <Card key={report.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">{report.title}</CardTitle>
                  <div className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    {report.status}
                  </div>
                </div>
                <CardDescription>
                  Generated: {report.generated}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-sm">
                  <strong>Format:</strong> {report.format}
                </div>
              </CardContent>
              <CardFooter className="pt-2 pb-4 flex justify-end">
                <Button size="sm" variant="outline" className="gap-1">
                  <Download className="h-3 w-3" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Report Scheduling Overview</CardTitle>
          <CardDescription>Upcoming and past reports at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <Calendar className="h-8 w-8 text-primary mb-2" />
              <h4 className="font-medium">Today</h4>
              <p className="text-2xl font-bold">1</p>
              <p className="text-sm text-muted-foreground">Scheduled Report</p>
            </div>

            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <BarChart className="h-8 w-8 text-primary mb-2" />
              <h4 className="font-medium">This Week</h4>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">Scheduled Reports</p>
            </div>

            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <FileText className="h-8 w-8 text-primary mb-2" />
              <h4 className="font-medium">This Month</h4>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Scheduled Reports</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <CreateReportDialog 
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />

      {maintenanceDialogOpen && (
        <MaintenanceFormDialog
          open={maintenanceDialogOpen}
          onClose={() => setMaintenanceDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default ScheduledReporting;
