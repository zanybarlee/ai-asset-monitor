
import { useState, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Plus, Trash, Save } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { INPUT_TYPES, ChecklistItem } from './workflow-types';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Define node data type to ensure correct typing
interface NodeData {
  label: string;
  inputType?: string;
  required?: boolean;
  critical?: boolean;
}

// Define initial nodes and edges
const initialNodes: Node<NodeData>[] = [
  {
    id: 'start',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 0 },
    className: 'bg-green-100 border-green-500 border',
  },
];

const initialEdges: Edge[] = [];

// Define node styles for different types of checklist items
const getNodeStyle = (inputType: string) => {
  switch (inputType) {
    case 'Yes/No':
      return 'bg-blue-50 border-blue-400';
    case 'Numeric':
      return 'bg-purple-50 border-purple-400';
    case 'Text':
      return 'bg-yellow-50 border-yellow-400';
    case 'Multi-select':
      return 'bg-orange-50 border-orange-400';
    case 'Date':
      return 'bg-green-50 border-green-400';
    default:
      return 'bg-gray-50 border-gray-400';
  }
};

interface WorkflowEditorProps {
  checklistItems: ChecklistItem[];
  setChecklistItems: (items: ChecklistItem[]) => void;
}

const WorkflowEditor = ({ checklistItems, setChecklistItems }: WorkflowEditorProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  // New task form state
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskInputType, setNewTaskInputType] = useState('');
  
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = () => {
    if (!newTaskDescription || !newTaskInputType) return;
    
    const newNode: Node<NodeData> = {
      id: `task-${Date.now()}`,
      data: { 
        label: newTaskDescription,
        inputType: newTaskInputType,
        required: true,
        critical: false
      },
      position: { 
        x: 250, 
        y: (nodes.length * 100) + 50 
      },
      className: `border ${getNodeStyle(newTaskInputType)}`
    };
    
    setNodes((nds) => [...nds, newNode]);
    
    // Connect to previous node if it exists
    if (nodes.length > 0) {
      const lastNodeId = nodes[nodes.length - 1].id;
      const newEdge: Edge = {
        id: `edge-${lastNodeId}-${newNode.id}`,
        source: lastNodeId,
        target: newNode.id,
        animated: true,
      };
      setEdges((eds) => [...eds, newEdge]);
    }
    
    // Reset form
    setNewTaskDescription('');
    setNewTaskInputType('');
  };
  
  const removeNode = (nodeId: string) => {
    if (nodeId === 'start') return; // Prevent removing start node
    
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => 
      edge.source !== nodeId && edge.target !== nodeId
    ));
    
    if (selectedNodeId === nodeId) {
      setSelectedNodeId(null);
    }
  };
  
  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id === selectedNodeId ? null : node.id);
  };
  
  const saveWorkflow = () => {
    // Convert nodes to checklist items with proper typing
    const items: ChecklistItem[] = nodes
      .filter(node => node.id !== 'start') // Skip the start node
      .map(node => ({
        description: String(node.data.label || ''),
        inputType: String(node.data.inputType || 'Text'),
        required: Boolean(node.data.required),
        critical: Boolean(node.data.critical)
      }));
    
    setChecklistItems(items);
  };

  return (
    <div className="h-[400px] border rounded-md">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background />
        
        <Panel position="top-right" className="bg-white p-2 rounded-md shadow-sm border">
          <div className="flex gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => selectedNodeId && removeNode(selectedNodeId)}
              disabled={!selectedNodeId || selectedNodeId === 'start'}
            >
              <Trash className="h-4 w-4 mr-1" />
              Remove Selected
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={saveWorkflow}
            >
              <Save className="h-4 w-4 mr-1" />
              Save Workflow
            </Button>
          </div>
        </Panel>
        
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
              onClick={addNode} 
              size="sm"
              disabled={!newTaskDescription || !newTaskInputType}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Step
            </Button>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default WorkflowEditor;
