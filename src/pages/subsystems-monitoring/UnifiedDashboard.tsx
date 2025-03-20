
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AreaChart, BarChart } from "@/components/ui/charts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Zap, Thermometer, ShieldAlert, Activity, AlertTriangle } from "lucide-react";

const UnifiedDashboard = () => {
  // Sample data for the unified view
  const electricalData = [
    { time: "00:00", load: 68, voltage: 478, current: 102 },
    { time: "04:00", load: 72, voltage: 480, current: 108 },
    { time: "08:00", load: 86, voltage: 476, current: 128 },
    { time: "12:00", load: 92, voltage: 475, current: 140 },
    { time: "16:00", load: 90, voltage: 477, current: 138 },
    { time: "20:00", load: 78, voltage: 479, current: 120 },
  ];

  const hvacData = [
    { time: "00:00", temperature: 22.1, humidity: 45, pressure: 101.2 },
    { time: "04:00", temperature: 21.8, humidity: 46, pressure: 101.3 },
    { time: "08:00", temperature: 22.5, humidity: 48, pressure: 101.1 },
    { time: "12:00", temperature: 23.8, humidity: 52, pressure: 100.9 },
    { time: "16:00", temperature: 24.2, humidity: 50, pressure: 101.0 },
    { time: "20:00", temperature: 23.1, humidity: 47, pressure: 101.2 },
  ];

  const safetyData = [
    { zone: "Data Hall A", fireAlarm: 100, accessControl: 98, cctv: 100 },
    { zone: "Data Hall B", fireAlarm: 100, accessControl: 100, cctv: 97 },
    { zone: "UPS Room", fireAlarm: 100, accessControl: 100, cctv: 100 },
    { zone: "Generator", fireAlarm: 98, accessControl: 100, cctv: 95 },
    { zone: "Office Area", fireAlarm: 100, accessControl: 99, cctv: 100 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Electrical Systems</CardTitle>
            <Zap className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">478V / 126A</div>
            <p className="text-xs text-muted-foreground">Load: 88% of capacity</p>
            <Progress value={88} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">HVAC Systems</CardTitle>
            <Thermometer className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23.2°C / 49%</div>
            <p className="text-xs text-muted-foreground">Temperature and humidity in optimal range</p>
            <Progress value={95} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Safety Systems</CardTitle>
            <ShieldAlert className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.6%</div>
            <p className="text-xs text-muted-foreground">Overall safety systems operational status</p>
            <Progress value={98.6} className="h-1 mt-2" />
          </CardContent>
        </Card>
      </div>

      <Alert variant="destructive" className="bg-amber-50 border-amber-200">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Attention Required</AlertTitle>
        <AlertDescription>
          CCTV Camera 12 in Generator area showing intermittent connectivity. Maintenance ticket #DC-2134 created.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="electrical" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="electrical">Electrical</TabsTrigger>
          <TabsTrigger value="hvac">HVAC</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
        </TabsList>
        
        <TabsContent value="electrical" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Electrical Systems Performance</CardTitle>
              <CardDescription>Power load, voltage, and current measurements</CardDescription>
            </CardHeader>
            <CardContent>
              <AreaChart 
                data={electricalData}
                index="time"
                categories={["load", "voltage", "current"]}
                colors={["#3b82f6", "#60a5fa", "#93c5fd"]}
                valueFormatter={(value) => `${value}`}
                showLegend={true}
                className="h-[300px]"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="hvac" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>HVAC Systems Performance</CardTitle>
              <CardDescription>Temperature, humidity, and pressure readings</CardDescription>
            </CardHeader>
            <CardContent>
              <AreaChart 
                data={hvacData}
                index="time"
                categories={["temperature", "humidity", "pressure"]}
                colors={["#22c55e", "#4ade80", "#86efac"]}
                valueFormatter={(value) => `${value}`}
                showLegend={true}
                className="h-[300px]"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="safety" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Safety Systems Status</CardTitle>
              <CardDescription>Operational status of all safety systems by zone</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart 
                data={safetyData}
                index="zone"
                categories={["fireAlarm", "accessControl", "cctv"]}
                colors={["#f97316", "#fb923c", "#fdba74"]}
                valueFormatter={(value) => `${value}%`}
                showLegend={true}
                className="h-[300px]"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UnifiedDashboard;
