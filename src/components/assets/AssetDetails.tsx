
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileDown, Plus, Tag } from "lucide-react";

type AssetType = {
  id: string;
  name: string;
  type: string;
  status: string;
  health: number;
  lastMaintenance: string;
  nextMaintenance: string;
  location: string;
  mtbf?: string;
  mttr?: string;
  sensors?: string[];
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  installDate?: string;
  warrantyExpiry?: string;
};

interface AssetDetailsProps {
  asset: AssetType;
}

const AssetDetails = ({ asset }: AssetDetailsProps) => {
  const getHealthColor = (health: number) => {
    if (health >= 85) return "text-emerald-500";
    if (health >= 60) return "text-amber-500";
    return "text-destructive";
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Operational":
        return <Badge className="bg-emerald-500">{status}</Badge>;
      case "Warning":
        return <Badge className="bg-amber-500">{status}</Badge>;
      case "Critical":
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>Asset Details</DialogTitle>
        <DialogDescription>
          View and manage complete asset information
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID:</span>
                <span className="font-medium">{asset.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{asset.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span>{asset.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span>{getStatusBadge(asset.status)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Health:</span>
                <span className={getHealthColor(asset.health)}>{asset.health}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span>{asset.location}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Maintenance Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Maintenance:</span>
                <span>{asset.lastMaintenance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next Maintenance:</span>
                <span>{asset.nextMaintenance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">MTBF:</span>
                <span>{asset.mtbf}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">MTTR:</span>
                <span>{asset.mttr}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">IoT Sensors</h3>
            <div className="flex flex-wrap gap-2">
              {asset.sensors && asset.sensors.map((sensor: string) => (
                <Badge key={sensor} variant="outline" className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {sensor}
                </Badge>
              ))}
              <Button variant="outline" size="sm" className="mt-2">
                <Plus className="h-3 w-3 mr-1" />
                Add Sensor
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Technical Specifications</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Manufacturer:</span>
                <span>{asset.manufacturer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Model:</span>
                <span>{asset.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Serial Number:</span>
                <span>{asset.serialNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Install Date:</span>
                <span>{asset.installDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Warranty Expiry:</span>
                <span>{asset.warrantyExpiry}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Documentation</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileDown className="mr-2 h-4 w-4" />
                User Manual
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileDown className="mr-2 h-4 w-4" />
                Maintenance Log
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileDown className="mr-2 h-4 w-4" />
                Warranty Certificate
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <DialogFooter>
        <Button variant="outline">Generate Report</Button>
        <Button>Edit Asset</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AssetDetails;
