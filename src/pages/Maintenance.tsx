import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScheduleMaintenance from "@/components/maintenance/ScheduleMaintenance";
import MaintenanceHistory from "@/components/maintenance/MaintenanceHistory";
import PredictiveAnalytics from "@/components/maintenance/PredictiveAnalytics";
import AIInsights from "@/components/maintenance/AIInsights";
import MaintenanceHeader from "@/components/maintenance/MaintenanceHeader";
const Maintenance = () => {
  return <div className="space-y-6">
      <MaintenanceHeader />

      <Tabs defaultValue="schedule" className="w-full">
        <div className="border-b mb-4">
          <TabsList className="flex w-full justify-start space-x-2 h-12 bg-transparent p-0">
            <TabsTrigger value="schedule" className="px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-aramco-teal rounded-none data-[state=active]:shadow-none">
              Schedule Maintenance
            </TabsTrigger>
            <TabsTrigger value="history" className="px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-aramco-teal rounded-none data-[state=active]:shadow-none">
              Maintenance History
            </TabsTrigger>
            <TabsTrigger value="predictive" className="px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-aramco-teal rounded-none data-[state=active]:shadow-none">Predictive Maintenance</TabsTrigger>
            <TabsTrigger value="insights" className="px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-aramco-teal rounded-none data-[state=active]:shadow-none">
              AI Insights
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="schedule" className="mt-0">
          <ScheduleMaintenance />
        </TabsContent>
        
        <TabsContent value="history" className="mt-0">
          <MaintenanceHistory />
        </TabsContent>
        
        <TabsContent value="predictive" className="mt-0">
          <PredictiveAnalytics />
        </TabsContent>
        
        <TabsContent value="insights" className="mt-0">
          <AIInsights />
        </TabsContent>
      </Tabs>
    </div>;
};
export default Maintenance;