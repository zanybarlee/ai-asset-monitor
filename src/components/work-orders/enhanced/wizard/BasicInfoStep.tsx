
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicInfoStepProps {
  templateType: string;
}

const BasicInfoStep = ({ templateType }: BasicInfoStepProps) => {
  return (
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
  );
};

export default BasicInfoStep;
