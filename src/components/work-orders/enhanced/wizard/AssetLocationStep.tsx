
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileInput, LocateFixed, Plus, Building } from "lucide-react";

const AssetLocationStep = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="border rounded-md p-4 bg-muted/30">
          <div className="flex items-center mb-4">
            <LocateFixed className="h-5 w-5 mr-2 text-muted-foreground" />
            <h4 className="font-medium">Asset Information</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="asset">Asset</Label>
              <Select>
                <SelectTrigger id="asset">
                  <SelectValue placeholder="Select asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hvac1">HVAC-001 (Server Room A)</SelectItem>
                  <SelectItem value="hvac2">HVAC-002 (Server Room B)</SelectItem>
                  <SelectItem value="ups1">UPS-001 (Power Room)</SelectItem>
                  <SelectItem value="generator">GEN-001 (Basement)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="assetCategory">Asset Category</Label>
              <Input id="assetCategory" value="HVAC Equipment" readOnly />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <Label htmlFor="manufacturer">Manufacturer</Label>
              <Input id="manufacturer" value="Carrier" readOnly />
            </div>
            
            <div>
              <Label htmlFor="model">Model</Label>
              <Input id="model" value="CRAC-3000" readOnly />
            </div>
            
            <div>
              <Label htmlFor="serialNumber">Serial Number</Label>
              <Input id="serialNumber" value="CR34582937" readOnly />
            </div>
          </div>
        </div>
        
        <div className="border rounded-md p-4 bg-muted/30">
          <div className="flex items-center mb-4">
            <Building className="h-5 w-5 mr-2 text-muted-foreground" />
            <h4 className="font-medium">Location Details</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="building">Building</Label>
              <Input id="building" value="Main Data Center" readOnly />
            </div>
            
            <div>
              <Label htmlFor="floor">Floor</Label>
              <Input id="floor" value="1st Floor" readOnly />
            </div>
            
            <div>
              <Label htmlFor="room">Room</Label>
              <Input id="room" value="Server Room A" readOnly />
            </div>
          </div>
        </div>
        
        <div>
          <Label htmlFor="attachments">Attachments</Label>
          <div className="border border-dashed rounded-md p-8 mt-2 flex flex-col items-center justify-center text-center">
            <FileInput className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm font-medium">Drag & drop files here or click to browse</p>
            <p className="text-xs text-muted-foreground mt-1">Upload asset diagrams, manuals, or reference documents</p>
            <Button variant="outline" size="sm" className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Select Files
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetLocationStep;
