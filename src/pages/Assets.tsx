
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { BookOpen, FileDown, Plus, Upload } from "lucide-react";
import { mockAssets, AssetType } from "@/components/assets/mockAssetData";

import AssetMetricsCards from "@/components/assets/AssetMetricsCards";
import AssetFilters from "@/components/assets/AssetFilters";
import AssetsList from "@/components/assets/AssetsList";
import AssetDetails from "@/components/assets/AssetDetails";
import AssetQRCode from "@/components/assets/AssetQRCode";
import BulkImportDialog from "@/components/assets/BulkImportDialog";
import AssetMetricsDialog from "@/components/assets/AssetMetricsDialog";

const Assets = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedAsset, setSelectedAsset] = useState<AssetType | null>(null);
  const [showAssetDetails, setShowAssetDetails] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  
  const handleViewAsset = (asset: AssetType) => {
    setSelectedAsset(asset);
    setShowAssetDetails(true);
  };
  
  const handleShowQRCode = (asset: AssetType) => {
    setSelectedAsset(asset);
    setShowQRCode(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Asset Management</h2>
          <p className="text-muted-foreground">
            Monitor and manage all data center equipment
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowMetrics(true)}>
            <BookOpen className="mr-2 h-4 w-4" />
            Metrics
          </Button>
          <Button variant="outline" size="sm">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowBulkImport(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Bulk Import
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Asset
          </Button>
        </div>
      </div>
      
      <AssetMetricsCards assetCount={mockAssets.length} />
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/4">
          <AssetFilters 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery} 
          />
        </div>
        
        <div className="md:w-3/4">
          <AssetsList 
            assets={mockAssets}
            searchQuery={searchQuery}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            onViewAsset={handleViewAsset}
            onShowQRCode={handleShowQRCode}
          />
        </div>
      </div>
      
      <Dialog open={showAssetDetails} onOpenChange={setShowAssetDetails}>
        {selectedAsset && <AssetDetails asset={selectedAsset} />}
      </Dialog>
      
      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
        {selectedAsset && <AssetQRCode assetId={selectedAsset.id} assetName={selectedAsset.name} />}
      </Dialog>
      
      <Dialog open={showBulkImport} onOpenChange={setShowBulkImport}>
        <BulkImportDialog />
      </Dialog>
      
      <Dialog open={showMetrics} onOpenChange={setShowMetrics}>
        <AssetMetricsDialog />
      </Dialog>
    </div>
  );
};

export default Assets;
