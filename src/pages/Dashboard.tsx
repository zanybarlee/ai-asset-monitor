import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, BarChart, PieChart, LineChart } from "@/components/ui/charts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  AlertCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Cpu, 
  Thermometer, 
  Droplets, 
  Zap, 
  RefreshCw,
  Download,
  Filter,
  Calendar,
  CalendarDays,
  ClipboardList
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { mockOrders } from "@/components/work-orders/work-orders-data";
import { Link } from "react-router-dom";

const mockData = {
  systemHealth: 92,
  criticalAlerts: 2,
  warnings: 5,
  normal: 143,
  cpuUsage: 68,
  memoryUsage: 72,
  diskUsage: 45,
  temperature: 23.5,
  humidity: 42,
  powerConsumption: 456,
  temperatureHistory: [
    { time: '00:00', value: 22.4 },
    { time: '04:00', value: 21.8 },
    { time: '08:00', value: 22.7 },
    { time: '12:00', value: 24.5 },
    { time: '16:00', value: 23.2 },
    { time: '20:00', value: 22.8 },
    { time: '24:00', value: 23.5 },
  ],
  resourceUtilization: [
    { name: 'CPU', value: 68 },
    { name: 'Memory', value: 72 },
    { name: 'Disk', value: 45 },
    { name: 'Network', value: 37 },
  ],
  subsystemStatus: [
    { name: 'HVAC', status: 'Normal' },
    { name: 'Electrical', status: 'Warning' },
    { name: 'Fire Safety', status: 'Normal' },
    { name: 'Security', status: 'Normal' },
    { name: 'Cooling', status: 'Critical' },
  ],
  workOrderStats: {
    open: 12,
    inProgress: 7,
    completed: 24,
    delayed: 3,
    totalCost: 15750.25,
    monthlyTrend: [
      { month: 'Jan', open: 10, inProgress: 5, completed: 15 },
      { month: 'Feb', open: 12, inProgress: 6, completed: 18 },
      { month: 'Mar', open: 8, inProgress: 9, completed: 20 },
      { month: 'Apr', open: 14, inProgress: 7, completed: 16 },
      { month: 'May', open: 9, inProgress: 8, completed: 22 },
      { month: 'Jun', open: 11, inProgress: 7, completed: 19 },
    ],
    byLocation: [
      { location: 'Server Room A', count: 15 },
      { location: 'Cooling Tower', count: 8 },
      { name: 'Power Distribution', count: 12 },
      { location: 'Server Room B', count: 7 },
      { location: 'Generator Area', count: 4 },
    ],
    byType: [
      { type: 'Preventative', count: 22 },
      { type: 'Corrective', count: 15 },
      { type: 'Emergency', count: 5 },
      { type: 'Installation', count: 4 },
    ]
  },
  maintenanceSchedule: [
    { id: 'MS001', title: 'HVAC Quarterly Service', date: '2023-08-25', status: 'Upcoming', location: 'Server Room A' },
    { id: 'MS002', title: 'UPS Battery Check', date: '2023-08-22', status: 'Upcoming', location: 'Power Room' },
    { id: 'MS003', title: 'Generator Load Test', date: '2023-08-30', status: 'Scheduled', location: 'Generator Room' },
    { id: 'MS004', title: 'Fire Suppression Inspection', date: '2023-09-05', status: 'Scheduled', location: 'All Rooms' },
    { id: 'MS005', title: 'Cooling Tower Maintenance', date: '2023-09-12', status: 'Scheduled', location: 'Cooling Tower' },
  ]
};

const Dashboard = () => {
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState("month");
  const [filterLocation, setFilterLocation] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const exportLinkRef = useRef<HTMLAnchorElement>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast({
        title: "Dashboard Refreshed",
        description: "All data has been updated to the latest values",
      });
    }, 1000);
  };

  const renderStatusIndicator = (status: string) => {
    switch (status) {
      case 'Critical':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case 'Warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'Normal':
        return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      default:
        return null;
    }
  };

  const handleExportData = (type: string) => {
    let csvContent = "";
    let fileName = "";

    if (type === "workOrders") {
      csvContent = "ID,Title,Assignee,Status,Priority,Cost\n";
      mockOrders.forEach(order => {
        csvContent += `${order.id},${order.title},${order.assignee},${order.status},${order.priority},${order.costTotal || 0}\n`;
      });
      fileName = "work_orders_export.csv";
    } else if (type === "schedule") {
      csvContent = "ID,Title,Date,Status,Location\n";
      mockData.maintenanceSchedule.forEach(item => {
        csvContent += `${item.id},${item.title},${item.date},${item.status},${item.location}\n`;
      });
      fileName = "maintenance_schedule_export.csv";
    } else if (type === "systemStats") {
      csvContent = "Metric,Value\n";
      csvContent += `System Health,${mockData.systemHealth}%\n`;
      csvContent += `Critical Alerts,${mockData.criticalAlerts}\n`;
      csvContent += `Warnings,${mockData.warnings}\n`;
      csvContent += `Normal,${mockData.normal}\n`;
      csvContent += `CPU Usage,${mockData.cpuUsage}%\n`;
      csvContent += `Memory Usage,${mockData.memoryUsage}%\n`;
      csvContent += `Disk Usage,${mockData.diskUsage}%\n`;
      csvContent += `Temperature,${mockData.temperature}°C\n`;
      csvContent += `Humidity,${mockData.humidity}%\n`;
      csvContent += `Power Consumption,${mockData.powerConsumption} kW\n`;
      fileName = "system_stats_export.csv";
    }

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    if (exportLinkRef.current) {
      exportLinkRef.current.setAttribute("href", url);
      exportLinkRef.current.setAttribute("download", fileName);
      exportLinkRef.current.click();
    }

    URL.revokeObjectURL(url);

    toast({
      title: "Export Completed",
      description: `Data has been exported to ${fileName}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Operational Dashboard</h2>
          <p className="text-muted-foreground">
            Real-time monitoring of data center operations
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
          <a ref={exportLinkRef} style={{ display: 'none' }} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass col-span-1">
          <CardHeader className="pb-2 flex flex-row items-start justify-between">
            <div>
              <CardTitle className="text-2xl">System Health</CardTitle>
              <CardDescription>Overall health score based on all systems</CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => handleExportData("systemStats")}
              className="h-8 w-8"
            >
              <Download className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    className="text-muted stroke-current" 
                    strokeWidth="10" 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none"
                  />
                  <circle 
                    className="text-primary stroke-current" 
                    strokeWidth="10" 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeDasharray={`${2 * Math.PI * 40 * mockData.systemHealth / 100} ${2 * Math.PI * 40 * (1 - mockData.systemHealth / 100)}`}
                    strokeDashoffset={2 * Math.PI * 40 * 0.25}
                    style={{ transition: "stroke-dasharray 0.5s ease" }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold">{mockData.systemHealth}%</span>
                  <span className="text-sm text-muted-foreground">Health Score</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="w-full grid grid-cols-3 gap-2 text-center">
              <div className="flex flex-col items-center p-2 rounded-md bg-red-500/10">
                <AlertCircle className="h-5 w-5 text-destructive mb-1" />
                <span className="text-xs font-medium">Critical</span>
                <span className="text-lg font-bold">{mockData.criticalAlerts}</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-md bg-amber-500/10">
                <AlertTriangle className="h-5 w-5 text-amber-500 mb-1" />
                <span className="text-xs font-medium">Warnings</span>
                <span className="text-lg font-bold">{mockData.warnings}</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-md bg-emerald-500/10">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 mb-1" />
                <span className="text-xs font-medium">Normal</span>
                <span className="text-lg font-bold">{mockData.normal}</span>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card className="col-span-1 glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Resource Usage</CardTitle>
            <CardDescription>Current utilization of system resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Cpu className="h-4 w-4" /> CPU Usage
                </span>
                <span className="text-sm font-medium">{mockData.cpuUsage}%</span>
              </div>
              <Progress value={mockData.cpuUsage} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Activity className="h-4 w-4" /> Memory Usage
                </span>
                <span className="text-sm font-medium">{mockData.memoryUsage}%</span>
              </div>
              <Progress value={mockData.memoryUsage} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Thermometer className="h-4 w-4" /> Temperature
                </span>
                <span className="text-sm font-medium">{mockData.temperature}°C</span>
              </div>
              <Progress 
                value={((mockData.temperature - 20) / 15) * 100} 
                className="h-2" 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Droplets className="h-4 w-4" /> Humidity
                </span>
                <span className="text-sm font-medium">{mockData.humidity}%</span>
              </div>
              <Progress value={mockData.humidity} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4" /> Power Consumption
                </span>
                <span className="text-sm font-medium">{mockData.powerConsumption} kW</span>
              </div>
              <Progress 
                value={(mockData.powerConsumption / 600) * 100} 
                className="h-2" 
              />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Subsystem Status</CardTitle>
            <CardDescription>Current status of all subsystems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 pt-2">
              {mockData.subsystemStatus.map((system, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-3 rounded-md ${
                    system.status === 'Critical' ? 'bg-red-500/10' : 
                    system.status === 'Warning' ? 'bg-amber-500/10' : 
                    'bg-emerald-500/10'
                  }`}
                >
                  <span className="font-medium">{system.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${
                      system.status === 'Critical' ? 'text-destructive' : 
                      system.status === 'Warning' ? 'text-amber-500' : 
                      'text-emerald-500'
                    }`}>
                      {system.status}
                    </span>
                    {renderStatusIndicator(system.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Work Order & Maintenance Dashboard</CardTitle>
              <CardDescription>Track and analyze all work orders and maintenance activities</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleExportData("workOrders")}
              >
                <Download className="mr-2 h-4 w-4" />
                Export Work Orders
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleExportData("schedule")}
              >
                <Download className="mr-2 h-4 w-4" />
                Export Schedule
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 text-blue-500" />
                  Open
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{mockData.workOrderStats.open}</div>
                <Link to="/workorders" className="text-xs text-blue-500 hover:underline">View all open work orders</Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Activity className="h-4 w-4 text-amber-500" />
                  In Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{mockData.workOrderStats.inProgress}</div>
                <Link to="/workorders" className="text-xs text-blue-500 hover:underline">View in-progress work orders</Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{mockData.workOrderStats.completed}</div>
                <Link to="/workorders" className="text-xs text-blue-500 hover:underline">View completed work orders</Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  Delayed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{mockData.workOrderStats.delayed}</div>
                <Link to="/workorders" className="text-xs text-blue-500 hover:underline">View delayed work orders</Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-500" />
                  Total Cost
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${mockData.workOrderStats.totalCost.toLocaleString()}</div>
                <span className="text-xs text-muted-foreground">Year to date</span>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center p-4 border rounded-lg bg-muted/20">
            <div className="font-medium">Filter by:</div>
            <div className="flex items-center gap-2">
              <label className="text-sm">Time Period:</label>
              <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm">Location:</label>
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="serverRoomA">Server Room A</SelectItem>
                  <SelectItem value="serverRoomB">Server Room B</SelectItem>
                  <SelectItem value="coolingTower">Cooling Tower</SelectItem>
                  <SelectItem value="powerRoom">Power Room</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm">Type:</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="preventative">Preventative</SelectItem>
                  <SelectItem value="corrective">Corrective</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="installation">Installation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="secondary" size="sm" className="ml-auto">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
          
          <Tabs defaultValue="trends" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="locations">Locations</TabsTrigger>
              <TabsTrigger value="types">Types</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>
            
            <TabsContent value="trends" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Work Order Trend</CardTitle>
                  <CardDescription>Monthly breakdown of work orders by status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <BarChart 
                      data={mockData.workOrderStats.monthlyTrend}
                      categories={["open", "inProgress", "completed"]}
                      index="month"
                      colors={["#3b82f6", "#f59e0b", "#10b981"]}
                      valueFormatter={(value) => `${value} WOs`}
                      showLegend={true}
                      className="h-[350px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="locations" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Work Orders by Location</CardTitle>
                    <CardDescription>Distribution across physical locations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <PieChart 
                        data={mockData.workOrderStats.byLocation}
                        category="count"
                        index="location"
                        colors={["#3b82f6", "#0ea5e9", "#06b6d4", "#0891b2", "#0e7490"]}
                        valueFormatter={(value) => `${value} orders`}
                        showLegend={true}
                        className="h-[350px]"
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Location Details</CardTitle>
                    <CardDescription>Work order counts by location</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Location</TableHead>
                          <TableHead>Work Orders</TableHead>
                          <TableHead>Cost</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockData.workOrderStats.byLocation.map((item, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">{item.location}</TableCell>
                            <TableCell>{item.count}</TableCell>
                            <TableCell>${(item.count * 450).toLocaleString()}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <span className={
                                  item.count > 10 
                                    ? "h-2 w-2 rounded-full bg-amber-500" 
                                    : "h-2 w-2 rounded-full bg-emerald-500"
                                } />
                                {item.count > 10 ? "High" : "Normal"}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="types" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Work Orders by Type</CardTitle>
                    <CardDescription>Distribution by maintenance type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <PieChart 
                        data={mockData.workOrderStats.byType}
                        category="count"
                        index="type"
                        colors={["#10b981", "#f59e0b", "#ef4444", "#6366f1"]}
                        valueFormatter={(value) => `${value} orders`}
                        showLegend={true}
                        className="h-[350px]"
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Type Details</CardTitle>
                    <CardDescription>Work order counts by type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Work Orders</TableHead>
                          <TableHead>Avg Duration</TableHead>
                          <TableHead>Avg Cost</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockData.workOrderStats.byType.map((item, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">{item.type}</TableCell>
                            <TableCell>{item.count}</TableCell>
                            <TableCell>
                              {item.type === 'Emergency' ? '4 hours' : 
                               item.type === 'Corrective' ? '2 days' :
                               item.type === 'Preventative' ? '1 day' : '3 days'}
                            </TableCell>
                            <TableCell>
                              ${item.type === 'Emergency' ? '950' : 
                                item.type === 'Corrective' ? '750' :
                                item.type === 'Preventative' ? '450' : '1200'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="schedule" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Maintenance Schedule</CardTitle>
                  <CardDescription>Next 30 days of scheduled maintenance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Task</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockData.maintenanceSchedule.map((item, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{item.id}</TableCell>
                          <TableCell>{item.title}</TableCell>
                          <TableCell>{item.location}</TableCell>
                          <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className={`px-2 py-1 text-xs rounded-full inline-flex items-center ${
                              item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              item.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {item.status === 'Completed' ? 
                                <CheckCircle2 className="h-3 w-3 mr-1" /> : 
                                item.status === 'Upcoming' ? 
                                <Calendar className="h-3 w-3 mr-1" /> :
                                <CalendarDays className="h-3 w-3 mr-1" />
                              }
                              {item.status}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="ml-auto" asChild>
                    <Link to="/maintenance">View All Scheduled Maintenance</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="utilization">Utilization</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Temperature Trend (24h)</CardTitle>
                <CardDescription>Average temperature readings over time</CardDescription>
              </CardHeader>
              <CardContent>
                <AreaChart 
                  data={mockData.temperatureHistory.map(d => ({ name: d.time, value: d.value }))}
                  categories={["value"]}
                  index="name"
                  colors={["#06b6d4"]}
                  showAnimation={true}
                  valueFormatter={(value) => `${value.toFixed(1)}°C`}
                  className="h-[300px]"
                />
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardHeader>
                <CardTitle>Resource Distribution</CardTitle>
                <CardDescription>Current allocation of system resources</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart 
                  data={mockData.resourceUtilization}
                  category="value"
                  index="name"
                  colors={["#06b6d4", "#0ea5e9", "#0284c7", "#0369a1"]}
                  showAnimation={true}
                  valueFormatter={(value) => `${value}%`}
                  className="h-[300px]"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="utilization" className="mt-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle>System Utilization</CardTitle>
              <CardDescription>Resource usage by subsystem</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart 
                data={[
                  { name: 'HVAC', CPU: 45, Memory: 32, Disk: 22 },
                  { name: 'Electrical', CPU: 62, Memory: 56, Disk: 43 },
                  { name: 'Fire Safety', CPU: 28, Memory: 35, Disk: 14 },
                  { name: 'Security', CPU: 50, Memory: 48, Disk: 38 },
                  { name: 'Cooling', CPU: 75, Memory: 65, Disk: 55 },
                ]}
                categories={["CPU", "Memory", "Disk"]}
                index="name"
                colors={["#06b6d4", "#0ea5e9", "#0284c7"]}
                showLegend={true}
                showAnimation={true}
                valueFormatter={(value) => `${value}%`}
                className="h-[400px]"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="mt-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>System performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <AreaChart 
                data={[
                  { date: 'Jan', CPU: 35, Memory: 28, Temperature: 22 },
                  { date: 'Feb', CPU: 42, Memory: 32, Temperature: 23 },
                  { date: 'Mar', CPU: 48, Memory: 40, Temperature: 24 },
                  { date: 'Apr', CPU: 52, Memory: 45, Temperature: 25 },
                  { date: 'May', CPU: 58, Memory: 52, Temperature: 26 },
                  { date: 'Jun', CPU: 65, Memory: 58, Temperature: 28 },
                  { date: 'Jul', CPU: 69, Memory: 62, Temperature: 29 },
                ]}
                categories={["CPU", "Memory", "Temperature"]}
                index="date"
                colors={["#06b6d4", "#0ea5e9", "#ef4444"]}
                showLegend={true}
                showAnimation={true}
                valueFormatter={(value) => `${value}`}
                className="h-[400px]"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
