
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaintenanceHistory } from "@/components/maintenance";
import { PredictiveAnalytics } from "@/components/maintenance";
import { AiInsights } from "@/components/maintenance";

const MaintenanceTabs = () => {
  return (
    <Tabs defaultValue="history" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-3">
        <TabsTrigger value="history">Maintenance History</TabsTrigger>
        <TabsTrigger value="predictive">Predictive Analytics</TabsTrigger>
        <TabsTrigger value="insights">AI Insights</TabsTrigger>
      </TabsList>
      
      <TabsContent value="history" className="mt-4">
        <MaintenanceHistory />
      </TabsContent>
      
      <TabsContent value="predictive" className="mt-4">
        <PredictiveAnalytics />
      </TabsContent>
      
      <TabsContent value="insights" className="mt-4">
        <AiInsights />
      </TabsContent>
    </Tabs>
  );
};

export default MaintenanceTabs;
