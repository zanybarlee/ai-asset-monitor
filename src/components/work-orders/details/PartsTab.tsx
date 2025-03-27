
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Part } from "../work-orders-data";

interface PartsTabProps {
  parts: Part[];
  onAddPart: () => void;
}

const PartsTab = ({ parts, onAddPart }: PartsTabProps) => {
  return (
    <div className="space-y-4">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onAddPart}
        className="ml-auto block"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Parts
      </Button>
      
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left text-xs font-medium text-muted-foreground p-2">Part Name</th>
              <th className="text-left text-xs font-medium text-muted-foreground p-2">Part #</th>
              <th className="text-right text-xs font-medium text-muted-foreground p-2">Cost</th>
              <th className="text-right text-xs font-medium text-muted-foreground p-2">Qty</th>
              <th className="text-right text-xs font-medium text-muted-foreground p-2">Total</th>
              <th className="text-right text-xs font-medium text-muted-foreground p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((part) => (
              <tr key={part.id} className="border-t">
                <td className="p-2 text-sm">{part.name}</td>
                <td className="p-2 text-sm">{part.partNumber}</td>
                <td className="p-2 text-sm text-right">${part.unitCost.toFixed(2)}</td>
                <td className="p-2 text-sm text-right">{part.quantity}</td>
                <td className="p-2 text-sm text-right">${part.total.toFixed(2)}</td>
                <td className="p-2 text-right">
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
            {parts.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-muted-foreground">
                  No parts added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PartsTab;
