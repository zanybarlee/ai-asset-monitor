
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import CreateWorkflowDrawer from "./CreateWorkflowDrawer";
import { WorkflowTemplate } from "./workflow-types";

const WorkflowHeader = () => {
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateWorkflow = (workflow: Partial<WorkflowTemplate>) => {
    // In a real application, this would call an API to save the workflow
    console.log("New workflow created:", workflow);
    
    toast({
      title: "Workflow created",
      description: `${workflow.name} has been created successfully.`,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Workflows</h2>
        <p className="text-muted-foreground">
          Configure and manage workflow checklists
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search workflows..."
            className="pl-8 w-full sm:w-[250px]"
          />
        </div>
        <Button onClick={() => setIsCreateDrawerOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Workflow
        </Button>
      </div>

      <CreateWorkflowDrawer 
        isOpen={isCreateDrawerOpen}
        onOpenChange={setIsCreateDrawerOpen}
        onCreateWorkflow={handleCreateWorkflow}
      />
    </div>
  );
};

export default WorkflowHeader;
