
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import WorkflowChecklist from "./WorkflowChecklist";
import WorkflowStages from "./WorkflowStages";
import { workOrderTemplates } from "./workflow-data";

const WorkOrderWorkflows = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("steam-water");
  
  const currentTemplate = workOrderTemplates.find(
    template => template.id === selectedTemplate
  ) || workOrderTemplates[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
          <div>
            <label className="text-sm font-medium mb-1 block">Select Workflow</label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Select a workflow" />
              </SelectTrigger>
              <SelectContent>
                {workOrderTemplates.map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Department</label>
            <Select defaultValue="maintenance">
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Badge variant="outline" className="ml-auto">
          {currentTemplate?.status || "Active"}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">{currentTemplate?.name}</h3>
              <WorkflowChecklist checklist={currentTemplate?.checklist || []} />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Workflow Stages</h3>
              <WorkflowStages />
              <div className="mt-4">
                <img 
                  src="/lovable-uploads/805cec9f-448b-4ad2-9a2d-b50ae346eefa.png" 
                  alt="Workflow Stages" 
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderWorkflows;
