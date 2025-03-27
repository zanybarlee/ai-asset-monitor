
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Labor } from "./types";

interface LaborTabProps {
  labor: Labor[];
  setLabor: React.Dispatch<React.SetStateAction<Labor[]>>;
}

const LaborTab = ({ labor, setLabor }: LaborTabProps) => {
  const handleAddLabor = () => {
    const newLabor: Labor = {
      id: `labor-${Date.now()}`,
      description: "Maintenance Work",
      hours: 1,
      rate: 75
    };
    setLabor([...labor, newLabor]);
  };
  
  const handleRemoveLabor = (id: string) => {
    setLabor(labor.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-4 py-4">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleAddLabor}
        className="ml-auto block"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Labor
      </Button>
      
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left text-xs font-medium text-muted-foreground p-2">Description</th>
              <th className="text-right text-xs font-medium text-muted-foreground p-2">Hours</th>
              <th className="text-right text-xs font-medium text-muted-foreground p-2">Hourly Rate</th>
              <th className="text-right text-xs font-medium text-muted-foreground p-2">Total</th>
              <th className="text-right text-xs font-medium text-muted-foreground p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {labor.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2 text-sm">{item.description}</td>
                <td className="p-2 text-sm text-right">{item.hours}</td>
                <td className="p-2 text-sm text-right">${item.rate.toFixed(2)}</td>
                <td className="p-2 text-sm text-right">${(item.hours * item.rate).toFixed(2)}</td>
                <td className="p-2 text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleRemoveLabor(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
            {labor.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-muted-foreground">
                  No labor entries added yet
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
