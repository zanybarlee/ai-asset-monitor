
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clipboard, FileDown } from "lucide-react";

interface AssetQRCodeProps {
  assetId: string;
  assetName: string;
}

const AssetQRCode = ({ assetId, assetName }: AssetQRCodeProps) => {
  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Asset QR Code</DialogTitle>
        <DialogDescription>
          Scan for quick access to asset information
        </DialogDescription>
      </DialogHeader>
      
      <div className="flex flex-col items-center justify-center">
        <div className="border border-dashed border-gray-300 p-6 rounded-lg">
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://aramco-cmms.com/assets/${assetId}`}
            alt="Asset QR Code"
            className="w-48 h-48"
          />
        </div>
        <p className="text-center mt-4 text-sm text-muted-foreground">
          {assetId}: {assetName}
        </p>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm">
            <FileDown className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Clipboard className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default AssetQRCode;
