
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertType } from "@/components/subsystems-monitoring/ActiveAlertsCard";
import { technicians } from "./work-orders-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface AlertToWorkOrderDialogProps {
  alert: AlertType;
  open: boolean;
  onClose: () => void;
}

const AlertToWorkOrderDialog = ({ alert, open, onClose }: AlertToWorkOrderDialogProps) => {
  const { toast } = useToast();
  const [assignee, setAssignee] = useState("");
  const [notes, setNotes] = useState("");
  
  // Auto-generate work order description from alert
  const getAutoDescription = () => {
    return `Work order generated from ${alert.source} alert (${alert.id}). 
Alert message: ${alert.message}
Priority: ${alert.severity === "High" ? "Critical" : alert.severity}
Generated automatically at ${new Date().toLocaleString()}`;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would create the work order in the database
    toast({
      title: "Work Order Created",
      description: `Work order has been created from alert ${alert.id} and assigned to ${
        technicians.find(t => t.id === assignee)?.name || "the selected technician"
      }.`,
    });
    
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Work Order from Alert</DialogTitle>
          <DialogDescription>
            Convert alert #{alert.id} to a new work order and assign it to a technician.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="alert-details">Alert Details</Label>
            <div className="p-3 bg-muted/50 rounded text-sm space-y-1">
              <p><span className="font-medium">Source:</span> {alert.source}</p>
              <p><span className="font-medium">Severity:</span> {alert.severity}</p>
              <p><span className="font-medium">Message:</span> {alert.message}</p>
              <p><span className="font-medium">Time:</span> {alert.timestamp}</p>
            </div>
          </div>
          
          <div>
            <Label htmlFor="assignee">Assign To</Label>
            <Select value={assignee} onValueChange={setAssignee}>
              <SelectTrigger id="assignee">
                <SelectValue placeholder="Select technician" />
              </SelectTrigger>
              <SelectContent>
                {technicians
                  .filter(tech => tech.available)
                  .map(tech => (
                    <SelectItem key={tech.id} value={tech.id}>
                      {tech.name} - {tech.specialty}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea 
              id="notes" 
              placeholder="Add any additional information for the technician" 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          
          <p className="text-xs text-muted-foreground">
            A work order will be created with {alert.severity === "High" ? "Critical" : alert.severity} priority
            and automatically populated with the alert information.
          </p>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={!assignee}>Create Work Order</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AlertToWorkOrderDialog;
