
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowUpDown, QrCode } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

interface AssetsListProps {
  assets: AssetType[];
  searchQuery: string;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  onViewAsset: (asset: AssetType) => void;
  onShowQRCode: (asset: AssetType) => void;
  activeView: string; // Add this prop to fix the type error
}

const AssetsList = ({ 
  assets, 
  searchQuery, 
  selectedTab, 
  setSelectedTab,
  onViewAsset,
  onShowQRCode,
  activeView // Include this in function parameters
}: AssetsListProps) => {
  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          asset.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "critical") return matchesSearch && asset.status === "Critical";
    if (selectedTab === "warning") return matchesSearch && asset.status === "Warning";
    if (selectedTab === "operational") return matchesSearch && asset.status === "Operational";
    
    return matchesSearch;
  });

  const criticalCount = assets.filter(a => a.status === "Critical").length;
  const warningCount = assets.filter(a => a.status === "Warning").length;
  const operationalCount = assets.filter(a => a.status === "Operational").length;
  
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
    <Card className="glass">
      <CardHeader className="pb-2">
        <Tabs 
          defaultValue="all" 
          className="w-full"
          onValueChange={setSelectedTab}
          value={selectedTab}
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All 
              <Badge variant="outline" className="ml-2">{assets.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="operational">
              Operational
              <Badge variant="outline" className="ml-2">{operationalCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="warning">
              Warning
              <Badge variant="outline" className="ml-2">{warningCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="critical">
              Critical
              <Badge variant="outline" className="ml-2">{criticalCount}</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-7 bg-muted/50 p-4 text-sm font-medium">
            <div className="flex items-center gap-2">
              ID <ArrowUpDown className="h-3 w-3" />
            </div>
            <div className="col-span-2 flex items-center gap-2">
              Asset Name <ArrowUpDown className="h-3 w-3" />
            </div>
            <div>Type</div>
            <div>Health</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          
          <div className="divide-y">
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset) => (
                <div key={asset.id} className="grid grid-cols-7 p-4 text-sm items-center">
                  <div className="font-medium">{asset.id}</div>
                  <div className="col-span-2 font-medium">{asset.name}</div>
                  <div>{asset.type}</div>
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
                  <div>{getStatusBadge(asset.status)}</div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onViewAsset(asset)}
                    >
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => onShowQRCode(asset)}
                    >
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No assets match the current filters
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredAssets.length} of {assets.length} assets
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AssetsList;
