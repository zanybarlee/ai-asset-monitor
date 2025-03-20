
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart } from "@/components/ui/charts";

const PerformanceTrendsChart = () => {
  return (
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
  );
};

export default PerformanceTrendsChart;
