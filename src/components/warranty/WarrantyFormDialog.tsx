
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";

interface WarrantyFormDialogProps {
  open: boolean;
  onClose: () => void;
}

const WarrantyFormDialog = ({ open, onClose }: WarrantyFormDialogProps) => {
  const form = useForm({
    defaultValues: {
      assetId: "",
      assetName: "",
      assetType: "",
      startDate: new Date(),
      expirationDate: new Date(),
      coverageType: "Full",
      provider: "",
      providerContact: "",
      notes: ""
    }
  });

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [expirationDate, setExpirationDate] = useState<Date>(new Date());

  const handleSubmit = () => {
    // Process form submission
    toast.success("Warranty registration successful", {
      description: "New warranty has been added to the system."
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Register New Warranty</DialogTitle>
          <DialogDescription>
            Enter warranty details for an asset or component
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assetId">Asset ID</Label>
              <Input id="assetId" placeholder="Enter Asset ID" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assetType">Asset Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="server">Server</SelectItem>
                  <SelectItem value="storage">Storage</SelectItem>
                  <SelectItem value="network">Network</SelectItem>
                  <SelectItem value="power">Power Equipment</SelectItem>
                  <SelectItem value="hvac">HVAC</SelectItem>
                  <SelectItem value="security">Security System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="assetName">Asset Name</Label>
            <Input id="assetName" placeholder="Enter asset name or description" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Warranty Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
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
                    onSelect={(date) => date && setStartDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>Expiration Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !expirationDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {expirationDate ? format(expirationDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={expirationDate}
                    onSelect={(date) => date && setExpirationDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="coverageType">Coverage Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select coverage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full">Full</SelectItem>
                  <SelectItem value="Parts">Parts Only</SelectItem>
                  <SelectItem value="Labor">Labor Only</SelectItem>
                  <SelectItem value="Repair">Repair</SelectItem>
                  <SelectItem value="Replacement">Replacement</SelectItem>
                  <SelectItem value="Service">Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="uploadFiles">Supporting Documents</Label>
              <Input id="uploadFiles" type="file" multiple />
              <p className="text-xs text-muted-foreground">Upload warranty certificates or agreements</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="provider">Warranty Provider</Label>
            <Input id="provider" placeholder="Company or vendor name" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="providerContact">Provider Contact Info</Label>
            <Input id="providerContact" placeholder="Email or phone number" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Any additional information about this warranty" />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>Register Warranty</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WarrantyFormDialog;
