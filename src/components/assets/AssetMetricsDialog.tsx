
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart } from "@/components/ui/charts";

const timeSeriesData = [
  { month: "Jan", uptime: 720, downtime: 24 },
  { month: "Feb", uptime: 672, downtime: 0 },
  { month: "Mar", uptime: 744, downtime: 0 },
  { month: "Apr", uptime: 720, downtime: 0 },
  { month: "May", uptime: 744, downtime: 0 },
  { month: "Jun", uptime: 720, downtime: 8 },
];

const failureData = [
  { month: "Jan", failures: 3 },
  { month: "Feb", failures: 2 },
  { month: "Mar", failures: 1 },
  { month: "Apr", failures: 0 },
  { month: "May", failures: 3 },
  { month: "Jun", failures: 1 },
  { month: "Jul", failures: 2 },
];

const AssetMetricsDialog = () => {
  return (
    <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Asset Metrics & Analytics</DialogTitle>
        <DialogDescription>
          View detailed performance metrics and reliability data
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Breakdown Count</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold">1</span>
                <span className="text-sm text-muted-foreground">Last 30 days</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">MTBF (Hours)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold">4344</span>
                <span className="text-sm text-muted-foreground">Mean Time Between Failures</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold">99.45%</span>
                <span className="text-sm text-muted-foreground">System Uptime</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Up Time & Down Time (Hours)</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <BarChart 
                data={timeSeriesData}
                index="month"
                categories={["uptime", "downtime"]}
                colors={["#10b981", "#f43f5e"]}
                valueFormatter={(value) => `${value} hrs`}
                showLegend={true}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Equipment Failures by Month</CardTitle>
            <CardDescription>Last 7 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <BarChart 
                data={failureData}
                index="month"
                categories={["failures"]}
                colors={["#3b82f6"]}
                valueFormatter={(value) => `${value} failures`}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Detailed Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>2023</TableHead>
                  <TableHead>2024 YTD</TableHead>
                  <TableHead>Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">MTTR (hrs)</TableCell>
                  <TableCell>4.2</TableCell>
                  <TableCell>1.8</TableCell>
                  <TableCell className="text-emerald-500">-57.1%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">MTBF (hrs)</TableCell>
                  <TableCell>3120</TableCell>
                  <TableCell>4344</TableCell>
                  <TableCell className="text-emerald-500">+39.2%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Availability</TableCell>
                  <TableCell>98.7%</TableCell>
                  <TableCell>99.5%</TableCell>
                  <TableCell className="text-emerald-500">+0.8%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Total Failures</TableCell>
                  <TableCell>27</TableCell>
                  <TableCell>6</TableCell>
                  <TableCell className="text-emerald-500">-77.8%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Critical Failures</TableCell>
                  <TableCell>8</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell className="text-emerald-500">-87.5%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <DialogFooter>
        <Button variant="outline">Generate Report</Button>
        <Button>Close</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AssetMetricsDialog;
