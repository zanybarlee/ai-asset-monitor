
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

const WorkflowStages = () => {
  const stages = [
    { name: "Case Created", role: "", color: "bg-blue-500" },
    { name: "Technician", role: "Case assigned to tech for execution", color: "bg-amber-500" },
    { name: "Engineer", role: "Case submitted to Engineer for Verification", color: "bg-green-500" },
    { name: "Supervisor", role: "Case submitted to Supervisor for Verification", color: "bg-purple-500" },
    { name: "Closed", role: "Case closed by Supervisor", color: "bg-gray-500" }
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {stages.map((stage, index) => (
          <div key={index} className="flex items-center p-2 border rounded-md">
            <Badge className={`${stage.color} text-white mr-3`}>
              {index + 1}
            </Badge>
            <div>
              <div className="font-medium">{stage.name}</div>
              {stage.role && (
                <div className="text-xs text-muted-foreground">{stage.role}</div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <Button variant="outline" size="sm" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Stage
      </Button>
    </div>
  );
};

export default WorkflowStages;
