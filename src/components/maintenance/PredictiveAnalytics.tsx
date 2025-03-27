
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import FailurePredictionsTab from "./predictive/FailurePredictionsTab";
import RootCauseAnalysisTab from "./predictive/RootCauseAnalysisTab";
import DynamicSchedulingTab from "./predictive/DynamicSchedulingTab";

const PredictiveAnalytics = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("predictions");

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="predictions">Failure Predictions</TabsTrigger>
          <TabsTrigger value="root-cause">Root Cause Analysis</TabsTrigger>
          <TabsTrigger value="dynamic-scheduling">Dynamic Scheduling</TabsTrigger>
        </TabsList>

        {/* Failure Predictions Tab */}
        <TabsContent value="predictions" className="space-y-4">
          <FailurePredictionsTab />
        </TabsContent>

        {/* Root Cause Analysis Tab */}
        <TabsContent value="root-cause" className="space-y-4">
          <RootCauseAnalysisTab />
        </TabsContent>

        {/* Dynamic Scheduling Tab */}
        <TabsContent value="dynamic-scheduling" className="space-y-4">
          <DynamicSchedulingTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PredictiveAnalytics;
