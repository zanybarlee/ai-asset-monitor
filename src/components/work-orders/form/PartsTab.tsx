
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Trash2, HardDrive } from "lucide-react";
import { dataCenterParts, Part } from "../work-orders-data";

const PartsTab = () => {
  const [selectedParts, setSelectedParts] = useState<Part[]>([]);
  const [newPart, setNewPart] = useState({
    partId: "",
    quantity: 1
  });

  const handleAddPart = () => {
    const selectedPart = dataCenterParts.find(part => part.id === newPart.partId);
    if (!selectedPart) return;

    const partToAdd: Part = {
      ...selectedPart,
      quantity: newPart.quantity,
      total: selectedPart.unitCost * newPart.quantity
    };

    setSelectedParts([...selectedParts, partToAdd]);
    setNewPart({ partId: "", quantity: 1 });
  };

  const handleRemovePart = (partId: string) => {
    setSelectedParts(selectedParts.filter(part => part.id !== partId));
  };

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 p-4 rounded-lg">
        <div className="flex items-center">
          <HardDrive className="h-5 w-5 mr-2 text-muted-foreground" />
          <h3 className="text-sm font-medium">Add Parts</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          <div>
            <Label htmlFor="part">Select Part</Label>
            <Select value={newPart.partId} onValueChange={(value) => setNewPart({...newPart, partId: value})}>
              <SelectTrigger id="part">
                <SelectValue placeholder="Select part" />
              </SelectTrigger>
              <SelectContent>
                {dataCenterParts.map(part => (
                  <SelectItem key={part.id} value={part.id}>
                    {part.name} (#{part.partNumber})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input 
              id="quantity" 
              type="number" 
              min="1" 
              value={newPart.quantity} 
              onChange={(e) => setNewPart({...newPart, quantity: parseInt(e.target.value) || 1})}
            />
          </div>
          
          <div className="flex items-end">
            <Button 
              type="button" 
              onClick={handleAddPart} 
              disabled={!newPart.partId || newPart.quantity < 1}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Part
            </Button>
          </div>
        </div>
      </div>
      
      {selectedParts.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left text-xs font-medium text-muted-foreground p-2">Part Name</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-2">Part #</th>
                <th className="text-right text-xs font-medium text-muted-foreground p-2">Unit Cost</th>
                <th className="text-right text-xs font-medium text-muted-foreground p-2">Qty</th>
                <th className="text-right text-xs font-medium text-muted-foreground p-2">Total</th>
                <th className="text-right text-xs font-medium text-muted-foreground p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedParts.map((part) => (
                <tr key={part.id} className="border-t">
                  <td className="p-2 text-sm">{part.name}</td>
                  <td className="p-2 text-sm">{part.partNumber}</td>
                  <td className="p-2 text-sm text-right">${part.unitCost.toFixed(2)}</td>
                  <td className="p-2 text-sm text-right">{part.quantity}</td>
                  <td className="p-2 text-sm text-right">${part.total.toFixed(2)}</td>
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
              <tr className="border-t bg-muted/50">
                <td colSpan={4} className="p-2 text-sm font-medium text-right">Parts Subtotal:</td>
                <td className="p-2 text-sm font-medium text-right">
                  ${selectedParts.reduce((sum, part) => sum + part.total, 0).toFixed(2)}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center p-8 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground">No parts added yet. Add parts from the list above.</p>
        </div>
      )}

      <PartsTotals parts={selectedParts} />
    </div>
  );
};

// Small component to extract the totals
interface PartsTotalsProps {
  parts: Part[];
}

const PartsTotals = ({ parts }: PartsTotalsProps) => {
  const partsTotal = parts.reduce((sum, part) => sum + part.total, 0);
  
  return (
    <div className="flex justify-end">
      <div className="text-right">
        <p className="text-sm font-medium">Parts Total: <span>${partsTotal.toFixed(2)}</span></p>
      </div>
    </div>
  );
};

export default PartsTab;
export { PartsTotals };
