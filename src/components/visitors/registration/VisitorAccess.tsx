
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VisitorAccessProps {
  accessLevel: string;
  setAccessLevel: (value: string) => void;
  requiresEscort: boolean;
  setRequiresEscort: (value: boolean) => void;
}

const VisitorAccess = ({
  accessLevel,
  setAccessLevel,
  requiresEscort,
  setRequiresEscort,
}: VisitorAccessProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label htmlFor="accessLevel" className="text-sm font-medium">
          Access Level
        </label>
        <Select value={accessLevel} onValueChange={setAccessLevel}>
          <SelectTrigger id="accessLevel">
            <SelectValue placeholder="Select access level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Limited">Limited</SelectItem>
            <SelectItem value="Standard">Standard</SelectItem>
            <SelectItem value="Extended">Extended</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center space-x-2 mt-8">
        <Checkbox
          id="requiresEscort"
          checked={requiresEscort}
          onCheckedChange={(checked) => 
            setRequiresEscort(checked as boolean)
          }
        />
        <label htmlFor="requiresEscort" className="text-sm font-medium">
          Requires Escort
        </label>
      </div>
    </div>
  );
};

export default VisitorAccess;
