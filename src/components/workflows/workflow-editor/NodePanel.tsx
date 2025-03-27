
import { useState } from 'react';
import { Panel } from '@xyflow/react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { INPUT_TYPES } from '../workflow-types';

interface NodePanelProps {
  addNode: (description: string, inputType: string) => void;
}

const NodePanel = ({ addNode }: NodePanelProps) => {
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskInputType, setNewTaskInputType] = useState('');

  const handleAddNode = () => {
    addNode(newTaskDescription, newTaskInputType);
    // Reset form
    setNewTaskDescription('');
    setNewTaskInputType('');
  };

  return (
    <Panel position="top-left" className="bg-white p-3 rounded-md shadow-sm border">
      <div className="space-y-2 w-64">
        <h3 className="text-sm font-medium">Add Workflow Step</h3>
        <div className="space-y-1">
          <Label htmlFor="description" className="text-xs">Description</Label>
          <input 
            id="description"
            className="w-full px-3 py-1 text-sm border rounded-md"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Enter step description"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="input-type" className="text-xs">Input Type</Label>
          <Select value={newTaskInputType} onValueChange={setNewTaskInputType}>
            <SelectTrigger id="input-type" className="text-sm">
              <SelectValue placeholder="Select input type" />
            </SelectTrigger>
            <SelectContent>
              {INPUT_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button 
          onClick={handleAddNode} 
          size="sm"
          disabled={!newTaskDescription || !newTaskInputType}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Step
        </Button>
      </div>
    </Panel>
  );
};

export default NodePanel;
