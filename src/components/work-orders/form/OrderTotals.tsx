
import { Part, LaborTask } from "../work-orders-data";

interface OrderTotalsProps {
  parts: Part[];
  laborTasks: LaborTask[];
}

const OrderTotals = ({ parts, laborTasks }: OrderTotalsProps) => {
  const calculateTotalCost = () => {
    const partsCost = parts.reduce((sum, part) => sum + part.total, 0);
    const laborCost = laborTasks.reduce((sum, task) => sum + task.total, 0);
    return partsCost + laborCost;
  };

  return (
    <div className="text-right mb-4">
      <p className="text-sm text-muted-foreground">
        Total Cost: <span className="font-medium">${calculateTotalCost().toFixed(2)}</span>
      </p>
    </div>
  );
};

export default OrderTotals;
