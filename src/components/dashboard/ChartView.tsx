
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, BarChart, LineChart, PieChart } from "@/components/ui/charts";

interface ChartViewProps {
  temperatureHistory: any[];
  resourceUtilization: any[];
}

const ChartView = ({ temperatureHistory, resourceUtilization }: ChartViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="glass">
        <CardHeader>
          <CardTitle>Temperature Trend (24h)</CardTitle>
          <CardDescription>Average temperature readings over time</CardDescription>
        </CardHeader>
        <CardContent>
          <AreaChart 
            data={temperatureHistory.map(d => ({ name: d.time, value: d.value }))}
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
            data={resourceUtilization}
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
  );
};

export default ChartView;
