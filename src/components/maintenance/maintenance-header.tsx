
import { Button } from "@/components/ui/button";
import { FileText, FileDown } from "lucide-react";

const MaintenanceHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Maintenance History</h2>
        <p className="text-muted-foreground">
          View maintenance records and predictive analytics
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
        <Button variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>
    </div>
  );
};

export default MaintenanceHeader;
