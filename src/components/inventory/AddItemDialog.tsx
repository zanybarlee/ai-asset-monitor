
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface AddItemDialogProps {
  onItemAdded: (item: InventoryItem) => void;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  location: string;
  status: 'Available' | 'Deployed' | 'Maintenance';
  serialNumber?: string;
  model?: string;
  manufacturer?: string;
  purchaseDate?: string;
  warranty?: string;
}

const AddItemDialog = ({ onItemAdded }: AddItemDialogProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<'Available' | 'Deployed' | 'Maintenance'>('Available');
  const [serialNumber, setSerialNumber] = useState("");
  const [model, setModel] = useState("");
  const [manufacturer, setManufacturer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !category || !location) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const newItem: InventoryItem = {
      id: `INV-${Math.floor(Math.random() * 10000)}`,
      name,
      category,
      location,
      status,
      serialNumber,
      model,
      manufacturer,
      purchaseDate: new Date().toISOString().split('T')[0],
      warranty: new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString().split('T')[0]
    };
    
    onItemAdded(newItem);
    toast.success("Item added to inventory");
    
    // Reset form
    setName("");
    setCategory("");
    setLocation("");
    setStatus('Available');
    setSerialNumber("");
    setModel("");
    setManufacturer("");
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogDescription>
          Add a new hardware item to your inventory
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4 py-2">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Item Name <span className="text-destructive">*</span>
            </label>
            <Input 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter item name"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category <span className="text-destructive">*</span>
              </label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Server">Server</SelectItem>
                  <SelectItem value="Storage">Storage</SelectItem>
                  <SelectItem value="Network">Network</SelectItem>
                  <SelectItem value="Computing">Computing</SelectItem>
                  <SelectItem value="Peripherals">Peripherals</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status <span className="text-destructive">*</span>
              </label>
              <Select value={status} onValueChange={(value: 'Available' | 'Deployed' | 'Maintenance') => setStatus(value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Deployed">Deployed</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Location <span className="text-destructive">*</span>
            </label>
            <Input 
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Rack, Room, or Storage location"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="manufacturer" className="text-sm font-medium">
                Manufacturer
              </label>
              <Input 
                id="manufacturer"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
                placeholder="Manufacturer name"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="model" className="text-sm font-medium">
                Model
              </label>
              <Input 
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Model number"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="serialNumber" className="text-sm font-medium">
              Serial Number
            </label>
            <Input 
              id="serialNumber"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              placeholder="Serial number"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button type="submit">Add to Inventory</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default AddItemDialog;
