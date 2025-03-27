
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
import { WorkflowTemplate, ChecklistItem, INPUT_TYPES } from "./workflow-types";
import { Plus, Trash } from "lucide-react";
import WorkflowEditor from "./WorkflowEditor";

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
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [editorView, setEditorView] = useState<'list' | 'flow'>('list');
  
  // New item form state
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemInputType, setNewItemInputType] = useState("");
  const [newItemRequired, setNewItemRequired] = useState(true);
  const [newItemCritical, setNewItemCritical] = useState(false);
  
  const handleSubmit = () => {
    // Create a simple unique ID based on timestamp
    const id = `workflow-${Date.now()}`;
    
    const newWorkflow: Partial<WorkflowTemplate> = {
      id,
      name: workflowName.toUpperCase(),
      status: isActive ? "Active" : "Inactive",
      department,
      description: description || undefined,
      checklist: checklistItems
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
    setChecklistItems([]);
    setCurrentStep(1);
    setEditorView('list');
    resetNewItemForm();
  };
  
  const resetNewItemForm = () => {
    setNewItemDescription("");
    setNewItemInputType("");
    setNewItemRequired(true);
    setNewItemCritical(false);
  };
  
  const addChecklistItem = () => {
    if (!newItemDescription || !newItemInputType) return;
    
    const newItem: ChecklistItem = {
      description: newItemDescription,
      inputType: newItemInputType,
      required: newItemRequired,
      critical: newItemCritical
    };
    
    setChecklistItems([...checklistItems, newItem]);
    resetNewItemForm();
  };
  
  const removeChecklistItem = (index: number) => {
    const updatedItems = [...checklistItems];
    updatedItems.splice(index, 1);
    setChecklistItems(updatedItems);
  };

  const nextStep = () => {
    if (currentStep === 1 && (!workflowName || !department)) return;
    setCurrentStep(2);
  };

  const prevStep = () => {
    setCurrentStep(1);
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
        
        <div className="px-4 py-2 space-y-6 overflow-y-auto max-h-[calc(85vh-200px)]">
          {currentStep === 1 ? (
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
          ) : (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Checklist Items</h3>
              
              <div className="flex space-x-2">
                <Button 
                  variant={editorView === 'list' ? 'default' : 'outline'} 
                  onClick={() => setEditorView('list')}
                  size="sm"
                >
                  List View
                </Button>
                <Button 
                  variant={editorView === 'flow' ? 'default' : 'outline'} 
                  onClick={() => setEditorView('flow')}
                  size="sm"
                >
                  Flow Editor
                </Button>
              </div>
              
              {editorView === 'list' ? (
                <>
                  {checklistItems.length > 0 ? (
                    <div className="space-y-4 mb-6">
                      {checklistItems.map((item, index) => (
                        <div key={index} className="flex items-start justify-between p-3 border rounded-md">
                          <div>
                            <p className="font-medium">{item.description}</p>
                            <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                              <span>Type: {item.inputType}</span>
                              <span>{item.required ? "Required" : "Optional"}</span>
                              <span>{item.critical ? "Critical" : "Non-critical"}</span>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeChecklistItem(index)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-6 border border-dashed rounded-md">
                      <p className="text-muted-foreground">No checklist items added yet</p>
                    </div>
                  )}
                  
                  <div className="space-y-4 p-4 border rounded-md">
                    <h4 className="font-medium">Add New Item</h4>
                    
                    <div>
                      <Label htmlFor="item-description">Description</Label>
                      <Input
                        id="item-description"
                        placeholder="e.g. Check oil level"
                        value={newItemDescription}
                        onChange={(e) => setNewItemDescription(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="input-type">Input Type</Label>
                      <Select value={newItemInputType} onValueChange={setNewItemInputType}>
                        <SelectTrigger id="input-type" className="mt-1">
                          <SelectValue placeholder="Select input type" />
                        </SelectTrigger>
                        <SelectContent>
                          {INPUT_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="required" 
                          checked={newItemRequired} 
                          onCheckedChange={setNewItemRequired} 
                        />
                        <Label htmlFor="required">Required</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="critical" 
                          checked={newItemCritical} 
                          onCheckedChange={setNewItemCritical} 
                        />
                        <Label htmlFor="critical">Critical</Label>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={addChecklistItem}
                      disabled={!newItemDescription || !newItemInputType}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Item
                    </Button>
                  </div>
                </>
              ) : (
                <WorkflowEditor 
                  checklistItems={checklistItems}
                  setChecklistItems={setChecklistItems}
                />
              )}
            </div>
          )}
        </div>
        
        <DrawerFooter>
          {currentStep === 1 ? (
            <Button onClick={nextStep} disabled={!workflowName || !department}>
              Continue to Checklist
            </Button>
          ) : (
            <div className="flex flex-col gap-2">
              <Button onClick={handleSubmit} disabled={checklistItems.length === 0}>
                Create Workflow
              </Button>
              <Button variant="outline" onClick={prevStep}>
                Back to Details
              </Button>
            </div>
          )}
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateWorkflowDrawer;
