
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MaintenanceTask } from "./schedule/maintenance-data";
import { useToast } from "@/hooks/use-toast";
import { 
  Paperclip, 
  FileText, 
  PlusCircle, 
  Clock, 
  LocateFixed,
  Building,
  CalendarClock,
  CheckCircle2,
  Package,
  Wrench,
  Tool,
  DollarSign,
  Trash2,
} from "lucide-react";

interface MaintenanceResponseDialogProps {
  open: boolean;
  onClose: () => void;
  task: MaintenanceTask;
}

interface Part {
  id: string;
  name: string;
  quantity: number;
  cost: number;
}

interface Labor {
  id: string;
  description: string;
  hours: number;
  rate: number;
}

const MaintenanceResponseDialog = ({ open, onClose, task }: MaintenanceResponseDialogProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  const [completionNotes, setCompletionNotes] = useState("");
  const [parts, setParts] = useState<Part[]>([]);
  const [labor, setLabor] = useState<Labor[]>([]);
  const [attachments, setAttachments] = useState<string[]>(["Maintenance_Report.pdf"]);
  const [newAttachment, setNewAttachment] = useState<File | null>(null);
  
  const handleAddPart = () => {
    const newPart: Part = {
      id: `part-${Date.now()}`,
      name: "Replacement Part",
      quantity: 1,
      cost: 45.99
    };
    setParts([...parts, newPart]);
  };
  
  const handleRemovePart = (id: string) => {
    setParts(parts.filter(part => part.id !== id));
  };
  
  const handleAddLabor = () => {
    const newLabor: Labor = {
      id: `labor-${Date.now()}`,
      description: "Maintenance Work",
      hours: 1,
      rate: 75
    };
    setLabor([...labor, newLabor]);
  };
  
  const handleRemoveLabor = (id: string) => {
    setLabor(labor.filter(item => item.id !== id));
  };
  
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
  
  const calculateTotal = () => {
    const partsTotal = parts.reduce((sum, part) => sum + (part.quantity * part.cost), 0);
    const laborTotal = labor.reduce((sum, item) => sum + (item.hours * item.rate), 0);
    return partsTotal + laborTotal;
  };
  
  const handleCompleteTask = () => {
    toast({
      title: "Maintenance Task Completed",
      description: "Your response has been recorded successfully."
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <span>{task.id}</span>
            <span className="text-lg font-normal">-</span>
            <span className="font-normal">{task.title}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-wrap gap-4 text-sm mb-4">
          <div className="flex items-center">
            <Building className="mr-1 h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{task.location}</span>
          </div>
          <div className="flex items-center">
            <LocateFixed className="mr-1 h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{task.asset}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Due: {task.dueDate}</span>
          </div>
          <div className="flex items-center">
            <CalendarClock className="mr-1 h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Assigned: {task.assignee}</span>
          </div>
        </div>
        
        {/* SLA Breach indicator bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>SLA Breach</span>
            <span>1 Day 4 Hours Left</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: "40%" }}></div>
          </div>
        </div>
        
        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Response Details</TabsTrigger>
            <TabsTrigger value="costs">Parts & Labor</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
          </TabsList>
          
          {/* Details Tab */}
          <TabsContent value="details" className="py-4 space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="completion-notes">Completion Notes</Label>
                <Textarea 
                  id="completion-notes"
                  placeholder="Describe the maintenance work performed..."
                  value={completionNotes}
                  onChange={(e) => setCompletionNotes(e.target.value)}
                  className="mt-1 min-h-[150px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Status</Label>
                  <select className="w-full mt-1 border rounded-md p-2">
                    <option value="completed">Completed</option>
                    <option value="partial">Partially Completed</option>
                    <option value="pending">Pending Parts</option>
                    <option value="escalated">Needs Escalation</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="hours-spent">Hours Spent</Label>
                  <Input 
                    id="hours-spent" 
                    type="number" 
                    placeholder="0.0" 
                    min="0" 
                    step="0.5" 
                    className="mt-1"
                  />
                </div>
              </div>
              
              {/* Technician Signature */}
              <div className="space-y-2">
                <Label>Technician Signature</Label>
                <div className="border rounded-md p-4 flex items-center justify-center bg-gray-50 h-24">
                  <img 
                    src="/lovable-uploads/1cf1a6e4-1a43-48dc-ab7f-6485698d145a.png" 
                    alt="Technician Signature" 
                    className="max-h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Costs Tab */}
          <TabsContent value="costs" className="py-4 space-y-6">
            <Tabs defaultValue="parts" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="parts">
                  <Package className="h-4 w-4 mr-2" />
                  Parts Used
                </TabsTrigger>
                <TabsTrigger value="labor">
                  <Wrench className="h-4 w-4 mr-2" />
                  Labor
                </TabsTrigger>
              </TabsList>
              
              {/* Parts Tab */}
              <TabsContent value="parts" className="space-y-4 py-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddPart}
                  className="ml-auto block"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Parts
                </Button>
                
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left text-xs font-medium text-muted-foreground p-2">Part Description</th>
                        <th className="text-right text-xs font-medium text-muted-foreground p-2">Quantity</th>
                        <th className="text-right text-xs font-medium text-muted-foreground p-2">Unit Cost</th>
                        <th className="text-right text-xs font-medium text-muted-foreground p-2">Total</th>
                        <th className="text-right text-xs font-medium text-muted-foreground p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parts.map((part) => (
                        <tr key={part.id} className="border-t">
                          <td className="p-2 text-sm">{part.name}</td>
                          <td className="p-2 text-sm text-right">{part.quantity}</td>
                          <td className="p-2 text-sm text-right">${part.cost.toFixed(2)}</td>
                          <td className="p-2 text-sm text-right">${(part.quantity * part.cost).toFixed(2)}</td>
                          <td className="p-2 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemovePart(part.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                      {parts.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-4 text-center text-muted-foreground">
                            No parts added yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              {/* Labor Tab */}
              <TabsContent value="labor" className="space-y-4 py-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddLabor}
                  className="ml-auto block"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Labor
                </Button>
                
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left text-xs font-medium text-muted-foreground p-2">Description</th>
                        <th className="text-right text-xs font-medium text-muted-foreground p-2">Hours</th>
                        <th className="text-right text-xs font-medium text-muted-foreground p-2">Hourly Rate</th>
                        <th className="text-right text-xs font-medium text-muted-foreground p-2">Total</th>
                        <th className="text-right text-xs font-medium text-muted-foreground p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {labor.map((item) => (
                        <tr key={item.id} className="border-t">
                          <td className="p-2 text-sm">{item.description}</td>
                          <td className="p-2 text-sm text-right">{item.hours}</td>
                          <td className="p-2 text-sm text-right">${item.rate.toFixed(2)}</td>
                          <td className="p-2 text-sm text-right">${(item.hours * item.rate).toFixed(2)}</td>
                          <td className="p-2 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemoveLabor(item.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                      {labor.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-4 text-center text-muted-foreground">
                            No labor entries added yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Cost Summary */}
            {(parts.length > 0 || labor.length > 0) && (
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-medium">Total Cost:</span>
                <span className="font-medium text-lg">${calculateTotal().toFixed(2)}</span>
              </div>
            )}
          </TabsContent>
          
          {/* Attachments Tab */}
          <TabsContent value="attachments" className="py-4 space-y-4">
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
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleCompleteTask}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Submit Response
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MaintenanceResponseDialog;
