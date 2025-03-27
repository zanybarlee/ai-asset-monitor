
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
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { Warranty } from "./types";
import { mockWarranties } from "./mock-data";

interface ClaimFormDialogProps {
  open: boolean;
  onClose: () => void;
  preselectedWarrantyId?: string;
}

const ClaimFormDialog = ({ open, onClose, preselectedWarrantyId }: ClaimFormDialogProps) => {
  // Find preselected warranty if available
  const preselectedWarranty = preselectedWarrantyId 
    ? mockWarranties.find(w => w.id === preselectedWarrantyId) 
    : undefined;

  const [selectedWarranty, setSelectedWarranty] = useState<Warranty | undefined>(preselectedWarranty);
  const [issueDate, setIssueDate] = useState<Date>(new Date());
  const [estimatedValue, setEstimatedValue] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleWarrantyChange = (warrantyId: string) => {
    const warranty = mockWarranties.find(w => w.id === warrantyId);
    setSelectedWarranty(warranty);
  };

  const handleSubmit = () => {
    if (!selectedWarranty) {
      toast.error("Please select a warranty");
      return;
    }

    toast.success("Warranty claim submitted", {
      description: "Your claim has been sent to the warranty provider."
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Submit Warranty Claim</DialogTitle>
          <DialogDescription>
            File a claim for warranty-covered repair or replacement
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="warrantySelect">Select Warranty</Label>
            <Select 
              value={selectedWarranty?.id} 
              onValueChange={handleWarrantyChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a warranty" />
              </SelectTrigger>
              <SelectContent>
                {mockWarranties
                  .filter(w => w.status !== 'Expired')
                  .map(warranty => (
                    <SelectItem key={warranty.id} value={warranty.id}>
                      {warranty.assetName} - {warranty.coverageType}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          
          {selectedWarranty && (
            <div className="bg-muted p-3 rounded-md text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Coverage Type:</span>
                <span>{selectedWarranty.coverageType}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-medium">Provider:</span>
                <span>{selectedWarranty.provider}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-medium">Expiration:</span>
                <span>{new Date(selectedWarranty.expirationDate).toLocaleDateString()}</span>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label>Issue Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !issueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {issueDate ? format(issueDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={issueDate}
                  onSelect={(date) => date && setIssueDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Issue Description</Label>
            <Textarea 
              id="description" 
              placeholder="Describe the issue in detail (required for claim processing)" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="claimValue">Estimated Value</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5">$</span>
                <Input 
                  id="claimValue" 
                  placeholder="0.00" 
                  className="pl-7"
                  value={estimatedValue}
                  onChange={(e) => setEstimatedValue(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="uploadEvidence">Supporting Evidence</Label>
              <Input id="uploadEvidence" type="file" multiple />
              <p className="text-xs text-muted-foreground">Upload photos, diagnostics, etc.</p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={!selectedWarranty || !description}
          >
            Submit Claim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimFormDialog;
