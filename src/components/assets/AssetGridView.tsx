
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import AssetStatusBadge from "./AssetStatusBadge";
import AssetHealthIndicator from "./AssetHealthIndicator";
import { AssetType } from "./mockAssetData";

interface AssetGridViewProps {
  assets: AssetType[];
  onViewAsset: (asset: AssetType) => void;
  onShowQRCode: (asset: AssetType) => void;
}

const AssetGridView = ({ assets, onViewAsset, onShowQRCode }: AssetGridViewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {assets.length > 0 ? (
        assets.map((asset) => (
          <Card key={asset.id} className="overflow-hidden">
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between">
                <div className="font-medium">{asset.name}</div>
                <AssetStatusBadge status={asset.status} />
              </div>
              <div className="text-xs text-muted-foreground">{asset.id}</div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type:</span>
                  <span>{asset.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Location:</span>
                  <span>{asset.location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Health:</span>
                  <AssetHealthIndicator health={asset.health} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Maintenance:</span>
                  <span>{asset.lastMaintenance}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onViewAsset(asset)}
              >
                View Details
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => onShowQRCode(asset)}
              >
                <QrCode className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="col-span-full p-4 text-center text-muted-foreground">
          No assets match the current filters
        </div>
      )}
    </div>
  );
};

export default AssetGridView;
