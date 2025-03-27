
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AttachmentsTabProps {
  attachments: string[];
  setAttachments: React.Dispatch<React.SetStateAction<string[]>>;
}

const AttachmentsTab = ({ attachments, setAttachments }: AttachmentsTabProps) => {
  const { toast } = useToast();
  const [newAttachment, setNewAttachment] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewAttachment(e.target.files[0]);
    }
  };
  
  const handleUploadAttachment = () => {
    if (newAttachment) {
      setAttachments([...attachments, newAttachment.name]);
      setNewAttachment(null);
      toast({
        title: "Attachment uploaded",
        description: `${newAttachment.name} has been uploaded successfully.`
      });
    }
  };

  return (
    <div className="py-4 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Input 
          type="file" 
          id="file-upload" 
          className="max-w-xs" 
          onChange={handleFileChange}
        />
        <Button 
          onClick={handleUploadAttachment} 
          disabled={!newAttachment}
          size="sm"
        >
          <Paperclip className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left text-xs font-medium text-muted-foreground p-2">File Name</th>
              <th className="text-left text-xs font-medium text-muted-foreground p-2">File Type</th>
              <th className="text-left text-xs font-medium text-muted-foreground p-2">Creation Date</th>
              <th className="text-left text-xs font-medium text-muted-foreground p-2">Uploaded By</th>
              <th className="text-right text-xs font-medium text-muted-foreground p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attachments.map((file, index) => (
              <tr key={index} className="border-t">
                <td className="p-2 text-sm">{file}</td>
                <td className="p-2 text-sm">{file.split('.').pop()?.toUpperCase()}</td>
                <td className="p-2 text-sm">May 14, 2023</td>
                <td className="p-2 text-sm">Current User</td>
                <td className="p-2 text-right">
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </Button>
                </td>
              </tr>
            ))}
            {attachments.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-muted-foreground">
                  No attachments uploaded yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttachmentsTab;
