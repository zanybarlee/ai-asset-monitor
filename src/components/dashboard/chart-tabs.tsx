
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TemperatureTrendChart } from "@/components/dashboard";
import { ResourceDistributionChart } from "@/components/dashboard";
import { SystemUtilizationChart } from "@/components/dashboard";
import { PerformanceTrendsChart } from "@/components/dashboard";

interface ChartTabsProps {
  temperatureData: { time: string; value: number }[];
  resourceData: { name: string; value: number }[];
}

const ChartTabs = ({ temperatureData, resourceData }: ChartTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="utilization">Utilization</TabsTrigger>
        <TabsTrigger value="trends">Trends</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TemperatureTrendChart data={temperatureData} />
          <ResourceDistributionChart data={resourceData} />
        </div>
      </TabsContent>
      
      <TabsContent value="utilization" className="mt-4">
        <SystemUtilizationChart />
      </TabsContent>
      
      <TabsContent value="trends" className="mt-4">
        <PerformanceTrendsChart />
      </TabsContent>
    </Tabs>
  );
};

export default ChartTabs;
