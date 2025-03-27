
import { Part, LaborTask } from "../work-orders-data";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface OrderTotalsProps {
  parts: Part[];
  laborTasks: LaborTask[];
}

const OrderTotals = ({ parts, laborTasks }: OrderTotalsProps) => {
  const calculatePartsCost = () => {
    return parts.reduce((sum, part) => sum + part.total, 0);
  };

  const calculateLaborCost = () => {
    return laborTasks.reduce((sum, task) => sum + task.total, 0);
  };

  const calculateTotalCost = () => {
    return calculatePartsCost() + calculateLaborCost();
  };

  const formatCurrency = (amount: number) => {
    return amount.toFixed(2);
  };

  // Early return if no parts or labor tasks
  if (parts.length === 0 && laborTasks.length === 0) {
    return null;
  }

  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Parts Cost:</span>
            <span>${formatCurrency(calculatePartsCost())}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Labor Cost:</span>
            <span>${formatCurrency(calculateLaborCost())}</span>
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex justify-between items-center font-medium">
            <span>Total Cost:</span>
            <span className="text-lg">${formatCurrency(calculateTotalCost())}</span>
          </div>
          
          {calculateTotalCost() > 1000 && (
            <p className="text-xs text-amber-500 mt-2">
              ⚠️ This work order exceeds $1,000 and may require supervisor approval
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTotals;
