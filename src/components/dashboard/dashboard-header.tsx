
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface DashboardHeaderProps {
  refreshing: boolean;
  onRefresh: () => void;
}

const DashboardHeader = ({ refreshing, onRefresh }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Operational Dashboard</h2>
        <p className="text-muted-foreground">
          Real-time monitoring of data center operations
        </p>
      </div>
      <Button 
        variant="outline" 
        className="w-full sm:w-auto"
        onClick={onRefresh}
        disabled={refreshing}
      >
        <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
        {refreshing ? 'Refreshing...' : 'Refresh Data'}
      </Button>
    </div>
  );
};

export default DashboardHeader;
