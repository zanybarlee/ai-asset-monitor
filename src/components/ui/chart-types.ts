
export interface ChartProps {
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

export interface PieChartProps {
  data: any[];
  index: string;
  category: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
  showAnimation?: boolean;
  showLegend?: boolean;
  height?: number | string;
}
