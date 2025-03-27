
import { Calendar, Wrench, AlertTriangle } from "lucide-react";
import { Label } from "@/components/ui/label";

interface WorkOrderTypeSelectorProps {
  workOrderType: string;
  setWorkOrderType: (type: string) => void;
}

const WorkOrderTypeSelector = ({ workOrderType, setWorkOrderType }: WorkOrderTypeSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>Work Order Type</Label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div 
          className={`cursor-pointer border rounded-md p-4 flex flex-col items-center text-center ${
            workOrderType === "preventive" ? "bg-primary/10 border-primary" : ""
          }`}
          onClick={() => setWorkOrderType("preventive")}
        >
          <Calendar className="h-8 w-8 mb-2 text-blue-500" />
          <h4 className="font-medium">Preventive Maintenance</h4>
          <p className="text-xs text-muted-foreground mt-1">Scheduled, routine maintenance tasks</p>
        </div>
        <div 
          className={`cursor-pointer border rounded-md p-4 flex flex-col items-center text-center ${
            workOrderType === "corrective" ? "bg-primary/10 border-primary" : ""
          }`}
          onClick={() => setWorkOrderType("corrective")}
        >
          <Wrench className="h-8 w-8 mb-2 text-amber-500" />
          <h4 className="font-medium">Corrective Maintenance</h4>
          <p className="text-xs text-muted-foreground mt-1">Repairs for identified issues</p>
        </div>
        <div 
          className={`cursor-pointer border rounded-md p-4 flex flex-col items-center text-center ${
            workOrderType === "emergency" ? "bg-primary/10 border-primary" : ""
          }`}
          onClick={() => setWorkOrderType("emergency")}
        >
          <AlertTriangle className="h-8 w-8 mb-2 text-destructive" />
          <h4 className="font-medium">Emergency Repair</h4>
          <p className="text-xs text-muted-foreground mt-1">Urgent fixes for critical issues</p>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderTypeSelector;
