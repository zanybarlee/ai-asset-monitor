
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { LaborTask } from "../work-orders-data";

interface LaborTabProps {
  laborTasks: LaborTask[];
  onAddLabor: () => void;
}

const LaborTab = ({ laborTasks, onAddLabor }: LaborTabProps) => {
  return (
    <div className="space-y-4">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onAddLabor}
        className="ml-auto block"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Labor Time
      </Button>
      
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left text-xs font-medium text-muted-foreground p-2">Description</th>
              <th className="text-left text-xs font-medium text-muted-foreground p-2">Tech</th>
              <th className="text-right text-xs font-medium text-muted-foreground p-2">Hours</th>
              <th className="text-right text-xs font-medium text-muted-foreground p-2">Rate</th>
              <th className="text-right text-xs font-medium text-muted-foreground p-2">Total</th>
              <th className="text-right text-xs font-medium text-muted-foreground p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {laborTasks.map((task) => (
              <tr key={task.id} className="border-t">
                <td className="p-2 text-sm">{task.description}</td>
                <td className="p-2 text-sm">{task.assignedTo}</td>
                <td className="p-2 text-sm text-right">{task.estimatedHours}</td>
                <td className="p-2 text-sm text-right">${task.hourlyRate.toFixed(2)}</td>
                <td className="p-2 text-sm text-right">${task.total.toFixed(2)}</td>
                <td className="p-2 text-right">
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
            {laborTasks.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-muted-foreground">
                  No labor tasks added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LaborTab;
