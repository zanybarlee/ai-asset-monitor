
import { ArrowUpDown, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import AssetStatusBadge from "./AssetStatusBadge";
import AssetHealthIndicator from "./AssetHealthIndicator";
import { AssetType } from "./mockAssetData";

interface AssetListViewProps {
  assets: AssetType[];
  onViewAsset: (asset: AssetType) => void;
  onShowQRCode: (asset: AssetType) => void;
}

const AssetListView = ({ assets, onViewAsset, onShowQRCode }: AssetListViewProps) => {
  return (
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
        {assets.length > 0 ? (
          assets.map((asset) => (
            <div key={asset.id} className="grid grid-cols-7 p-4 text-sm items-center">
              <div className="font-medium">{asset.id}</div>
              <div className="col-span-2 font-medium">{asset.name}</div>
              <div>{asset.type}</div>
              <AssetHealthIndicator health={asset.health} />
              <div><AssetStatusBadge status={asset.status} /></div>
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
  );
};

export default AssetListView;
