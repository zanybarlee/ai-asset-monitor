
import { Dialog } from "@/components/ui/dialog";
import { AssetType } from "./mockAssetData";
import AssetDetails from "./AssetDetails";
import AssetQRCode from "./AssetQRCode";
import BulkImportDialog from "./BulkImportDialog";
import AssetMetricsDialog from "./AssetMetricsDialog";
import CreateAssetDialog from "./CreateAssetDialog";
import AssetCBMThresholds from "./AssetCBMThresholds";
import AssetLifecycleStages from "./AssetLifecycleStages";
import AssetMaintenanceTimeline from "./AssetMaintenanceTimeline";

interface AssetDialogsProps {
  selectedAsset: AssetType | null;
  showAssetDetails: boolean;
  setShowAssetDetails: (show: boolean) => void;
  showQRCode: boolean;
  setShowQRCode: (show: boolean) => void;
  showBulkImport: boolean;
  setShowBulkImport: (show: boolean) => void;
  showMetrics: boolean;
  setShowMetrics: (show: boolean) => void;
  showCreateAsset: boolean;
  setShowCreateAsset: (show: boolean) => void;
  showCBMSettings: boolean;
  setShowCBMSettings: (show: boolean) => void;
  showLifecycleStages: boolean;
  setShowLifecycleStages: (show: boolean) => void;
  showMaintenanceTimeline: boolean;
  setShowMaintenanceTimeline: (show: boolean) => void;
  onAssetCreated: (asset: AssetType) => void;
}

const AssetDialogs = ({
  selectedAsset,
  showAssetDetails,
  setShowAssetDetails,
  showQRCode,
  setShowQRCode,
  showBulkImport,
  setShowBulkImport,
  showMetrics,
  setShowMetrics,
  showCreateAsset,
  setShowCreateAsset,
  showCBMSettings,
  setShowCBMSettings,
  showLifecycleStages,
  setShowLifecycleStages,
  showMaintenanceTimeline,
  setShowMaintenanceTimeline,
  onAssetCreated,
}: AssetDialogsProps) => {
  return (
    <>
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
        <CreateAssetDialog onAssetCreated={onAssetCreated} />
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
    </>
  );
};

export default AssetDialogs;
