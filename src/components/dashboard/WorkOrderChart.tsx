
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/ui/charts";

interface WorkOrderChartProps {
  data: any[];
}

const WorkOrderChart = ({ data }: WorkOrderChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Order Trend</CardTitle>
        <CardDescription>Monthly breakdown of work orders by status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <BarChart 
            data={data}
            categories={["open", "inProgress", "completed"]}
            index="month"
            colors={["#3b82f6", "#f59e0b", "#10b981"]}
            valueFormatter={(value) => `${value} WOs`}
            showLegend={true}
            className="h-[350px]"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkOrderChart;
