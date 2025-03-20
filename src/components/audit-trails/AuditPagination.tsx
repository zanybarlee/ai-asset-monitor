
import { Button } from "@/components/ui/button";

interface AuditPaginationProps {
  filteredCount: number;
  totalCount: number;
  disabled: boolean;
}

const AuditPagination = ({ filteredCount, totalCount, disabled }: AuditPaginationProps) => {
  return (
    <div className="flex items-center justify-between pt-4">
      <div className="text-sm text-muted-foreground">
        Showing {filteredCount} of {totalCount} records
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" disabled={disabled}>
          Previous
        </Button>
        <Button variant="outline" size="sm" disabled={disabled}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default AuditPagination;
