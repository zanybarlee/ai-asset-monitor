
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clipboard, FileDown, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LocationQRCodeProps {
  locationId: string;
  locationName: string;
}

const LocationQRCode = ({ locationId, locationName }: LocationQRCodeProps) => {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://aramco-cmms.com/locations/${locationId}`);
    toast({
      title: "Link copied",
      description: "Location link copied to clipboard",
    });
  };

  const handleDownload = () => {
    toast({
      title: "QR Code downloaded",
      description: "The QR code has been downloaded",
    });
  };

  const handlePrint = () => {
    toast({
      title: "Print requested",
      description: "The QR code has been sent to print",
    });
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Location QR Code</DialogTitle>
        <DialogDescription>
          Scan for quick access to location information
        </DialogDescription>
      </DialogHeader>
      
      <div className="flex flex-col items-center justify-center">
        <div className="border border-dashed border-gray-300 p-6 rounded-lg">
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://aramco-cmms.com/locations/${locationId}`}
            alt="Location QR Code"
            className="w-48 h-48"
          />
        </div>
        <p className="text-center mt-4 text-sm text-muted-foreground">
          Location: {locationName}
        </p>
        <div className="grid grid-cols-3 gap-2 mt-4 w-full">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Clipboard className="mr-2 h-4 w-4" />
            Copy Link
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <FileDown className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default LocationQRCode;
