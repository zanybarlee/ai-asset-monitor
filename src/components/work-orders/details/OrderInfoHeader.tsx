
import { Label } from "@/components/ui/label";
import { WorkOrder } from "../work-orders-data";

interface OrderInfoHeaderProps {
  workOrder: WorkOrder;
}

const OrderInfoHeader = ({ workOrder }: OrderInfoHeaderProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
        <div>
          <Label className="text-muted-foreground mb-1 block">Location</Label>
          <div className="font-medium">{workOrder.location || "Test HVAC Unit - Plant A"}</div>
        </div>
        <div>
          <Label className="text-muted-foreground mb-1 block">Asset</Label>
          <div className="font-medium">{workOrder.asset || "HVAC-101"}</div>
        </div>
        <div>
          <Label className="text-muted-foreground mb-1 block">Status</Label>
          <div className="font-medium">{workOrder.status}</div>
        </div>
      </div>
      
      <div className="space-y-1 mb-4">
        <Label className="text-muted-foreground mb-1 block">Description</Label>
        <div className="font-medium">{workOrder.description}</div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>SLA Breach</span>
          <span>1 Day 9 Hours Left</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full" style={{ width: "30%" }}></div>
        </div>
      </div>
    </>
  );
};

export default OrderInfoHeader;
