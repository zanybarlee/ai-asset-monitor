
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
import { maintenanceTemplates } from "./workflow-data";

const MaintenanceWorkflows = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("hvac-maintenance");
  
  const currentTemplate = maintenanceTemplates.find(
    template => template.id === selectedTemplate
  ) || maintenanceTemplates[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
          <div>
            <label className="text-sm font-medium mb-1 block">Select Maintenance Workflow</label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Select a workflow" />
              </SelectTrigger>
              <SelectContent>
                {maintenanceTemplates.map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Asset Category</label>
            <Select defaultValue="mechanical">
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mechanical">Mechanical</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="hvac">HVAC</SelectItem>
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
              <h3 className="text-lg font-semibold mb-4">Mobile Preview</h3>
              <div className="mt-4 flex justify-center">
                <img 
                  src="/lovable-uploads/e494afcd-1500-4473-8cd1-3ad496b9486d.png" 
                  alt="Mobile Preview" 
                  className="max-w-full h-auto max-h-[500px]"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceWorkflows;
