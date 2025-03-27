
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { technicians } from "../work-orders-data";

const BasicInformationTab = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="e.g., HVAC Maintenance" required />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
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
            <Label htmlFor="dueDate">Due Date</Label>
            <Input id="dueDate" type="date" required />
          </div>
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Describe the work to be done" rows={3} required />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="facility">Facility</Label>
            <Input id="facility" placeholder="e.g., Main Data Center" />
          </div>
          
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="e.g., Server Room A" />
          </div>
          
          <div>
            <Label htmlFor="asset">Asset</Label>
            <Input id="asset" placeholder="e.g., CRAC Unit 01" />
          </div>
        </div>
        
        <div>
          <Label htmlFor="assignee">Assign To</Label>
          <Select>
            <SelectTrigger id="assignee">
              <SelectValue placeholder="Select technician" />
            </SelectTrigger>
            <SelectContent>
              {technicians.map(tech => (
                <SelectItem 
                  key={tech.id} 
                  value={tech.id}
                  disabled={!tech.available}
                >
                  {tech.name} - {tech.specialty} {!tech.available && "(Unavailable)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default BasicInformationTab;
