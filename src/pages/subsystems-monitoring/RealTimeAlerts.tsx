
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Import the refactored components
import ActiveAlertsCard from "@/components/subsystems-monitoring/ActiveAlertsCard";
import AlertHistoryCard from "@/components/subsystems-monitoring/AlertHistoryCard";
import AlertDetailCard from "@/components/subsystems-monitoring/AlertDetailCard";
import AlertConfigurationCard from "@/components/subsystems-monitoring/AlertConfigurationCard";
import { alertsData } from "@/components/subsystems-monitoring/alertsData";

const RealTimeAlerts = () => {
  const { toast } = useToast();
  const [customThreshold, setCustomThreshold] = useState("82");
  
  const handleAcknowledge = (alertId: string) => {
    toast({
      title: "Alert Acknowledged",
      description: `Alert ${alertId} has been acknowledged and teams notified.`,
    });
  };

  const handleSaveThreshold = () => {
    toast({
      title: "Threshold Updated",
      description: `UPS load capacity threshold updated to ${customThreshold}%.`,
    });
  };

  const handleSettingChange = (setting: string) => {
    toast({
      title: "Setting Updated",
      description: `${setting} has been updated.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <ActiveAlertsCard 
          alerts={alertsData} 
          handleAcknowledge={handleAcknowledge} 
        />
        <AlertHistoryCard alerts={alertsData} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AlertDetailCard handleAcknowledge={handleAcknowledge} />
        <AlertConfigurationCard 
          handleSaveThreshold={handleSaveThreshold}
          handleSettingChange={handleSettingChange}
          customThreshold={customThreshold}
          setCustomThreshold={setCustomThreshold}
        />
      </div>
    </div>
  );
};

export default RealTimeAlerts;
