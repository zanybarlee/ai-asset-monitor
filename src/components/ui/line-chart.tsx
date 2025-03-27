
import * as React from "react";
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart as ReChartsLineChart,
} from "recharts";
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart";
import { ChartProps } from "./chart-types";

export function LineChart({
  data,
  index,
  categories,
  colors = ["#0ea5e9", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"],
  valueFormatter = (value: number) => `${value}`,
  className,
  showAnimation = false,
  showLegend = false,
  height = "100%",
}: ChartProps) {
  const config = Object.fromEntries(
    categories.map((category, i) => [
      category,
      {
        label: category,
        color: colors[i % colors.length],
      },
    ])
  );

  return (
    <ChartContainer config={config} className={className}>
      <ReChartsLineChart data={data} className="h-full w-full">
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey={index}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          tickMargin={10}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          tickMargin={10}
          tickFormatter={valueFormatter}
        />
        <Tooltip
          content={({ active, payload, label }) => (
            <ChartTooltipContent
              active={active}
              payload={payload}
              label={label}
              formatter={valueFormatter}
            />
          )}
        />
        {showLegend && <Legend content={<ChartLegendContent />} />}
        {categories.map((category, i) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[i % colors.length]}
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
            isAnimationActive={showAnimation}
          />
        ))}
      </ReChartsLineChart>
    </ChartContainer>
  );
}
