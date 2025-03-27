
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { WorkflowTemplate } from "./workflow-types";

interface CreateWorkflowDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateWorkflow: (workflow: Partial<WorkflowTemplate>) => void;
}

const CreateWorkflowDrawer = ({ 
  isOpen, 
  onOpenChange, 
  onCreateWorkflow 
}: CreateWorkflowDrawerProps) => {
  const [workflowName, setWorkflowName] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  
  const handleSubmit = () => {
    // Create a simple unique ID based on timestamp
    const id = `workflow-${Date.now()}`;
    
    const newWorkflow: Partial<WorkflowTemplate> = {
      id,
      name: workflowName.toUpperCase(),
      status: isActive ? "Active" : "Inactive",
      department,
      checklist: []
    };
    
    onCreateWorkflow(newWorkflow);
    resetForm();
    onOpenChange(false);
  };
  
  const resetForm = () => {
    setWorkflowName("");
    setDepartment("");
    setDescription("");
    setIsActive(true);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>Create New Workflow</DrawerTitle>
          <DrawerDescription>
            Create a new workflow checklist for your maintenance or work orders.
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="px-4 py-2 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="workflow-name">Workflow Name</Label>
              <Input
                id="workflow-name"
                placeholder="e.g. DAILY SAFETY INSPECTION"
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="department">Department</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger id="department" className="mt-1">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Electrical">Electrical</SelectItem>
                  <SelectItem value="HVAC">HVAC</SelectItem>
                  <SelectItem value="Plumbing">Plumbing</SelectItem>
                  <SelectItem value="Safety">Safety</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Describe the purpose of this workflow..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="active-status" 
                checked={isActive} 
                onCheckedChange={setIsActive} 
              />
              <Label htmlFor="active-status">Active</Label>
            </div>
          </div>
        </div>
        
        <DrawerFooter>
          <Button onClick={handleSubmit} disabled={!workflowName || !department}>
            Create Workflow
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateWorkflowDrawer;
