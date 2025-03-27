
import { useState, useEffect } from 'react';
import { Panel } from '@xyflow/react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { INPUT_TYPES } from '../workflow-types';
import { NodeData } from './types';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface NodePropertiesPanelProps {
  selectedNode: NodeData | null;
  updateNodeProperties: (nodeId: string, data: Partial<NodeData>) => void;
}

const NodePropertiesPanel = ({ selectedNode, updateNodeProperties }: NodePropertiesPanelProps) => {
  const [description, setDescription] = useState<string>('');
  const [inputType, setInputType] = useState<string>('');
  const [required, setRequired] = useState<boolean>(true);
  const [critical, setCritical] = useState<boolean>(false);

  // Update local state when selected node changes
  useEffect(() => {
    if (selectedNode) {
      setDescription(selectedNode.label || '');
      setInputType(selectedNode.inputType || '');
      setRequired(selectedNode.required || false);
      setCritical(selectedNode.critical || false);
    }
  }, [selectedNode]);

  if (!selectedNode || selectedNode.id === 'start') {
    return null;
  }

  const handleSaveChanges = () => {
    if (selectedNode && selectedNode.id) {
      updateNodeProperties(selectedNode.id, {
        label: description,
        inputType,
        required,
        critical
      });
    }
  };

  return (
    <Panel position="top-right" className="bg-white p-3 rounded-md shadow-sm border mt-16">
      <div className="space-y-3 w-64">
        <h3 className="text-sm font-medium">Edit Node Properties</h3>
        
        <div className="space-y-1">
          <Label htmlFor="node-description" className="text-xs">Description</Label>
          <Input 
            id="node-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-sm"
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="node-input-type" className="text-xs">Input Type</Label>
          <Select value={inputType} onValueChange={setInputType}>
            <SelectTrigger id="node-input-type" className="text-sm">
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
        
        <div className="flex items-center justify-between">
          <Label htmlFor="node-required" className="text-xs">Required</Label>
          <Switch 
            id="node-required" 
            checked={required}
            onCheckedChange={setRequired}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="node-critical" className="text-xs">Critical</Label>
          <Switch 
            id="node-critical" 
            checked={critical}
            onCheckedChange={setCritical}
          />
        </div>
        
        <Button 
          onClick={handleSaveChanges} 
          size="sm"
          className="w-full"
        >
          <Save className="h-4 w-4 mr-1" />
          Save Changes
        </Button>
      </div>
    </Panel>
  );
};

export default NodePropertiesPanel;
