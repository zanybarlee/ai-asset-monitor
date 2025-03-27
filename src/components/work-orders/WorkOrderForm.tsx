
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { dataCenterParts, technicians, Part, LaborTask } from "./work-orders-data";
import { PlusCircle, Trash2, HardDrive, Wrench } from "lucide-react";

interface WorkOrderFormProps {
  open: boolean;
  onClose: () => void;
}

const WorkOrderForm = ({ open, onClose }: WorkOrderFormProps) => {
  const { toast } = useToast();
  const [formTab, setFormTab] = useState("basic");
  const [selectedParts, setSelectedParts] = useState<Part[]>([]);
  const [selectedLaborTasks, setSelectedLaborTasks] = useState<LaborTask[]>([]);

  const [newPart, setNewPart] = useState({
    partId: "",
    quantity: 1
  });

  const [newLaborTask, setNewLaborTask] = useState({
    description: "",
    technicianId: "",
    hours: 1
  });

  const handleAddPart = () => {
    const selectedPart = dataCenterParts.find(part => part.id === newPart.partId);
    if (!selectedPart) return;

    const partToAdd: Part = {
      ...selectedPart,
      quantity: newPart.quantity,
      total: selectedPart.unitCost * newPart.quantity
    };

    setSelectedParts([...selectedParts, partToAdd]);
    setNewPart({ partId: "", quantity: 1 });
  };

  const handleRemovePart = (partId: string) => {
    setSelectedParts(selectedParts.filter(part => part.id !== partId));
  };

  const handleAddLaborTask = () => {
    const selectedTechnician = technicians.find(tech => tech.id === newLaborTask.technicianId);
    if (!selectedTechnician || !newLaborTask.description || newLaborTask.hours <= 0) return;

    const hourlyRate = 85; // Default rate - could be from technician profile
    
    const taskToAdd: LaborTask = {
      id: `L${Date.now()}`,
      description: newLaborTask.description,
      assignedTo: selectedTechnician.name,
      estimatedHours: newLaborTask.hours,
      hourlyRate: hourlyRate,
      total: hourlyRate * newLaborTask.hours
    };

    setSelectedLaborTasks([...selectedLaborTasks, taskToAdd]);
    setNewLaborTask({ description: "", technicianId: "", hours: 1 });
  };

  const handleRemoveLaborTask = (taskId: string) => {
    setSelectedLaborTasks(selectedLaborTasks.filter(task => task.id !== taskId));
  };

  const calculateTotalCost = () => {
    const partsCost = selectedParts.reduce((sum, part) => sum + part.total, 0);
    const laborCost = selectedLaborTasks.reduce((sum, task) => sum + task.total, 0);
    return partsCost + laborCost;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Submit the form (in a real app, this would save to a database)
    toast({
      title: "Work Order Created",
      description: "The work order has been created and assigned to the technician.",
    });
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Work Order</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new work order. Add parts and labor as needed.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" value={formTab} onValueChange={setFormTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="parts">Parts ({selectedParts.length})</TabsTrigger>
              <TabsTrigger value="labor">Labor Tasks ({selectedLaborTasks.length})</TabsTrigger>
            </TabsList>
            
            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="e.g., HVAC Maintenance" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input id="dueDate" type="date" required />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the work to be done" rows={3} required />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="facility">Facility</Label>
                    <Input id="facility" placeholder="e.g., Main Data Center" />
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g., Server Room A" />
                  </div>
                  
                  <div>
                    <Label htmlFor="asset">Asset</Label>
                    <Input id="asset" placeholder="e.g., CRAC Unit 01" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="assignee">Assign To</Label>
                  <Select>
                    <SelectTrigger id="assignee">
                      <SelectValue placeholder="Select technician" />
                    </SelectTrigger>
                    <SelectContent>
                      {technicians.map(tech => (
                        <SelectItem 
                          key={tech.id} 
                          value={tech.id}
                          disabled={!tech.available}
                        >
                          {tech.name} - {tech.specialty} {!tech.available && "(Unavailable)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            
            {/* Parts Tab */}
            <TabsContent value="parts" className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex items-center">
                  <HardDrive className="h-5 w-5 mr-2 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Add Parts</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <div>
                    <Label htmlFor="part">Select Part</Label>
                    <Select value={newPart.partId} onValueChange={(value) => setNewPart({...newPart, partId: value})}>
                      <SelectTrigger id="part">
                        <SelectValue placeholder="Select part" />
                      </SelectTrigger>
                      <SelectContent>
                        {dataCenterParts.map(part => (
                          <SelectItem key={part.id} value={part.id}>
                            {part.name} (#{part.partNumber})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input 
                      id="quantity" 
                      type="number" 
                      min="1" 
                      value={newPart.quantity} 
                      onChange={(e) => setNewPart({...newPart, quantity: parseInt(e.target.value) || 1})}
                    />
                  </div>
                  
                  <div className="flex items-end">
                    <Button 
                      type="button" 
                      onClick={handleAddPart} 
                      disabled={!newPart.partId || newPart.quantity < 1}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Part
                    </Button>
                  </div>
                </div>
              </div>
              
              {selectedParts.length > 0 ? (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left text-xs font-medium text-muted-foreground p-2">Part Name</th>
                        <th className="text-left text-xs font-medium text-muted-foreground p-2">Part #</th>
                        <th className="text-right text-xs font-medium text-muted-foreground p-2">Unit Cost</th>
                        <th className="text-right text-xs font-medium text-muted-foreground p-2">Qty</th>
                        <th className="text-right text-xs font-medium text-muted-foreground p-2">Total</th>
                        <th className="text-right text-xs font-medium text-muted-foreground p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedParts.map((part) => (
                        <tr key={part.id} className="border-t">
                          <td className="p-2 text-sm">{part.name}</td>
                          <td className="p-2 text-sm">{part.partNumber}</td>
                          <td className="p-2 text-sm text-right">${part.unitCost.toFixed(2)}</td>
                          <td className="p-2 text-sm text-right">{part.quantity}</td>
                          <td className="p-2 text-sm text-right">${part.total.toFixed(2)}</td>
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
                      <tr className="border-t bg-muted/50">
                        <td colSpan={4} className="p-2 text-sm font-medium text-right">Parts Subtotal:</td>
                        <td className="p-2 text-sm font-medium text-right">
                          ${selectedParts.reduce((sum, part) => sum + part.total, 0).toFixed(2)}
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex items-center justify-center p-8 bg-muted/30 rounded-lg">
                  <p className="text-muted-foreground">No parts added yet. Add parts from the list above.</p>
                </div>
              )}
            </TabsContent>
            
            {/* Labor Tasks Tab */}
            <TabsContent value="labor" className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex items-center">
                  <Wrench className="h-5 w-5 mr-2 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Add Labor Task</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-4 mt-3">
                  <div>
                    <Label htmlFor="taskDescription">Task Description</Label>
                    <Input 
                      id="taskDescription" 
                      placeholder="e.g., HVAC System Inspection" 
                      value={newLaborTask.description}
                      onChange={(e) => setNewLaborTask({...newLaborTask, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="technician">Assign To</Label>
                      <Select 
                        value={newLaborTask.technicianId} 
                        onValueChange={(value) => setNewLaborTask({...newLaborTask, technicianId: value})}
                      >
                        <SelectTrigger id="technician">
                          <SelectValue placeholder="Select technician" />
                        </SelectTrigger>
                        <SelectContent>
                          {technicians
                            .filter(tech => tech.available)
                            .map(tech => (
                              <SelectItem key={tech.id} value={tech.id}>
                                {tech.name} - {tech.specialty}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="hours">Estimated Hours</Label>
                      <Input 
                        id="hours" 
                        type="number" 
                        min="0.5" 
                        step="0.5" 
                        value={newLaborTask.hours}
                        onChange={(e) => setNewLaborTask({
                          ...newLaborTask, 
                          hours: parseFloat(e.target.value) || 0
                        })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Button 
                      type="button" 
                      onClick={handleAddLaborTask}
                      disabled={!newLaborTask.description || !newLaborTask.technicianId || newLaborTask.hours <= 0}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Labor Task
                    </Button>
                  </div>
                </div>
              </div>
              
              {selectedLaborTasks.length > 0 ? (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left text-xs font-medium text-muted-foreground p-2">Description</th>
                        <th className="text-left text-xs font-medium text-muted-foreground p-2">Assigned To</th>
                        <th className="text-right text-xs font-medium text-muted-foreground p-2">Hours</th>
                        <th className="text-right text-xs font-medium text-muted-foreground p-2">Rate</th>
                        <th className="text-right text-xs font-medium text-muted-foreground p-2">Total</th>
                        <th className="text-right text-xs font-medium text-muted-foreground p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedLaborTasks.map((task) => (
                        <tr key={task.id} className="border-t">
                          <td className="p-2 text-sm">{task.description}</td>
                          <td className="p-2 text-sm">{task.assignedTo}</td>
                          <td className="p-2 text-sm text-right">{task.estimatedHours}</td>
                          <td className="p-2 text-sm text-right">${task.hourlyRate.toFixed(2)}</td>
                          <td className="p-2 text-sm text-right">${task.total.toFixed(2)}</td>
                          <td className="p-2 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleRemoveLaborTask(task.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t bg-muted/50">
                        <td colSpan={4} className="p-2 text-sm font-medium text-right">Labor Subtotal:</td>
                        <td className="p-2 text-sm font-medium text-right">
                          ${selectedLaborTasks.reduce((sum, task) => sum + task.total, 0).toFixed(2)}
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex items-center justify-center p-8 bg-muted/30 rounded-lg">
                  <p className="text-muted-foreground">No labor tasks added yet. Add tasks above.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-6 border-t pt-4">
            <div className="flex-1">
              {(selectedParts.length > 0 || selectedLaborTasks.length > 0) && (
                <div className="text-right mb-4">
                  <p className="text-sm text-muted-foreground">Total Cost: <span className="font-medium">${calculateTotalCost().toFixed(2)}</span></p>
                </div>
              )}
            </div>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Submit to Technician</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WorkOrderForm;
