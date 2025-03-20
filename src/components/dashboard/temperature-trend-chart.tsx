
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart } from "@/components/ui/charts";

interface TemperatureData {
  time: string;
  value: number;
}

interface TemperatureTrendChartProps {
  data: TemperatureData[];
}

const TemperatureTrendChart = ({ data }: TemperatureTrendChartProps) => {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Temperature Trend (24h)</CardTitle>
        <CardDescription>Average temperature readings over time</CardDescription>
      </CardHeader>
      <CardContent>
        <AreaChart 
          data={data.map(d => ({ name: d.time, value: d.value }))}
          categories={["value"]}
          index="name"
          colors={["#06b6d4"]}
          showAnimation={true}
          valueFormatter={(value) => `${value.toFixed(1)}°C`}
          className="h-[300px]"
        />
      </CardContent>
    </Card>
  );
};

export default TemperatureTrendChart;
