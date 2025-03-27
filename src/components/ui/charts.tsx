
// Barrel file to maintain backward compatibility with existing imports

// Re-export all chart components
export { AreaChart } from "./area-chart";
export { BarChart } from "./bar-chart";
export { LineChart } from "./line-chart";
export { PieChart } from "./pie-chart";

// Re-export chart types
export type { ChartProps, PieChartProps } from "./chart-types";
