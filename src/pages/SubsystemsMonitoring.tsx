
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import UnifiedDashboard from "./subsystems-monitoring/UnifiedDashboard";
import RealTimeAlerts from "./subsystems-monitoring/RealTimeAlerts";
import MiddlewareIntegration from "./subsystems-monitoring/MiddlewareIntegration";

const SubsystemsMonitoring = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Subsystems Monitoring</h2>
        <p className="text-muted-foreground">
          Integrated monitoring and management of all critical subsystems
        </p>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">Unified Dashboard</TabsTrigger>
          <TabsTrigger value="alerts">Real-Time Alerts</TabsTrigger>
          <TabsTrigger value="middleware">Middleware Integration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-4">
          <UnifiedDashboard />
        </TabsContent>
        
        <TabsContent value="alerts" className="mt-4">
          <RealTimeAlerts />
        </TabsContent>
        
        <TabsContent value="middleware" className="mt-4">
          <MiddlewareIntegration />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubsystemsMonitoring;
