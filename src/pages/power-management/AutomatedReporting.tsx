
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, PieChart } from "@/components/ui/charts";
import { FileText, TrendingDown, TrendingUp } from "lucide-react";

const AutomatedReporting = () => {
  // Sample monthly consumption data
  const monthlyConsumptionData = [
    { month: "Jan", consumption: 76, baseline: 80 },
    { month: "Feb", consumption: 78, baseline: 80 },
    { month: "Mar", consumption: 84, baseline: 80 },
    { month: "Apr", consumption: 88, baseline: 80 },
    { month: "May", consumption: 94, baseline: 80 },
    { month: "Jun", consumption: 92, baseline: 80 },
    { month: "Jul", consumption: 88, baseline: 80 },
    { month: "Aug", consumption: 85, baseline: 80 },
  ];

  // Sample efficiency breakdown data
  const efficiencyBreakdownData = [
    { category: "Cooling", value: 38 },
    { category: "Computing", value: 42 },
    { category: "Lighting", value: 8 },
    { category: "Other", value: 12 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PUE Rating</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.38</div>
            <p className="text-xs text-muted-foreground">-0.06 from last quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Cost</CardTitle>
            <FileText className="h-4 w-4 text-aramco-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.42M</div>
            <p className="text-xs text-muted-foreground">+3.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CO2 Emissions</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">876 tons</div>
            <p className="text-xs text-muted-foreground">+1.8% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Monthly Power Consumption</CardTitle>
            <CardDescription>
              Actual consumption compared to baseline targets
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <AreaChart 
              data={monthlyConsumptionData}
              index="month"
              categories={["consumption", "baseline"]}
              colors={["#0ea5e9", "#10b981"]}
              valueFormatter={(value) => `${value} MW`}
              showLegend={true}
            />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Power Consumption Breakdown</CardTitle>
            <CardDescription>
              Distribution of power usage by system category
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <PieChart 
              data={efficiencyBreakdownData}
              index="category"
              category="value"
              colors={["#0ea5e9", "#10b981", "#f59e0b", "#8b5cf6"]}
              valueFormatter={(value) => `${value}%`}
              showLegend={true}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AutomatedReporting;
