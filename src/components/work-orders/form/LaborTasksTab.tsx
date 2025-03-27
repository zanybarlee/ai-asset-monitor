
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Trash2, Wrench } from "lucide-react";
import { technicians, LaborTask } from "../work-orders-data";

const LaborTasksTab = () => {
  const [selectedLaborTasks, setSelectedLaborTasks] = useState<LaborTask[]>([]);
  const [newLaborTask, setNewLaborTask] = useState({
    description: "",
    technicianId: "",
    hours: 1
  });

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

  return (
    <div className="space-y-4">
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

      <LaborTotals tasks={selectedLaborTasks} />
    </div>
  );
};

interface LaborTotalsProps {
  tasks: LaborTask[];
}

const LaborTotals = ({ tasks }: LaborTotalsProps) => {
  const laborTotal = tasks.reduce((sum, task) => sum + task.total, 0);
  
  return (
    <div className="flex justify-end">
      <div className="text-right">
        <p className="text-sm font-medium">Labor Total: <span>${laborTotal.toFixed(2)}</span></p>
      </div>
    </div>
  );
};

export default LaborTasksTab;
export { LaborTotals };
