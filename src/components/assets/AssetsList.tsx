
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssetType } from "./mockAssetData";
import AssetListView from "./AssetListView";
import AssetGridView from "./AssetGridView";
import AssetTreePlaceholder from "./AssetTreePlaceholder";

interface AssetsListProps {
  assets: AssetType[];
  searchQuery: string;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  onViewAsset: (asset: AssetType) => void;
  onShowQRCode: (asset: AssetType) => void;
  activeView: string;
}

const AssetsList = ({ 
  assets, 
  searchQuery, 
  selectedTab, 
  setSelectedTab,
  onViewAsset,
  onShowQRCode,
  activeView
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
  
  // Render different views based on activeView prop
  const renderAssetView = () => {
    switch (activeView) {
      case "list":
        return <AssetListView 
                 assets={filteredAssets} 
                 onViewAsset={onViewAsset} 
                 onShowQRCode={onShowQRCode} 
               />;
      case "grid":
        return <AssetGridView 
                 assets={filteredAssets} 
                 onViewAsset={onViewAsset} 
                 onShowQRCode={onShowQRCode} 
               />;
      case "tree":
        return <AssetTreePlaceholder />;
      default:
        return <AssetListView 
                 assets={filteredAssets} 
                 onViewAsset={onViewAsset} 
                 onShowQRCode={onShowQRCode} 
               />;
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
          
          <div className="mt-2">
            {renderAssetView()}
          </div>
        </Tabs>
      </CardHeader>
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
