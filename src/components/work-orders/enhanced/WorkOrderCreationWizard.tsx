
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  File, 
  FileInput, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  LocateFixed, 
  Calendar, 
  Wrench, 
  User, 
  AlertTriangle, 
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WorkOrderCreationWizardProps {
  open: boolean;
  onClose: () => void;
}

const WorkOrderCreationWizard = ({ open, onClose }: WorkOrderCreationWizardProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [templateType, setTemplateType] = useState("blank");
  const [workOrderType, setWorkOrderType] = useState("preventive");
  
  const totalSteps = 4;
  
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleSubmit = () => {
    // Submit the form (in a real app, this would save to a database)
    toast({
      title: "Work Order Created",
      description: "The work order has been created successfully.",
    });
    
    onClose();
  };
  
  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Select Template & Type";
      case 2:
        return "Basic Information";
      case 3:
        return "Asset & Location";
      case 4:
        return "Assignment & Schedule";
      default:
        return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Create Work Order - {getStepTitle()}</DialogTitle>
        </DialogHeader>
        
        {/* Progress Indicator */}
        <div className="w-full flex items-center justify-between mb-6">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  stepNumber === step 
                    ? "bg-primary text-primary-foreground" 
                    : stepNumber < step 
                      ? "bg-primary/20 text-primary" 
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {stepNumber < step ? <CheckCircle2 className="h-5 w-5" /> : stepNumber}
              </div>
              {stepNumber < 4 && (
                <div className={`h-1 w-16 sm:w-24 md:w-32 ${
                  stepNumber < step ? "bg-primary/20" : "bg-muted"
                }`}></div>
              )}
            </div>
          ))}
        </div>
        
        {/* Step 1: Select Template & Type */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Work Order Type</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div 
                  className={`cursor-pointer border rounded-md p-4 flex flex-col items-center text-center ${
                    workOrderType === "preventive" ? "bg-primary/10 border-primary" : ""
                  }`}
                  onClick={() => setWorkOrderType("preventive")}
                >
                  <Calendar className="h-8 w-8 mb-2 text-blue-500" />
                  <h4 className="font-medium">Preventive Maintenance</h4>
                  <p className="text-xs text-muted-foreground mt-1">Scheduled, routine maintenance tasks</p>
                </div>
                <div 
                  className={`cursor-pointer border rounded-md p-4 flex flex-col items-center text-center ${
                    workOrderType === "corrective" ? "bg-primary/10 border-primary" : ""
                  }`}
                  onClick={() => setWorkOrderType("corrective")}
                >
                  <Wrench className="h-8 w-8 mb-2 text-amber-500" />
                  <h4 className="font-medium">Corrective Maintenance</h4>
                  <p className="text-xs text-muted-foreground mt-1">Repairs for identified issues</p>
                </div>
                <div 
                  className={`cursor-pointer border rounded-md p-4 flex flex-col items-center text-center ${
                    workOrderType === "emergency" ? "bg-primary/10 border-primary" : ""
                  }`}
                  onClick={() => setWorkOrderType("emergency")}
                >
                  <AlertTriangle className="h-8 w-8 mb-2 text-destructive" />
                  <h4 className="font-medium">Emergency Repair</h4>
                  <p className="text-xs text-muted-foreground mt-1">Urgent fixes for critical issues</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Select Template</Label>
              <Tabs defaultValue="blank" value={templateType} onValueChange={setTemplateType} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="blank">Blank</TabsTrigger>
                  <TabsTrigger value="department">Department</TabsTrigger>
                  <TabsTrigger value="asset">Asset Specific</TabsTrigger>
                </TabsList>
                
                <TabsContent value="blank" className="space-y-4 mt-4">
                  <div className="border rounded-md p-4 bg-muted/30">
                    <h4 className="font-medium mb-2">Blank Template</h4>
                    <p className="text-sm text-muted-foreground">
                      Start with a blank work order form. You'll need to fill in all the details manually.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="department" className="space-y-4 mt-4">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select department template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electrical">Electrical Department</SelectItem>
                      <SelectItem value="mechanical">Mechanical Department</SelectItem>
                      <SelectItem value="plumbing">Plumbing Department</SelectItem>
                      <SelectItem value="hvac">HVAC Department</SelectItem>
                    </SelectContent>
                  </Select>
                </TabsContent>
                
                <TabsContent value="asset" className="space-y-4 mt-4">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select asset template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hvac">HVAC Quarterly Maintenance</SelectItem>
                      <SelectItem value="generator">Generator Monthly Test</SelectItem>
                      <SelectItem value="ups">UPS Battery Inspection</SelectItem>
                      <SelectItem value="electrical">Electrical Panel Inspection</SelectItem>
                    </SelectContent>
                  </Select>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
        
        {/* Step 2: Basic Information */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="e.g., HVAC Quarterly Maintenance" required />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the work to be done in detail..." 
                  rows={3} 
                  required 
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue="mechanical">
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mechanical">Mechanical</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="hvac">HVAC</SelectItem>
                      <SelectItem value="building">Building</SelectItem>
                      <SelectItem value="grounds">Grounds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Custom fields based on template */}
              {templateType !== "blank" && (
                <div className="border rounded-md p-4 space-y-4">
                  <h4 className="font-medium">Template-Specific Information</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="custom1">Procedure Reference</Label>
                      <Input id="custom1" placeholder="e.g., PROC-HVAC-001" />
                    </div>
                    <div>
                      <Label htmlFor="custom2">Safety Requirements</Label>
                      <Select>
                        <SelectTrigger id="safety">
                          <SelectValue placeholder="Select safety requirements" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ppe">PPE Required</SelectItem>
                          <SelectItem value="lockout">Lockout/Tagout</SelectItem>
                          <SelectItem value="permit">Work Permit</SelectItem>
                          <SelectItem value="confined">Confined Space Entry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Step 3: Asset & Location */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="border rounded-md p-4 bg-muted/30">
                <div className="flex items-center mb-4">
                  <LocateFixed className="h-5 w-5 mr-2 text-muted-foreground" />
                  <h4 className="font-medium">Asset Information</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="asset">Asset</Label>
                    <Select>
                      <SelectTrigger id="asset">
                        <SelectValue placeholder="Select asset" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hvac1">HVAC-001 (Server Room A)</SelectItem>
                        <SelectItem value="hvac2">HVAC-002 (Server Room B)</SelectItem>
                        <SelectItem value="ups1">UPS-001 (Power Room)</SelectItem>
                        <SelectItem value="generator">GEN-001 (Basement)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="assetCategory">Asset Category</Label>
                    <Input id="assetCategory" value="HVAC Equipment" readOnly />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label htmlFor="manufacturer">Manufacturer</Label>
                    <Input id="manufacturer" value="Carrier" readOnly />
                  </div>
                  
                  <div>
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" value="CRAC-3000" readOnly />
                  </div>
                  
                  <div>
                    <Label htmlFor="serialNumber">Serial Number</Label>
                    <Input id="serialNumber" value="CR34582937" readOnly />
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4 bg-muted/30">
                <div className="flex items-center mb-4">
                  <Building className="h-5 w-5 mr-2 text-muted-foreground" />
                  <h4 className="font-medium">Location Details</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="building">Building</Label>
                    <Input id="building" value="Main Data Center" readOnly />
                  </div>
                  
                  <div>
                    <Label htmlFor="floor">Floor</Label>
                    <Input id="floor" value="1st Floor" readOnly />
                  </div>
                  
                  <div>
                    <Label htmlFor="room">Room</Label>
                    <Input id="room" value="Server Room A" readOnly />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="attachments">Attachments</Label>
                <div className="border border-dashed rounded-md p-8 mt-2 flex flex-col items-center justify-center text-center">
                  <FileInput className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Drag & drop files here or click to browse</p>
                  <p className="text-xs text-muted-foreground mt-1">Upload asset diagrams, manuals, or reference documents</p>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Select Files
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 4: Assignment & Schedule */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="border rounded-md p-4 bg-muted/30">
                <div className="flex items-center mb-4">
                  <User className="h-5 w-5 mr-2 text-muted-foreground" />
                  <h4 className="font-medium">Assignment</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="assignee">Assign To</Label>
                    <Select>
                      <SelectTrigger id="assignee">
                        <SelectValue placeholder="Select technician" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Smith (HVAC)</SelectItem>
                        <SelectItem value="sarah">Sarah Chen (Electrical)</SelectItem>
                        <SelectItem value="miguel">Miguel Rodriguez (HVAC)</SelectItem>
                        <SelectItem value="jessica">Jessica Williams (General)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="team">Team</Label>
                    <Select>
                      <SelectTrigger id="team">
                        <SelectValue placeholder="Select team" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="facilities">Facilities</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4 bg-muted/30">
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <h4 className="font-medium">Schedule</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  
                  <div>
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input id="dueDate" type="date" />
                  </div>
                  
                  <div>
                    <Label htmlFor="estimatedHours">Estimated Hours</Label>
                    <Input id="estimatedHours" type="number" min="0.5" step="0.5" placeholder="e.g., 2.5" />
                  </div>
                </div>
                
                <div className="mt-4">
                  <Label htmlFor="recurrence">Recurrence</Label>
                  <Select>
                    <SelectTrigger id="recurrence">
                      <SelectValue placeholder="Select recurrence pattern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None (One-time)</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <div className="flex items-center">
                  <Label htmlFor="notifications" className="flex items-center cursor-pointer">
                    <input type="checkbox" id="notifications" className="mr-2" />
                    Send notifications to stakeholders
                  </Label>
                </div>
                
                <div className="flex items-center mt-2">
                  <Label htmlFor="approvalRequired" className="flex items-center cursor-pointer">
                    <input type="checkbox" id="approvalRequired" className="mr-2" />
                    Require supervisor approval upon completion
                  </Label>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <DialogFooter className="flex justify-between mt-6 pt-4 border-t">
          <div>
            {step > 1 && (
              <Button type="button" variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
          </div>
          <Button type="button" onClick={step === totalSteps ? handleSubmit : handleNext}>
            {step === totalSteps ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Create Work Order
              </>
            ) : (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkOrderCreationWizard;
