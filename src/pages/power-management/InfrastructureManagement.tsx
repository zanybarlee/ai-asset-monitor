
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart } from "@/components/ui/charts";
import { Power, Server, AlertCircle } from "lucide-react";

const InfrastructureManagement = () => {
  // Sample switchgear status data
  const switchgearData = [
    { time: "00:00", voltage: 13.6, current: 820, temperature: 62 },
    { time: "04:00", voltage: 13.7, current: 840, temperature: 65 },
    { time: "08:00", voltage: 13.8, current: 920, temperature: 72 },
    { time: "12:00", voltage: 13.7, current: 980, temperature: 78 },
    { time: "16:00", voltage: 13.6, current: 950, temperature: 75 },
    { time: "20:00", voltage: 13.7, current: 880, temperature: 68 },
  ];

  // Sample generator readiness data
  const generatorData = [
    { generator: "Gen-01", fuelLevel: 92, readiness: 100 },
    { generator: "Gen-02", fuelLevel: 88, readiness: 100 },
    { generator: "Gen-03", fuelLevel: 95, readiness: 100 },
    { generator: "Gen-04", fuelLevel: 78, readiness: 95 },
    { generator: "Gen-05", fuelLevel: 85, readiness: 100 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Switchgear Status</CardTitle>
            <Power className="h-4 w-4 text-aramco-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">13.8 kV</div>
            <p className="text-xs text-muted-foreground">All systems nominal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Generator Status</CardTitle>
            <Server className="h-4 w-4 text-aramco-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5/5 Online</div>
            <p className="text-xs text-muted-foreground">87.6% avg fuel capacity</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MCC Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">MCC-3 high temperature warning</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>13.8 kV Switchgear Performance</CardTitle>
            <CardDescription>
              Voltage, current, and temperature readings over time
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <LineChart 
              data={switchgearData}
              index="time"
              categories={["voltage", "current", "temperature"]}
              colors={["#0ea5e9", "#f59e0b", "#ef4444"]}
              valueFormatter={(value) => `${value}`}
              showLegend={true}
            />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Diesel Generator Status</CardTitle>
            <CardDescription>
              Fuel levels and operational readiness
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <BarChart 
              data={generatorData}
              index="generator"
              categories={["fuelLevel", "readiness"]}
              colors={["#f59e0b", "#10b981"]}
              valueFormatter={(value) => `${value}%`}
              showLegend={true}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InfrastructureManagement;
