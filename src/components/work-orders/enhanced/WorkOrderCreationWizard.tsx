
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Import wizard subcomponents
import WizardStepIndicator from "./wizard/WizardStepIndicator";
import WorkOrderTypeSelector from "./wizard/WorkOrderTypeSelector";
import TemplateSelector from "./wizard/TemplateSelector";
import BasicInfoStep from "./wizard/BasicInfoStep";
import AssetLocationStep from "./wizard/AssetLocationStep";
import AssignmentScheduleStep from "./wizard/AssignmentScheduleStep";
import WizardFooter from "./wizard/WizardFooter";

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
        <WizardStepIndicator currentStep={step} totalSteps={totalSteps} />
        
        {/* Step 1: Select Template & Type */}
        {step === 1 && (
          <div className="space-y-6">
            <WorkOrderTypeSelector 
              workOrderType={workOrderType} 
              setWorkOrderType={setWorkOrderType} 
            />
            
            <TemplateSelector 
              templateType={templateType} 
              setTemplateType={setTemplateType} 
            />
          </div>
        )}
        
        {/* Step 2: Basic Information */}
        {step === 2 && (
          <BasicInfoStep templateType={templateType} />
        )}
        
        {/* Step 3: Asset & Location */}
        {step === 3 && (
          <AssetLocationStep />
        )}
        
        {/* Step 4: Assignment & Schedule */}
        {step === 4 && (
          <AssignmentScheduleStep />
        )}
        
        <WizardFooter 
          step={step}
          totalSteps={totalSteps}
          onBack={handleBack}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default WorkOrderCreationWizard;
