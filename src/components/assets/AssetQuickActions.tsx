
import { Button } from "@/components/ui/button";
import { BarChart, ClipboardList, Thermometer, Wrench } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface AssetQuickActionsProps {
  onShowLifecycleStages: () => void;
  onShowCBMSettings: () => void;
  onShowMaintenanceTimeline: () => void;
  onShowMaintenanceSchedule: () => void;
}

const AssetQuickActions = ({
  onShowLifecycleStages,
  onShowCBMSettings,
  onShowMaintenanceTimeline,
  onShowMaintenanceSchedule,
}: AssetQuickActionsProps) => {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm" className="justify-start" onClick={onShowLifecycleStages}>
            <ClipboardList className="mr-2 h-4 w-4" />
            Lifecycle Stages
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>View asset lifecycle stages from acquisition to decommissioning</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm" className="justify-start" onClick={onShowCBMSettings}>
            <Thermometer className="mr-2 h-4 w-4" />
            CBM Thresholds
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Configure condition-based monitoring thresholds</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm" className="justify-start" onClick={onShowMaintenanceTimeline}>
            <BarChart className="mr-2 h-4 w-4" />
            Maintenance Timeline
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>View historical and scheduled maintenance activities</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm" className="justify-start" onClick={onShowMaintenanceSchedule}>
            <Wrench className="mr-2 h-4 w-4" />
            Maintenance Schedule
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Manage and view upcoming maintenance schedules</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
};

export default AssetQuickActions;
