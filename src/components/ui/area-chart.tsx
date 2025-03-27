
import * as React from "react";
import {
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  AreaChart as ReChartsAreaChart,
} from "recharts";
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart";
import { ChartProps } from "./chart-types";

export function AreaChart({
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
      <ReChartsAreaChart data={data} className="h-full w-full">
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
          <Area
            key={category}
            type="monotone"
            dataKey={category}
            fill={colors[i % colors.length]}
            stroke={colors[i % colors.length]}
            isAnimationActive={showAnimation}
            fillOpacity={0.3}
          />
        ))}
      </ReChartsAreaChart>
    </ChartContainer>
  );
}
