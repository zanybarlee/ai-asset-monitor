
import { Button } from "@/components/ui/button";
import { BookOpen, FileDown, Plus, Upload } from "lucide-react";

interface AssetsHeaderProps {
  onShowMetrics: () => void;
  onExportAssets: () => void;
  onShowBulkImport: () => void;
  onShowCreateAsset: () => void;
}

const AssetsHeader = ({ 
  onShowMetrics, 
  onExportAssets, 
  onShowBulkImport, 
  onShowCreateAsset 
}: AssetsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Asset Management</h2>
        <p className="text-muted-foreground">
          Track, monitor, and manage data center equipment
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button variant="outline" size="sm" onClick={onShowMetrics}>
          <BookOpen className="mr-2 h-4 w-4" />
          Metrics
        </Button>
        <Button variant="outline" size="sm" onClick={onExportAssets}>
          <FileDown className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button variant="outline" size="sm" onClick={onShowBulkImport}>
          <Upload className="mr-2 h-4 w-4" />
          Bulk Import
        </Button>
        <Button size="sm" onClick={onShowCreateAsset}>
          <Plus className="mr-2 h-4 w-4" />
          Add Asset
        </Button>
      </div>
    </div>
  );
};

export default AssetsHeader;
