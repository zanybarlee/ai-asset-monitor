
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Building, LocateFixed, CalendarClock } from "lucide-react";

interface ChecklistItem {
  id: number;
  description: string;
  completed: boolean;
}

interface MaintenanceTask {
  id: string;
  title: string;
  location: string;
  asset: string;
  dueDate: string;
  [key: string]: any;
}

interface MaintenanceChecklistProps {
  open: boolean;
  onClose: () => void;
  task: MaintenanceTask;
}

const MaintenanceChecklist = ({ open, onClose, task }: MaintenanceChecklistProps) => {
  // Mock checklist items based on the task title
  const generateChecklistItems = () => {
    if (task.title.includes("HVAC")) {
      return [
        { id: 1, description: "Check HVAC temperature settings (68-75°F)", completed: false },
        { id: 2, description: "Inspect air filters for dust and debris", completed: false },
        { id: 3, description: "Verify proper airflow from all vents", completed: false },
        { id: 4, description: "Check condensate drain for clogs", completed: false },
        { id: 5, description: "Inspect ductwork for leaks or damage", completed: false },
        { id: 6, description: "Test thermostat functions", completed: false },
      ];
    } else if (task.title.includes("UPS")) {
      return [
        { id: 1, description: "Check battery voltage levels", completed: false },
        { id: 2, description: "Inspect battery terminals for corrosion", completed: false },
        { id: 3, description: "Test load transfer capability", completed: false },
        { id: 4, description: "Verify cooling fans are operational", completed: false },
        { id: 5, description: "Record input/output voltages", completed: false },
      ];
    } else if (task.title.includes("WATER")) {
      return [
        { id: 1, description: "Check for any leakage around the pump seals", completed: false },
        { id: 2, description: "Inspect electrical connections for tightness", completed: false },
        { id: 3, description: "Verify pump mounts are secure", completed: false },
        { id: 4, description: "Test alarm system functionality", completed: false },
        { id: 5, description: "Confirm adequate drainage of the pump room", completed: false },
        { id: 6, description: "Check water level sensors", completed: false },
      ];
    } else {
      return [
        { id: 1, description: "Perform visual inspection", completed: false },
        { id: 2, description: "Check for unusual noises or vibrations", completed: false },
        { id: 3, description: "Verify proper operation", completed: false },
        { id: 4, description: "Document any issues found", completed: false },
      ];
    }
  };

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(generateChecklistItems());
  const [notes, setNotes] = useState("");
  
  const toggleItem = (id: number) => {
    setChecklistItems(
      checklistItems.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };
  
  const allCompleted = checklistItems.every(item => item.completed);
  
  const handleSubmit = () => {
    if (!allCompleted) {
      toast.error("Please complete all checklist items before submitting");
      return;
    }
    
    toast.success("Maintenance checklist submitted successfully");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm pb-4 border-b">
            <div className="flex items-center">
              <Building className="mr-1 h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground mr-4">Location: {task.location}</span>
            </div>
            <div className="flex items-center">
              <LocateFixed className="mr-1 h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground mr-4">Asset: {task.asset}</span>
            </div>
            <div className="flex items-center">
              <CalendarClock className="mr-1 h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Due: {task.dueDate}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Maintenance Checklist</h3>
            <div className="space-y-4">
              {checklistItems.map(item => (
                <div key={item.id} className="flex items-start space-x-2">
                  <Checkbox 
                    id={`item-${item.id}`} 
                    checked={item.completed} 
                    onCheckedChange={() => toggleItem(item.id)}
                  />
                  <Label 
                    htmlFor={`item-${item.id}`} 
                    className={`font-normal leading-tight ${item.completed ? 'line-through text-muted-foreground' : ''}`}
                  >
                    {item.description}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes or Observations</Label>
            <Textarea 
              id="notes" 
              placeholder="Enter any additional observations or issues found..." 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>
          
          {allCompleted && (
            <div className="rounded-md bg-green-50 p-4 text-sm flex items-center">
              <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-700">All checklist items have been completed!</span>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Save for Later
          </Button>
          <Button 
            type="button" 
            onClick={handleSubmit}
          >
            Submit Checklist
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MaintenanceChecklist;
