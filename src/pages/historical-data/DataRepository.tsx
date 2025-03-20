
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { LineChart, BarChart } from "@/components/ui/charts";
import { Slider } from "@/components/ui/slider";
import { Download, BarChart2, PieChart, FileText, Clock, Database, Filter } from "lucide-react";

// Sample data
const performanceData = [
  {
    name: "Jan",
    efficiency: 92,
    load: 67,
    temperature: 24,
  },
  {
    name: "Feb",
    efficiency: 94,
    load: 69,
    temperature: 22,
  },
  {
    name: "Mar",
    efficiency: 91,
    load: 88,
    temperature: 26,
  },
  {
    name: "Apr",
    efficiency: 96,
    load: 72,
    temperature: 23,
  },
  {
    name: "May",
    efficiency: 93,
    load: 74,
    temperature: 25,
  },
  {
    name: "Jun",
    efficiency: 98,
    load: 77,
    temperature: 28,
  },
];

const maintenanceRecords = [
  { id: "M001", date: "2023-10-05", component: "Battery Bank", technician: "John Miller", status: "Completed", notes: "Replaced 2 failing cells, cleaned connections" },
  { id: "M002", date: "2023-10-12", component: "UPS Cooling System", technician: "Sarah Johnson", status: "Completed", notes: "Replaced filters, cleaned heat exchanger" },
  { id: "M003", date: "2023-10-18", component: "Rectifier", technician: "Ahmed Hassan", status: "Pending", notes: "Scheduled inspection due to fluctuating readings" },
  { id: "M004", date: "2023-10-25", component: "Distribution Panel", technician: "Maria Rodriguez", status: "Scheduled", notes: "Quarterly inspection and thermal imaging" },
  { id: "M005", date: "2023-11-01", component: "Generator Set", technician: "David Chen", status: "Completed", notes: "Annual maintenance, replaced fuel filters" },
];

const DataRepository = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            <span>UPS Data Repository</span>
          </CardTitle>
          <CardDescription>
            Secure historical storage for UPS performance metrics and maintenance records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="performance" className="space-y-4">
            <TabsList>
              <TabsTrigger value="performance">Performance History</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance Records</TabsTrigger>
              <TabsTrigger value="logs">Event Logs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">UPS Efficiency Trends</h3>
                  <p className="text-sm text-muted-foreground">Six-month historical view of key performance metrics</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Time Range</div>
                      <Slider className="w-[160px]" defaultValue={[6]} max={12} step={1} />
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="h-3.5 w-3.5" />
                      <span>Export</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="h-[300px]">
                <LineChart 
                  data={performanceData}
                  index="name"
                  categories={["efficiency", "load", "temperature"]}
                  colors={["#10b981", "#3b82f6", "#ef4444"]}
                  showLegend={true}
                  showAnimation={true}
                  valueFormatter={(value: number, category?: string) => {
                    // Fix: Now properly handling value and category as separate parameters
                    if (category === "efficiency") {
                      return `${value}%`;
                    }
                    return `${value}`;
                  }}
                />
              </div>
              <div className="mt-4 p-3 bg-muted/50 rounded-md border">
                <h4 className="text-sm font-medium mb-2">Performance Summary</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Average Efficiency</span>
                    <span className="text-2xl font-bold">94.8%</span>
                    <span className="text-xs text-green-500">+2.1% from previous period</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Average Load</span>
                    <span className="text-2xl font-bold">74.5%</span>
                    <span className="text-xs text-amber-500">+7.3% from previous period</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Average Temperature</span>
                    <span className="text-2xl font-bold">24.6°C</span>
                    <span className="text-xs text-green-500">-1.2°C from previous period</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="maintenance" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">Maintenance History</h3>
                  <p className="text-sm text-muted-foreground">Complete record of all maintenance activities and outcomes</p>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span>Filter</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-3.5 w-3.5" />
                    <span>Export</span>
                  </Button>
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">ID</TableHead>
                      <TableHead className="w-[120px]">Date</TableHead>
                      <TableHead className="w-[160px]">Component</TableHead>
                      <TableHead className="w-[100px]">Status</TableHead>
                      <TableHead className="w-[160px]">Technician</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {maintenanceRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.id}</TableCell>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.component}</TableCell>
                        <TableCell>
                          <Badge variant={
                            record.status === "Completed" ? "default" : 
                            record.status === "Pending" ? "secondary" : 
                            "outline"
                          } 
                          className={record.status === "Completed" ? "bg-green-500 hover:bg-green-600" : 
                                    record.status === "Pending" ? "bg-yellow-500 hover:bg-yellow-600" : ""}>
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{record.technician}</TableCell>
                        <TableCell className="max-w-[300px] truncate" title={record.notes}>
                          {record.notes}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="logs" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">System Event Logs</h3>
                  <p className="text-sm text-muted-foreground">Chronological record of system events and notifications</p>
                </div>
              
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-3.5 w-3.5" />
                  <span>Export Logs</span>
                </Button>
              </div>
              
              <div className="rounded-md border">
                <ScrollArea className="h-[400px] w-full">
                  <div className="p-4 space-y-4">
                    {Array.from({ length: 15 }).map((_, index) => (
                      <div key={index} className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {new Date(2023, 10, 30 - index).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                          <Badge variant="outline" className="text-xs ml-auto">
                            {index % 3 === 0 ? 'Info' : index % 3 === 1 ? 'Warning' : 'Alert'}
                          </Badge>
                        </div>
                        <p className="text-sm">
                          {index % 5 === 0 
                            ? 'UPS switched to battery power due to power fluctuation.' 
                            : index % 5 === 1 
                              ? 'Battery charge level dropped below 80%.' 
                              : index % 5 === 2 
                                ? 'System temperature increased above normal threshold.' 
                                : index % 5 === 3 
                                  ? 'Scheduled maintenance notification issued for battery inspection.'
                                  : 'Normal operation resumed after power stabilization.'}
                        </p>
                        <Separator className="mt-3" />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataRepository;
