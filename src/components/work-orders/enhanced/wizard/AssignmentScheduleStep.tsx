
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Calendar } from "lucide-react";

const AssignmentScheduleStep = () => {
  return (
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
  );
};

export default AssignmentScheduleStep;
