
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, BarChart, PieChart } from "@/components/ui/charts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  AlertCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Cpu, 
  Thermometer, 
  Droplets, 
  Zap, 
  RefreshCw
} from "lucide-react";

// Placeholder data for charts and stats
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
  ]
};

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    // Update time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Operational Dashboard</h2>
          <p className="text-muted-foreground">
            Real-time monitoring of data center operations
          </p>
        </div>
        <Button 
          variant="outline" 
          className="w-full sm:w-auto"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh Data'}
        </Button>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">System Health</CardTitle>
            <CardDescription>Overall health score based on all systems</CardDescription>
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

      {/* Charts & Analytics */}
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
      
      {/* Work Order Summary */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-2xl">Work Order Summary</CardTitle>
          <CardDescription>Status of current maintenance tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-md border p-4 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-primary">12</div>
              <div className="text-sm font-medium text-muted-foreground">Open Tasks</div>
            </div>
            <div className="rounded-md border p-4 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-amber-500">7</div>
              <div className="text-sm font-medium text-muted-foreground">In Progress</div>
            </div>
            <div className="rounded-md border p-4 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-emerald-500">24</div>
              <div className="text-sm font-medium text-muted-foreground">Completed</div>
            </div>
            <div className="rounded-md border p-4 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-destructive">3</div>
              <div className="text-sm font-medium text-muted-foreground">Delayed</div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View All Work Orders</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
