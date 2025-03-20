
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "@/components/ui/charts";

interface ResourceData {
  name: string;
  value: number;
}

interface ResourceDistributionChartProps {
  data: ResourceData[];
}

const ResourceDistributionChart = ({ data }: ResourceDistributionChartProps) => {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Resource Distribution</CardTitle>
        <CardDescription>Current allocation of system resources</CardDescription>
      </CardHeader>
      <CardContent>
        <PieChart 
          data={data}
          category="value"
          index="name"
          colors={["#06b6d4", "#0ea5e9", "#0284c7", "#0369a1"]}
          showAnimation={true}
          valueFormatter={(value) => `${value}%`}
          className="h-[300px]"
        />
      </CardContent>
    </Card>
  );
};

export default ResourceDistributionChart;
