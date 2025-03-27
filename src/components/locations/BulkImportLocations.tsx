
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDown, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BulkImportLocationsProps {
  onImportSuccess: () => void;
}

const BulkImportLocations = ({ onImportSuccess }: BulkImportLocationsProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if file is Excel or CSV
      if (
        selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        selectedFile.type === "application/vnd.ms-excel" ||
        selectedFile.type === "text/csv"
      ) {
        setFile(selectedFile);
      } else {
        toast({
          title: "Invalid file format",
          description: "Please upload an Excel (.xlsx, .xls) or CSV file",
          variant: "destructive",
        });
      }
    }
  };

  const handleDownloadTemplate = () => {
    toast({
      title: "Template downloaded",
      description: "The location import template has been downloaded",
    });
  };

  const handleImport = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to import",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      onImportSuccess();
      setFile(null);
      // Reset the file input
      const fileInput = document.getElementById("fileUpload") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Import Locations</CardTitle>
        <CardDescription>
          Upload an Excel or CSV file with location information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center">
          <input
            id="fileUpload"
            type="file"
            className="hidden"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileChange}
          />
          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Drag & drop your file or browse</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Supports Excel (.xlsx, .xls) and CSV (.csv) files
            </p>
            <Button variant="outline" onClick={() => document.getElementById("fileUpload")?.click()}>
              Select File
            </Button>
          </div>
          {file && (
            <div className="mt-4 p-3 bg-muted rounded-md flex items-center justify-between">
              <span className="font-medium">{file.name}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setFile(null)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-md font-medium mb-2">Import Guidelines</h3>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 mb-4">
            <li>File must contain headers: Name, Building Code, Floor, Room</li>
            <li>Each row represents a single location</li>
            <li>Maximum file size: 10MB</li>
            <li>The system will validate location data before import</li>
          </ul>
          <Button variant="outline" className="w-full" onClick={handleDownloadTemplate}>
            <FileDown className="mr-2 h-4 w-4" />
            Download Template
          </Button>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button 
          onClick={handleImport} 
          disabled={!file || isUploading}
        >
          {isUploading ? "Importing..." : "Start Import"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BulkImportLocations;
