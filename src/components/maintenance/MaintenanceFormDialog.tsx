
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

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
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Details</h3>
              
              <div className="space-y-2">
                <Label htmlFor="title">Maintenance Title</Label>
                <Input 
                  id="title" 
                  value={maintenanceTitle}
                  onChange={(e) => setMaintenanceTitle(e.target.value)}
                  placeholder="Rainwater Harvesting System Weekly" 
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="start-date"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="end-date"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="recurrence">Recurrence</Label>
                <div className="flex items-center rounded-md border p-1">
                  <Button 
                    type="button"
                    variant={recurrence === "daily" ? "default" : "ghost"}
                    className="flex-1 text-xs h-8"
                    onClick={() => setRecurrence("daily")}
                  >
                    Daily
                  </Button>
                  <Button 
                    type="button"
                    variant={recurrence === "weekly" ? "default" : "ghost"}
                    className="flex-1 text-xs h-8"
                    onClick={() => setRecurrence("weekly")}
                  >
                    Weekly
                  </Button>
                  <Button 
                    type="button"
                    variant={recurrence === "monthly" ? "default" : "ghost"}
                    className="flex-1 text-xs h-8"
                    onClick={() => setRecurrence("monthly")}
                  >
                    Monthly
                  </Button>
                  <Button 
                    type="button"
                    variant={recurrence === "yearly" ? "default" : "ghost"}
                    className="flex-1 text-xs h-8"
                    onClick={() => setRecurrence("yearly")}
                  >
                    Yearly
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Asset/Location Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Asset / Location</h3>
              
              <div className="space-y-2">
                <Label htmlFor="asset-name">Asset Name</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="asset-name" 
                    className="pl-8"
                    value={assetName}
                    onChange={(e) => setAssetName(e.target.value)}
                    placeholder="Search for an asset..." 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="location" 
                    className="pl-8"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enterprise Basement Mech Room" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Service Type</Label>
                <RadioGroup value={serviceType} onValueChange={setServiceType}>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="time-based" id="time-based" />
                    <Label htmlFor="time-based" className="font-normal cursor-pointer">
                      Time Based (Scheduled Maintenance)
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="usage-based" id="usage-based" />
                    <Label htmlFor="usage-based" className="font-normal cursor-pointer">
                      Usage Based (Conditional Based Maintenance)
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both" className="font-normal cursor-pointer">
                      Both Time Based (Scheduled Maintenance) & Usage Based (Conditional Based Maintenance)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
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
