
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { FileUp, Link, Clock } from "lucide-react";

export function FileUploader() {
  const [fileSource, setFileSource] = useState("upload");
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState("");
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
      toast({
        title: "Files added",
        description: `${newFiles.length} file(s) have been added`,
      });
    }
  };
  
  const handleUrlSubmit = () => {
    if (url.trim()) {
      toast({
        title: "URL added",
        description: `URL has been added to processing queue`,
      });
      setUrl("");
    }
  };
  
  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Data Source</h3>
      
      <Tabs value={fileSource} onValueChange={setFileSource}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">
            <FileUp className="mr-2 h-4 w-4" />
            File Upload
          </TabsTrigger>
          <TabsTrigger value="url">
            <Link className="mr-2 h-4 w-4" />
            URL / Link
          </TabsTrigger>
          <TabsTrigger value="recent">
            <Clock className="mr-2 h-4 w-4" />
            Recent Sources
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="py-4">
          <Card className="border-dashed border-2">
            <CardContent className="pt-6 text-center">
              <div className="flex flex-col items-center justify-center py-8 gap-6">
                <FileUp className="h-10 w-10 text-muted-foreground" />
                <div className="space-y-2">
                  <h4 className="text-lg font-medium">Drag & drop files here</h4>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    Supports Excel, CSV, PDF, Word, PowerPoint, and Text files
                  </p>
                </div>
                <div>
                  <Input
                    type="file"
                    id="file-upload"
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                    accept=".xlsx,.csv,.pdf,.docx,.pptx,.txt"
                  />
                  <Button 
                    onClick={() => document.getElementById("file-upload")?.click()}
                    variant="outline"
                  >
                    Browse Files
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {files.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Selected Files ({files.length})</h4>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                    <div className="text-sm truncate">{file.name}</div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveFile(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="url" className="py-4">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter URL (https://...)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button onClick={handleUrlSubmit}>Add</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Add links to documents stored in SharePoint, Google Drive, or any public URL
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="recent" className="py-4">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Recently used data sources will appear here
            </p>
            
            <div className="space-y-2">
              {[
                { name: "Monthly Maintenance.xlsx", date: "Yesterday" },
                { name: "Asset Inventory.pdf", date: "3 days ago" },
                { name: "Incident Report Q2.docx", date: "Last week" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-muted p-3 rounded-md">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.date}</div>
                  </div>
                  <Button variant="outline" size="sm">Use</Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
