
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTabs, DialogTabsContent, DialogTabsList, DialogTabsTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Calendar, FileDown, History, Plus, Tag, Wrench, AlertTriangle, Activity, Clock } from "lucide-react";
import { AssetType } from "./mockAssetData";
import AssetMaintenanceHistory from "./AssetMaintenanceHistory";
import AssetSensorReadings from "./AssetSensorReadings";
import AssetLifecycle from "./AssetLifecycle";
import AssetPartsInventory from "./AssetPartsInventory";

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
      case "Under Maintenance":
        return <Badge className="bg-blue-500">Under Maintenance</Badge>;
      case "Decommissioned":
        return <Badge variant="outline" className="text-muted-foreground">Decommissioned</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getLifecycleStageBadge = (stage: string = "Operational") => {
    switch (stage) {
      case "Acquired":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800">Acquired</Badge>;
      case "Installed":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Installed</Badge>;
      case "Operational":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Operational</Badge>;
      case "Under Maintenance":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800">Under Maintenance</Badge>;
      case "Decommissioned":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Decommissioned</Badge>;
      default:
        return <Badge variant="outline">{stage}</Badge>;
    }
  };

  return (
    <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <div className="flex items-center justify-between">
          <div>
            <DialogTitle className="text-xl flex items-center gap-2">
              {asset.id} - {asset.name}
              {asset.status === "Critical" && (
                <AlertTriangle className="h-5 w-5 text-destructive ml-2" />
              )}
            </DialogTitle>
            <DialogDescription>
              {asset.type} • {asset.location} • {getLifecycleStageBadge(asset.lifecycleStage)}
            </DialogDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
              <Activity className="h-3.5 w-3.5" />
              <span className={getHealthColor(asset.health)}>{asset.health}%</span>
            </Badge>
            {getStatusBadge(asset.status)}
          </div>
        </div>
      </DialogHeader>
      
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="sensors">Sensors & Alerts</TabsTrigger>
          <TabsTrigger value="lifecycle">Lifecycle</TabsTrigger>
          <TabsTrigger value="parts">Parts & Inventory</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-6 pt-4">
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
                    <div className="flex items-center gap-2">
                      <span className={getHealthColor(asset.health)}>{asset.health}%</span>
                      <Progress 
                        value={asset.health} 
                        className="h-2 w-20"
                        style={{
                          background: asset.health >= 85 ? 'rgba(16, 185, 129, 0.2)' :
                                    asset.health >= 60 ? 'rgba(245, 158, 11, 0.2)' : 
                                    'rgba(239, 68, 68, 0.2)',
                          color: asset.health >= 85 ? 'rgb(16, 185, 129)' :
                                  asset.health >= 60 ? 'rgb(245, 158, 11)' : 
                                  'rgb(239, 68, 68)'
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span>{asset.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Parent Asset:</span>
                    <span>{asset.parentAsset || "None"}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Performance Metrics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">MTBF:</span>
                    <span>{asset.mtbf || "4,344 hours"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">MTTR:</span>
                    <span>{asset.mttr || "24 hours"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uptime:</span>
                    <span className="text-emerald-500">99.45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Downtime:</span>
                    <span>May 12, 2023 (4.2 hours)</span>
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
                  {(!asset.sensors || asset.sensors.length === 0) && (
                    <span className="text-muted-foreground text-sm">No sensors attached</span>
                  )}
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
                    <span>{asset.manufacturer || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Model:</span>
                    <span>{asset.model || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Serial Number:</span>
                    <span>{asset.serialNumber || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Capacity/Rating:</span>
                    <span>{asset.capacity || "N/A"}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Lifecycle Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Purchase Date:</span>
                    <span>{asset.purchaseDate || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Install Date:</span>
                    <span>{asset.installDate || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Warranty Expiry:</span>
                    <span className={asset.warrantyExpiry && new Date(asset.warrantyExpiry) < new Date() ? "text-destructive" : ""}>
                      {asset.warrantyExpiry || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expected EOL:</span>
                    <span>{asset.expectedEOL || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Maintenance:</span>
                    <span>{asset.lastMaintenance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next Maintenance:</span>
                    <span>{asset.nextMaintenance}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Vendor Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vendor:</span>
                    <span>{asset.vendor || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Support Contract:</span>
                    <span>{asset.supportContract || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contract Expiry:</span>
                    <span>{asset.contractExpiry || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SLA Type:</span>
                    <span>{asset.slaType || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Documentation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Button variant="outline" className="justify-start">
                <FileDown className="mr-2 h-4 w-4" />
                User Manual
              </Button>
              <Button variant="outline" className="justify-start">
                <FileDown className="mr-2 h-4 w-4" />
                Maintenance Log
              </Button>
              <Button variant="outline" className="justify-start">
                <FileDown className="mr-2 h-4 w-4" />
                Warranty Certificate
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="maintenance">
          <AssetMaintenanceHistory assetId={asset.id} />
        </TabsContent>
        
        <TabsContent value="sensors">
          <AssetSensorReadings assetId={asset.id} />
        </TabsContent>
        
        <TabsContent value="lifecycle">
          <AssetLifecycle asset={asset} />
        </TabsContent>
        
        <TabsContent value="parts">
          <AssetPartsInventory assetId={asset.id} />
        </TabsContent>
      </Tabs>
      
      <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
        <div className="flex-1 flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Wrench className="h-4 w-4" />
            Create Work Order
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Schedule Maintenance
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Generate Report</Button>
          <Button>Edit Asset</Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default AssetDetails;
