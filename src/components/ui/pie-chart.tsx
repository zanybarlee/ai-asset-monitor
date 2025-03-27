
import * as React from "react";
import {
  Pie,
  Tooltip,
  Legend,
  PieChart as ReChartsPieChart,
} from "recharts";
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart";
import { PieChartProps } from "./chart-types";

export function PieChart({
  data,
  index,
  category,
  colors = ["#0ea5e9", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"],
  valueFormatter = (value: number) => `${value}`,
  className,
  showAnimation = false,
  showLegend = false,
  height = "100%",
}: PieChartProps) {
  // Create a config object from the data points for consistent styling
  const config = Object.fromEntries(
    data.map((item, i) => [
      item[index],
      {
        label: item[index],
        color: colors[i % colors.length],
      },
    ])
  );

  return (
    <ChartContainer config={config} className={className}>
      <ReChartsPieChart className="h-full w-full">
        <Pie
          data={data}
          dataKey={category}
          nameKey={index}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          isAnimationActive={showAnimation}
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, i) => (
            <Tooltip
              key={`cell-${i}`}
              content={({ active, payload }) => (
                <ChartTooltipContent
                  active={active}
                  payload={payload}
                  nameKey={index}
                  labelKey={category}
                  formatter={valueFormatter}
                />
              )}
            />
          ))}
          {data.map((entry, i) => (
            <Pie
              key={`cell-${i}`}
              data={[entry]}
              dataKey={category}
              nameKey={index}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={80}
              fill={colors[i % colors.length]}
            />
          ))}
        </Pie>
        {showLegend && (
          <Legend 
            content={<ChartLegendContent nameKey={index} />} 
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        )}
      </ReChartsPieChart>
    </ChartContainer>
  );
}
