
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search } from "lucide-react";

interface AssetLocationSectionProps {
  assetName: string;
  setAssetName: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  serviceType: string;
  setServiceType: (value: string) => void;
}

const AssetLocationSection = ({
  assetName,
  setAssetName,
  location,
  setLocation,
  serviceType,
  setServiceType
}: AssetLocationSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Asset / Location</h3>
      
      <div className="space-y-2">
        <Label htmlFor="asset-name">Asset Name</Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            id="asset-name" 
            className="pl-8"
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
            placeholder="Search for an asset..." 
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            id="location" 
            className="pl-8"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enterprise Basement Mech Room" 
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Service Type</Label>
        <RadioGroup value={serviceType} onValueChange={setServiceType}>
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="time-based" id="time-based" />
            <Label htmlFor="time-based" className="font-normal cursor-pointer">
              Time Based (Scheduled Maintenance)
            </Label>
          </div>
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="usage-based" id="usage-based" />
            <Label htmlFor="usage-based" className="font-normal cursor-pointer">
              Usage Based (Conditional Based Maintenance)
            </Label>
          </div>
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="both" id="both" />
            <Label htmlFor="both" className="font-normal cursor-pointer">
              Both Time Based (Scheduled Maintenance) & Usage Based (Conditional Based Maintenance)
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default AssetLocationSection;
