
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart } from "@/components/ui/charts";
import { Zap, Battery, AlertTriangle } from "lucide-react";

const RealTimeMonitoring = () => {
  // Sample power usage data
  const powerUsageData = [
    { time: "00:00", load: 68, capacity: 85, temperature: 22 },
    { time: "04:00", load: 72, capacity: 85, temperature: 23 },
    { time: "08:00", load: 86, capacity: 85, temperature: 25 },
    { time: "12:00", load: 92, capacity: 85, temperature: 26 },
    { time: "16:00", load: 90, capacity: 85, temperature: 25 },
    { time: "20:00", load: 78, capacity: 85, temperature: 24 },
  ];

  // Sample rack distribution data
  const rackDistributionData = [
    { zone: "Zone A", current: 65, peak: 80 },
    { zone: "Zone B", current: 72, peak: 85 },
    { zone: "Zone C", current: 88, peak: 90 },
    { zone: "Zone D", current: 56, peak: 75 },
    { zone: "Zone E", current: 61, peak: 78 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Power Usage</CardTitle>
            <Zap className="h-4 w-4 text-aramco-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86.4 MW</div>
            <p className="text-xs text-muted-foreground">+2.5% from last 24 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">UPS Capacity</CardTitle>
            <Battery className="h-4 w-4 text-aramco-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <p className="text-xs text-muted-foreground">18 minutes backup remaining</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 PDUs with high load, 1 UPS alert</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Power Load vs Capacity</CardTitle>
            <CardDescription>
              Real-time data from PDUs and UPS systems across all racks
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <LineChart 
              data={powerUsageData}
              index="time"
              categories={["load", "capacity", "temperature"]}
              colors={["#0ea5e9", "#ef4444", "#f59e0b"]}
              valueFormatter={(value) => `${value}%`}
              showLegend={true}
            />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Power Distribution by Zone</CardTitle>
            <CardDescription>
              Current vs Peak power usage across data center zones
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <BarChart 
              data={rackDistributionData}
              index="zone"
              categories={["current", "peak"]}
              colors={["#0ea5e9", "#ef4444"]}
              valueFormatter={(value) => `${value}%`}
              showLegend={true}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealTimeMonitoring;
