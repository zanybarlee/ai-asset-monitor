
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import BasicDetailsSection from "./form/BasicDetailsSection";
import AssetLocationSection from "./form/AssetLocationSection";

interface MaintenanceFormDialogProps {
  open: boolean;
  onClose: () => void;
}

const MaintenanceFormDialog = ({ open, onClose }: MaintenanceFormDialogProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [maintenanceTitle, setMaintenanceTitle] = useState("");
  const [serviceType, setServiceType] = useState("time-based");
  const [recurrence, setRecurrence] = useState("daily");
  const [assetName, setAssetName] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Maintenance schedule created successfully");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Schedule Maintenance</DialogTitle>
          <DialogDescription>
            Create a new scheduled maintenance task for an asset
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Details Section */}
            <BasicDetailsSection
              maintenanceTitle={maintenanceTitle}
              setMaintenanceTitle={setMaintenanceTitle}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              recurrence={recurrence}
              setRecurrence={setRecurrence}
            />
            
            {/* Asset/Location Section */}
            <AssetLocationSection
              assetName={assetName}
              setAssetName={setAssetName}
              location={location}
              setLocation={setLocation}
              serviceType={serviceType}
              setServiceType={setServiceType}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Schedule</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MaintenanceFormDialog;
