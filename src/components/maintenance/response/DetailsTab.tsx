
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface DetailsTabProps {
  completionNotes: string;
  setCompletionNotes: React.Dispatch<React.SetStateAction<string>>;
}

const DetailsTab = ({ completionNotes, setCompletionNotes }: DetailsTabProps) => {
  return (
    <div className="py-4 space-y-4">
      <div>
        <Label htmlFor="completion-notes">Completion Notes</Label>
        <Textarea 
          id="completion-notes"
          placeholder="Describe the maintenance work performed..."
          value={completionNotes}
          onChange={(e) => setCompletionNotes(e.target.value)}
          className="mt-1 min-h-[150px]"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Status</Label>
          <select className="w-full mt-1 border rounded-md p-2">
            <option value="completed">Completed</option>
            <option value="partial">Partially Completed</option>
            <option value="pending">Pending Parts</option>
            <option value="escalated">Needs Escalation</option>
          </select>
        </div>
        <div>
          <Label htmlFor="hours-spent">Hours Spent</Label>
          <Input 
            id="hours-spent" 
            type="number" 
            placeholder="0.0" 
            min="0" 
            step="0.5" 
            className="mt-1"
          />
        </div>
      </div>
      
      {/* Technician Signature */}
      <div className="space-y-2">
        <Label>Technician Signature</Label>
        <div className="border rounded-md p-4 flex items-center justify-center bg-gray-50 h-24">
          <img 
            src="/lovable-uploads/1cf1a6e4-1a43-48dc-ab7f-6485698d145a.png" 
            alt="Technician Signature" 
            className="max-h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsTab;
