
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Part } from "./types";

interface PartsTabProps {
  parts: Part[];
  setParts: React.Dispatch<React.SetStateAction<Part[]>>;
}

const PartsTab = ({ parts, setParts }: PartsTabProps) => {
  const handleAddPart = () => {
    const newPart: Part = {
      id: `part-${Date.now()}`,
      name: "Replacement Part",
      quantity: 1,
      cost: 45.99
    };
    setParts([...parts, newPart]);
  };
  
  const handleRemovePart = (id: string) => {
    setParts(parts.filter(part => part.id !== id));
  };

  return (
    <div className="space-y-4 py-4">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleAddPart}
        className="ml-auto block"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Parts
      </Button>
      
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left text-xs font-medium text-muted-foreground p-2">Part Description</th>
              <th className="text-right text-xs font-medium text-muted-foreground p-2">Quantity</th>
              <th className="text-right text-xs font-medium text-muted-foreground p-2">Unit Cost</th>
              <th className="text-right text-xs font-medium text-muted-foreground p-2">Total</th>
              <th className="text-right text-xs font-medium text-muted-foreground p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((part) => (
              <tr key={part.id} className="border-t">
                <td className="p-2 text-sm">{part.name}</td>
                <td className="p-2 text-sm text-right">{part.quantity}</td>
                <td className="p-2 text-sm text-right">${part.cost.toFixed(2)}</td>
                <td className="p-2 text-sm text-right">${(part.quantity * part.cost).toFixed(2)}</td>
                <td className="p-2 text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleRemovePart(part.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
            {parts.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-muted-foreground">
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
