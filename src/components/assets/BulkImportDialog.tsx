
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileDown, Upload } from "lucide-react";

const BulkImportDialog = () => {
  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Bulk Import Assets</DialogTitle>
        <DialogDescription>
          Upload a file to import multiple assets
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            Drag and drop your file here, or click to browse
          </p>
          <Button variant="outline" className="mt-4">
            Select File
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground space-y-2">
          <p>Accepted formats: .xlsx, .csv</p>
          <p>Maximum file size: 10MB</p>
          <Button variant="outline" size="sm" className="w-full">
            <FileDown className="mr-2 h-4 w-4" />
            Download Template
          </Button>
        </div>
      </div>
      
      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Import Assets</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default BulkImportDialog;
