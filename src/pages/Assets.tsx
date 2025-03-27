
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileDown, Plus, Upload, QrCode, Wrench, Thermometer, BarChart, ClipboardList } from "lucide-react";
import { mockAssets, AssetType } from "@/components/assets/mockAssetData";

import AssetMetricsCards from "@/components/assets/AssetMetricsCards";
import AssetFilters from "@/components/assets/AssetFilters";
import AssetsList from "@/components/assets/AssetsList";
import AssetDetails from "@/components/assets/AssetDetails";
import AssetQRCode from "@/components/assets/AssetQRCode";
import BulkImportDialog from "@/components/assets/BulkImportDialog";
import AssetMetricsDialog from "@/components/assets/AssetMetricsDialog";
import CreateAssetDialog from "@/components/assets/CreateAssetDialog";
import AssetLifecycleStages from "@/components/assets/AssetLifecycleStages";
import AssetCBMThresholds from "@/components/assets/AssetCBMThresholds";
import AssetMaintenanceTimeline from "@/components/assets/AssetMaintenanceTimeline";
import { toast } from "sonner";

const Assets = () => {
  const [assets, setAssets] = useState<AssetType[]>(mockAssets);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedAsset, setSelectedAsset] = useState<AssetType | null>(null);
  const [activeView, setActiveView] = useState("list");
  const [showAssetDetails, setShowAssetDetails] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [showCreateAsset, setShowCreateAsset] = useState(false);
  const [showCBMSettings, setShowCBMSettings] = useState(false);
  const [showLifecycleStages, setShowLifecycleStages] = useState(false);
  const [showMaintenanceTimeline, setShowMaintenanceTimeline] = useState(false);
  
  const handleViewAsset = (asset: AssetType) => {
    setSelectedAsset(asset);
    setShowAssetDetails(true);
  };
  
  const handleShowQRCode = (asset: AssetType) => {
    setSelectedAsset(asset);
    setShowQRCode(true);
  };

  const handleCreateAsset = (newAsset: AssetType) => {
    setAssets([newAsset, ...assets]);
    setShowCreateAsset(false);
    toast.success("Asset created successfully");
  };

  const handleExportAssets = () => {
    // Create CSV data
    const headers = ["ID", "Name", "Type", "Status", "Health", "Location", "Last Maintenance", "Next Maintenance"];
    
    const csvContent = [
      headers.join(","),
      ...assets.map(asset => [
        asset.id,
        asset.name.replace(/,/g, ";"), // Replace commas with semicolons to avoid CSV parsing issues
        asset.type,
        asset.status,
        asset.health,
        asset.location.replace(/,/g, ";"),
        asset.lastMaintenance,
        asset.nextMaintenance
      ].join(","))
    ].join("\n");
    
    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `assets_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Assets exported successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Asset Management</h2>
          <p className="text-muted-foreground">
            Track, monitor, and manage data center equipment
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowMetrics(true)}>
            <BookOpen className="mr-2 h-4 w-4" />
            Metrics
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportAssets}>
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowBulkImport(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Bulk Import
          </Button>
          <Button size="sm" onClick={() => setShowCreateAsset(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Asset
          </Button>
        </div>
      </div>
      
      <AssetMetricsCards assetCount={assets.length} />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Asset Management</CardTitle>
            <CardDescription>Filter and find assets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AssetFilters 
              searchQuery={searchQuery} 
              onSearchChange={setSearchQuery} 
            />
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium mb-1">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-2">
                <Button variant="outline" size="sm" className="justify-start" onClick={() => setShowLifecycleStages(true)}>
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Lifecycle Stages
                </Button>
                <Button variant="outline" size="sm" className="justify-start" onClick={() => setShowCBMSettings(true)}>
                  <Thermometer className="mr-2 h-4 w-4" />
                  CBM Thresholds
                </Button>
                <Button variant="outline" size="sm" className="justify-start" onClick={() => setShowMaintenanceTimeline(true)}>
                  <BarChart className="mr-2 h-4 w-4" />
                  Maintenance Timeline
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Wrench className="mr-2 h-4 w-4" />
                  Maintenance Schedule
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium mb-1">View Options</h3>
              <Tabs defaultValue="list" value={activeView} onValueChange={setActiveView} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="list">List</TabsTrigger>
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="tree">Tree</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>
        
        <div className="md:col-span-3">
          <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
            <TabsContent value="all">
              <AssetsList 
                assets={assets}
                searchQuery={searchQuery}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                onViewAsset={handleViewAsset}
                onShowQRCode={handleShowQRCode}
              />
            </TabsContent>
            
            <TabsContent value="operational">
              <AssetsList 
                assets={assets}
                searchQuery={searchQuery}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                onViewAsset={handleViewAsset}
                onShowQRCode={handleShowQRCode}
              />
            </TabsContent>
            
            <TabsContent value="warning">
              <AssetsList 
                assets={assets}
                searchQuery={searchQuery}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                onViewAsset={handleViewAsset}
                onShowQRCode={handleShowQRCode}
              />
            </TabsContent>
            
            <TabsContent value="critical">
              <AssetsList 
                assets={assets}
                searchQuery={searchQuery}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                onViewAsset={handleViewAsset}
                onShowQRCode={handleShowQRCode}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Asset Details Dialog */}
      <Dialog open={showAssetDetails} onOpenChange={setShowAssetDetails}>
        {selectedAsset && <AssetDetails asset={selectedAsset} />}
      </Dialog>
      
      {/* QR Code Dialog */}
      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
        {selectedAsset && <AssetQRCode assetId={selectedAsset.id} assetName={selectedAsset.name} />}
      </Dialog>
      
      {/* Bulk Import Dialog */}
      <Dialog open={showBulkImport} onOpenChange={setShowBulkImport}>
        <BulkImportDialog />
      </Dialog>
      
      {/* Metrics Dialog */}
      <Dialog open={showMetrics} onOpenChange={setShowMetrics}>
        <AssetMetricsDialog />
      </Dialog>
      
      {/* Create Asset Dialog */}
      <Dialog open={showCreateAsset} onOpenChange={setShowCreateAsset}>
        <CreateAssetDialog onAssetCreated={handleCreateAsset} />
      </Dialog>
      
      {/* CBM Thresholds Dialog */}
      <Dialog open={showCBMSettings} onOpenChange={setShowCBMSettings}>
        <AssetCBMThresholds />
      </Dialog>
      
      {/* Lifecycle Stages Dialog */}
      <Dialog open={showLifecycleStages} onOpenChange={setShowLifecycleStages}>
        <AssetLifecycleStages />
      </Dialog>
      
      {/* Maintenance Timeline Dialog */}
      <Dialog open={showMaintenanceTimeline} onOpenChange={setShowMaintenanceTimeline}>
        <AssetMaintenanceTimeline />
      </Dialog>
    </div>
  );
};

export default Assets;
