
import { Button } from "@/components/ui/button";
import { Plus, Server } from "lucide-react";

const EmptyWorkflowState = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8 text-center">
      <Server className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-medium mb-2">No Active Workflows</h3>
      <p className="text-muted-foreground mb-4">
        There are no active provisioning workflows at the moment.
      </p>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Create New Workflow
      </Button>
    </div>
  );
};

export default EmptyWorkflowState;
