import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { mockOrders, Part, LaborTask } from "./work-orders-data";
import { useToast } from "@/hooks/use-toast";
import { 
  Clock, 
  Clipboard, 
  Paperclip, 
  DollarSign, 
  PlusCircle, 
  Trash2, 
  Save, 
  CheckCircle2,
  FileText,
  Wrench,
  Package
} from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface WorkOrderDetailsProps {
  open: boolean;
  onClose: () => void;
  orderId: string;
}

const WorkOrderDetails = ({ open, onClose, orderId }: WorkOrderDetailsProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("breakdown");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [attachments, setAttachments] = useState<string[]>([
    "Inspection Report.pdf",
    "Site Photos.zip"
  ]);
  
  const workOrder = mockOrders.find(order => order.id === orderId) || mockOrders[0];
  
  const [parts, setParts] = useState<Part[]>(workOrder.parts || []);
  const [laborTasks, setLaborTasks] = useState<LaborTask[]>(workOrder.laborTasks || []);
  
  const form = useForm({
    defaultValues: {
      technicalNotes: "",
      completionStatus: "fixed",
      hoursSpent: "1.5",
      signature: true
    }
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };
  
  const handleUploadAttachment = () => {
    if (attachment) {
      setAttachments([...attachments, attachment.name]);
      setAttachment(null);
      toast({
        title: "Attachment uploaded",
        description: `${attachment.name} has been uploaded successfully.`
      });
    }
  };
  
  const handleAddPart = () => {
    const newPart: Part = {
      id: `P${Date.now()}`,
      name: "Replacement Part",
      partNumber: "RP-1234",
      unitCost: 45.99,
      quantity: 1,
      total: 45.99
    };
    
    setParts([...parts, newPart]);
  };
  
  const handleAddLabor = () => {
    const newLabor: LaborTask = {
      id: `L${Date.now()}`,
      description: "Maintenance Work",
      assignedTo: "Current User",
      estimatedHours: 1,
      hourlyRate: 85,
      total: 85
    };
    
    setLaborTasks([...laborTasks, newLabor]);
  };
  
  const calculateTotal = () => {
    const partsTotal = parts.reduce((sum, part) => sum + part.total, 0);
    const laborTotal = laborTasks.reduce((sum, task) => sum + task.total, 0);
    return partsTotal + laborTotal;
  };
  
  const handleUpdate = () => {
    toast({
      title: "Work Order Updated",
      description: "Your response has been recorded successfully."
    });
    onClose();
  };
  
  const handleCompleteWorkOrder = (data: any) => {
    console.log("Completion data:", data);
    toast({
      title: "Work Order Completed",
      description: "The work order has been marked as completed."
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <span>{workOrder.id}</span>
            <span className="text-lg font-normal">-</span>
            <span className="font-normal">{workOrder.title}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
          <div>
            <Label className="text-muted-foreground mb-1 block">Location</Label>
            <div className="font-medium">{workOrder.location || "Test HVAC Unit - Plant A"}</div>
          </div>
          <div>
            <Label className="text-muted-foreground mb-1 block">Asset</Label>
            <div className="font-medium">{workOrder.asset || "HVAC-101"}</div>
          </div>
          <div>
            <Label className="text-muted-foreground mb-1 block">Status</Label>
            <div className="font-medium">{workOrder.status}</div>
          </div>
        </div>
        
        <div className="space-y-1 mb-4">
          <Label className="text-muted-foreground mb-1 block">Description</Label>
          <div className="font-medium">{workOrder.description}</div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>SLA Breach</span>
            <span>1 Day 9 Hours Left</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: "30%" }}></div>
          </div>
        </div>
        
        <Tabs defaultValue="breakdown" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="breakdown">Breakdown Information</TabsTrigger>
            <TabsTrigger value="technician">Technician Form</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="breakdown" className="py-4 space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="problem-description">Problem Description</Label>
                  <Textarea 
                    id="problem-description" 
                    placeholder="Describe the issue in detail"
                    className="mt-1 h-24"
                  />
                </div>
                <div>
                  <Label htmlFor="action-taken">Action Taken</Label>
                  <Textarea 
                    id="action-taken" 
                    placeholder="Describe what actions were taken"
                    className="mt-1 h-24"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Image Evidence</Label>
                  <Button variant="outline" size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                </div>
                
                <div className="border rounded-md p-4 flex items-center justify-center h-40">
                  <img 
                    src="/lovable-uploads/077160d5-bf38-4a19-b83d-913b1139786d.png" 
                    alt="Car Door Issue" 
                    className="max-h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="technician" className="py-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCompleteWorkOrder)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="technicalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technical Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your technical notes here..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="completionStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Completion Status</FormLabel>
                        <FormControl>
                          <select 
                            className="w-full border rounded-md p-2"
                            {...field}
                          >
                            <option value="fixed">Fixed</option>
                            <option value="partially_fixed">Partially Fixed</option>
                            <option value="needs_parts">Needs Parts</option>
                            <option value="escalated">Escalated</option>
                          </select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="hoursSpent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hours Spent</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
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
                
                <div className="pt-4 flex justify-end">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Update
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          
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
                disabled={!attachment}
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
                      <td className="p-2 text-sm">Technician Smith</td>
                      <td className="p-2 text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Cost Tracking</h3>
                <div className="text-sm font-medium">Total: ${calculateTotal().toFixed(2)}</div>
              </div>
              
              <Tabs defaultValue="parts" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="parts">
                    <Package className="h-4 w-4 mr-2" />
                    Parts
                  </TabsTrigger>
                  <TabsTrigger value="labor">
                    <Wrench className="h-4 w-4 mr-2" />
                    Labor
                  </TabsTrigger>
                  <TabsTrigger value="additional">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Additional
                  </TabsTrigger>
                </TabsList>
                
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
                          <th className="text-left text-xs font-medium text-muted-foreground p-2">Part Name</th>
                          <th className="text-left text-xs font-medium text-muted-foreground p-2">Part #</th>
                          <th className="text-right text-xs font-medium text-muted-foreground p-2">Cost</th>
                          <th className="text-right text-xs font-medium text-muted-foreground p-2">Qty</th>
                          <th className="text-right text-xs font-medium text-muted-foreground p-2">Total</th>
                          <th className="text-right text-xs font-medium text-muted-foreground p-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {parts.map((part) => (
                          <tr key={part.id} className="border-t">
                            <td className="p-2 text-sm">{part.name}</td>
                            <td className="p-2 text-sm">{part.partNumber}</td>
                            <td className="p-2 text-sm text-right">${part.unitCost.toFixed(2)}</td>
                            <td className="p-2 text-sm text-right">{part.quantity}</td>
                            <td className="p-2 text-sm text-right">${part.total.toFixed(2)}</td>
                            <td className="p-2 text-right">
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                        {parts.length === 0 && (
                          <tr>
                            <td colSpan={6} className="p-4 text-center text-muted-foreground">
                              No parts added yet
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="labor" className="space-y-4 py-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleAddLabor}
                    className="ml-auto block"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Labor Time
                  </Button>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left text-xs font-medium text-muted-foreground p-2">Description</th>
                          <th className="text-left text-xs font-medium text-muted-foreground p-2">Tech</th>
                          <th className="text-right text-xs font-medium text-muted-foreground p-2">Hours</th>
                          <th className="text-right text-xs font-medium text-muted-foreground p-2">Rate</th>
                          <th className="text-right text-xs font-medium text-muted-foreground p-2">Total</th>
                          <th className="text-right text-xs font-medium text-muted-foreground p-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {laborTasks.map((task) => (
                          <tr key={task.id} className="border-t">
                            <td className="p-2 text-sm">{task.description}</td>
                            <td className="p-2 text-sm">{task.assignedTo}</td>
                            <td className="p-2 text-sm text-right">{task.estimatedHours}</td>
                            <td className="p-2 text-sm text-right">${task.hourlyRate.toFixed(2)}</td>
                            <td className="p-2 text-sm text-right">${task.total.toFixed(2)}</td>
                            <td className="p-2 text-right">
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                        {laborTasks.length === 0 && (
                          <tr>
                            <td colSpan={6} className="p-4 text-center text-muted-foreground">
                              No labor tasks added yet
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="additional" className="py-4">
                  <div className="p-4 text-center text-muted-foreground">
                    No additional costs added yet
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkOrderDetails;
