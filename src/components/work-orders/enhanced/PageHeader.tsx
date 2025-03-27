
import { Button } from "@/components/ui/button";
import { Plus, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PageHeaderProps {
  onCreateWorkOrder: () => void;
}

const PageHeader = ({ onCreateWorkOrder }: PageHeaderProps) => {
  const { toast } = useToast();
  
  const handleGenerateFromAlert = () => {
    toast({
      title: "Emergency Work Order Generated",
      description: "New emergency work order WO-1006 created from Critical Alert ALT-4523",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Work Orders Management</h2>
        <p className="text-muted-foreground">
          Create, manage, and track maintenance tasks across your facility
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={handleGenerateFromAlert}>
          <AlertTriangle className="mr-2 h-4 w-4" />
          Create from Alert
        </Button>
        <Button onClick={onCreateWorkOrder}>
          <Plus className="mr-2 h-4 w-4" />
          Create Work Order
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
