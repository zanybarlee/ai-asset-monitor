
import * as React from "react";
import {
  Line,
  Bar,
  Pie,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  PieChart as ReChartsPieChart,
  LineChart as ReChartsLineChart,
  BarChart as ReChartsBarChart,
  AreaChart as ReChartsAreaChart,
} from "recharts";

import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart";

interface ChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
  showAnimation?: boolean;
  showLegend?: boolean;
  height?: number | string;
}

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

export function BarChart({
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
      <ReChartsBarChart data={data} className="h-full w-full">
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
          <Bar
            key={category}
            dataKey={category}
            fill={colors[i % colors.length]}
            isAnimationActive={showAnimation}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </ReChartsBarChart>
    </ChartContainer>
  );
}

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
}: {
  data: any[];
  index: string;
  category: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
  showAnimation?: boolean;
  showLegend?: boolean;
  height?: number | string;
}) {
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
