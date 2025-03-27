
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/ui/charts";

const UtilizationChartView = () => {
  return (
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
  );
};

export default UtilizationChartView;
