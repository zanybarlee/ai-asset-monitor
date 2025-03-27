
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface WizardStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const WizardStepIndicator = ({ currentStep, totalSteps }: WizardStepIndicatorProps) => {
  return (
    <div className="w-full flex items-center justify-between mb-6">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index + 1} className="flex items-center">
          <div 
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              index + 1 === currentStep 
                ? "bg-primary text-primary-foreground" 
                : index + 1 < currentStep 
                  ? "bg-primary/20 text-primary" 
                  : "bg-muted text-muted-foreground"
            )}
          >
            {index + 1 < currentStep ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
          </div>
          {index + 1 < totalSteps && (
            <div className={cn(
              "h-1 w-16 sm:w-24 md:w-32",
              index + 1 < currentStep ? "bg-primary/20" : "bg-muted"
            )}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WizardStepIndicator;
