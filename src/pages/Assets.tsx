
import { useState } from "react";
import { toast } from "sonner";
import { mockAssets, AssetType } from "@/components/assets/mockAssetData";
import AssetMetricsCards from "@/components/assets/AssetMetricsCards";
import AssetsHeader from "@/components/assets/AssetsHeader";
import AssetsContent from "@/components/assets/AssetsContent";
import AssetDialogs from "@/components/assets/AssetDialogs";

const Assets = () => {
  const [assets, setAssets] = useState<AssetType[]>(mockAssets);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedAsset, setSelectedAsset] = useState<AssetType | null>(null);
  const [activeView, setActiveView] = useState("list");
  
  // Dialog states
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
      <AssetsHeader 
        onShowMetrics={() => setShowMetrics(true)}
        onExportAssets={handleExportAssets}
        onShowBulkImport={() => setShowBulkImport(true)}
        onShowCreateAsset={() => setShowCreateAsset(true)}
      />
      
      <AssetMetricsCards assetCount={assets.length} />
      
      <AssetsContent 
        assets={assets}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        activeView={activeView}
        setActiveView={setActiveView}
        onViewAsset={handleViewAsset}
        onShowQRCode={handleShowQRCode}
      />
      
      <AssetDialogs 
        selectedAsset={selectedAsset}
        showAssetDetails={showAssetDetails}
        setShowAssetDetails={setShowAssetDetails}
        showQRCode={showQRCode}
        setShowQRCode={setShowQRCode}
        showBulkImport={showBulkImport}
        setShowBulkImport={setShowBulkImport}
        showMetrics={showMetrics}
        setShowMetrics={setShowMetrics}
        showCreateAsset={showCreateAsset}
        setShowCreateAsset={setShowCreateAsset}
        showCBMSettings={showCBMSettings}
        setShowCBMSettings={setShowCBMSettings}
        showLifecycleStages={showLifecycleStages}
        setShowLifecycleStages={setShowLifecycleStages}
        showMaintenanceTimeline={showMaintenanceTimeline}
        setShowMaintenanceTimeline={setShowMaintenanceTimeline}
        onAssetCreated={handleCreateAsset}
      />
    </div>
  );
};

export default Assets;
