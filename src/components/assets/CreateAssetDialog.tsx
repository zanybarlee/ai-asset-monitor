
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { AssetType } from "./mockAssetData";

interface CreateAssetDialogProps {
  onAssetCreated: (asset: AssetType) => void;
}

const CreateAssetDialog = ({ onAssetCreated }: CreateAssetDialogProps) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("Server");
  const [location, setLocation] = useState("");
  const [model, setModel] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [serialNumber, setSerialNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !type || !location) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // Create new asset with generated ID and default values
    const newAsset: AssetType = {
      id: `AST-${Math.floor(Math.random() * 10000)}`,
      name,
      type,
      status: "Operational",
      health: 100,
      lastMaintenance: "Never",
      nextMaintenance: "Not scheduled",
      location,
      model,
      manufacturer,
      serialNumber,
      installDate: new Date().toISOString().split('T')[0],
      warrantyExpiry: new Date(new Date().setFullYear(new Date().getFullYear() + 3)).toISOString().split('T')[0],
    };
    
    onAssetCreated(newAsset);
    toast.success("Asset created successfully");
    
    // Reset form
    setName("");
    setType("Server");
    setLocation("");
    setModel("");
    setManufacturer("");
    setSerialNumber("");
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Add New Asset</DialogTitle>
        <DialogDescription>
          Create a new asset in the inventory system
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4 py-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Asset Name <span className="text-destructive">*</span>
            </label>
            <Input 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter asset name"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">
                Asset Type <span className="text-destructive">*</span>
              </label>
              <Select value={type} onValueChange={setType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Server">Server</SelectItem>
                  <SelectItem value="Network">Network Equipment</SelectItem>
                  <SelectItem value="Storage">Storage System</SelectItem>
                  <SelectItem value="Cooling">Cooling System</SelectItem>
                  <SelectItem value="Power">Power System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Location <span className="text-destructive">*</span>
              </label>
              <Input 
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Rack/Room location"
                required
              />
            </div>
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
              placeholder="Device serial number"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button type="submit">Create Asset</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default CreateAssetDialog;
