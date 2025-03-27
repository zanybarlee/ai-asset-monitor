
import { Checkbox } from "@/components/ui/checkbox";

interface SecurityAgreementProps {
  agreed: boolean;
  setAgreed: (value: boolean) => void;
}

const SecurityAgreement = ({ agreed, setAgreed }: SecurityAgreementProps) => {
  return (
    <div className="border-t pt-4 mt-2">
      <div className="flex items-start space-x-2">
        <Checkbox
          id="agreed"
          checked={agreed}
          onCheckedChange={(checked) => 
            setAgreed(checked as boolean)
          }
        />
        <label htmlFor="agreed" className="text-sm">
          I confirm this visitor has been approved for facility access and understands all security protocols and requirements.
        </label>
      </div>
    </div>
  );
};

export default SecurityAgreement;
