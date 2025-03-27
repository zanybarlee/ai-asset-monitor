
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScheduleMaintenance from "@/components/maintenance/ScheduleMaintenance";
import MaintenanceHistory from "@/components/maintenance/MaintenanceHistory";
import PredictiveAnalytics from "@/components/maintenance/PredictiveAnalytics";
import AIInsights from "@/components/maintenance/AIInsights";
import MaintenanceHeader from "@/components/maintenance/MaintenanceHeader";

const Maintenance = () => {
  return (
    <div className="space-y-6">
      <MaintenanceHeader />

      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="schedule">Schedule Maintenance</TabsTrigger>
          <TabsTrigger value="history">Maintenance History</TabsTrigger>
          <TabsTrigger value="predictive">Predictive Analytics</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="schedule" className="mt-4">
          <ScheduleMaintenance />
        </TabsContent>
        
        <TabsContent value="history" className="mt-4">
          <MaintenanceHistory />
        </TabsContent>
        
        <TabsContent value="predictive" className="mt-4">
          <PredictiveAnalytics />
        </TabsContent>
        
        <TabsContent value="insights" className="mt-4">
          <AIInsights />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Maintenance;
