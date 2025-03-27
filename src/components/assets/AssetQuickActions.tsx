
import { Button } from "@/components/ui/button";
import { BarChart, ClipboardList, Thermometer, Wrench } from "lucide-react";

interface AssetQuickActionsProps {
  onShowLifecycleStages: () => void;
  onShowCBMSettings: () => void;
  onShowMaintenanceTimeline: () => void;
}

const AssetQuickActions = ({
  onShowLifecycleStages,
  onShowCBMSettings,
  onShowMaintenanceTimeline,
}: AssetQuickActionsProps) => {
  return (
    <>
      <Button variant="outline" size="sm" className="justify-start" onClick={onShowLifecycleStages}>
        <ClipboardList className="mr-2 h-4 w-4" />
        Lifecycle Stages
      </Button>
      <Button variant="outline" size="sm" className="justify-start" onClick={onShowCBMSettings}>
        <Thermometer className="mr-2 h-4 w-4" />
        CBM Thresholds
      </Button>
      <Button variant="outline" size="sm" className="justify-start" onClick={onShowMaintenanceTimeline}>
        <BarChart className="mr-2 h-4 w-4" />
        Maintenance Timeline
      </Button>
      <Button variant="outline" size="sm" className="justify-start">
        <Wrench className="mr-2 h-4 w-4" />
        Maintenance Schedule
      </Button>
    </>
  );
};

export default AssetQuickActions;
