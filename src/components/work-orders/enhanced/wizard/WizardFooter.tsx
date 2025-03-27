
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

interface WizardFooterProps {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const WizardFooter = ({ step, totalSteps, onBack, onNext, onSubmit }: WizardFooterProps) => {
  return (
    <div className="flex justify-between mt-6 pt-4 border-t">
      <div>
        {step > 1 && (
          <Button type="button" variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
      </div>
      <Button type="button" onClick={step === totalSteps ? onSubmit : onNext}>
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
    </div>
  );
};

export default WizardFooter;
