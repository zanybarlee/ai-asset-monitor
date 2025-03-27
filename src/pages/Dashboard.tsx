
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { mockOrders } from "@/components/work-orders/work-orders-data";

// Import our new components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SystemHealthCard from "@/components/dashboard/SystemHealthCard";
import ResourceUsageCard from "@/components/dashboard/ResourceUsageCard";
import SubsystemStatusCard from "@/components/dashboard/SubsystemStatusCard";
import WorkOrderStatsCards from "@/components/dashboard/WorkOrderStatsCards";
import DashboardFilter from "@/components/dashboard/DashboardFilter";
import WorkOrderChart from "@/components/dashboard/WorkOrderChart";
import WorkOrderLocationStats from "@/components/dashboard/WorkOrderLocationStats";
import WorkOrderTypeStats from "@/components/dashboard/WorkOrderTypeStats";
import MaintenanceScheduleTable from "@/components/dashboard/MaintenanceScheduleTable";
import ChartView from "@/components/dashboard/ChartView";
import UtilizationChartView from "@/components/dashboard/UtilizationChartView";
import TrendsChartView from "@/components/dashboard/TrendsChartView";

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
      { location: 'Power Distribution', count: 12 },
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
      <DashboardHeader handleRefresh={handleRefresh} refreshing={refreshing} />
      <a ref={exportLinkRef} style={{ display: 'none' }} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SystemHealthCard 
          systemHealth={mockData.systemHealth}
          criticalAlerts={mockData.criticalAlerts}
          warnings={mockData.warnings}
          normal={mockData.normal}
          onExport={handleExportData}
        />

        <ResourceUsageCard 
          cpuUsage={mockData.cpuUsage}
          memoryUsage={mockData.memoryUsage}
          temperature={mockData.temperature}
          humidity={mockData.humidity}
          powerConsumption={mockData.powerConsumption}
        />

        <SubsystemStatusCard subsystems={mockData.subsystemStatus} />
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
          <WorkOrderStatsCards 
            open={mockData.workOrderStats.open}
            inProgress={mockData.workOrderStats.inProgress}
            completed={mockData.workOrderStats.completed}
            delayed={mockData.workOrderStats.delayed}
            totalCost={mockData.workOrderStats.totalCost}
          />
          
          <DashboardFilter 
            filterPeriod={filterPeriod} 
            setFilterPeriod={setFilterPeriod}
            filterLocation={filterLocation}
            setFilterLocation={setFilterLocation}
            filterType={filterType}
            setFilterType={setFilterType}
          />
          
          <Tabs defaultValue="trends" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="locations">Locations</TabsTrigger>
              <TabsTrigger value="types">Types</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>
            
            <TabsContent value="trends" className="pt-4">
              <WorkOrderChart data={mockData.workOrderStats.monthlyTrend} />
            </TabsContent>
            
            <TabsContent value="locations" className="pt-4">
              <WorkOrderLocationStats data={mockData.workOrderStats.byLocation} />
            </TabsContent>
            
            <TabsContent value="types" className="pt-4">
              <WorkOrderTypeStats data={mockData.workOrderStats.byType} />
            </TabsContent>
            
            <TabsContent value="schedule" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Maintenance Schedule</CardTitle>
                  <CardDescription>Next 30 days of scheduled maintenance</CardDescription>
                </CardHeader>
                <CardContent>
                  <MaintenanceScheduleTable items={mockData.maintenanceSchedule} />
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
          <ChartView 
            temperatureHistory={mockData.temperatureHistory}
            resourceUtilization={mockData.resourceUtilization}
          />
        </TabsContent>
        
        <TabsContent value="utilization" className="mt-4">
          <UtilizationChartView />
        </TabsContent>
        
        <TabsContent value="trends" className="mt-4">
          <TrendsChartView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
