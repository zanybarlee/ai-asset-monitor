
import { useCallback, useState } from 'react';
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
import { ChecklistItem } from './workflow-types';
import NodePanel from './workflow-editor/NodePanel';
import ActionPanel from './workflow-editor/ActionPanel';
import { NodeData } from './workflow-editor/types';
import { initialNodes, initialEdges, createNode, convertNodesToChecklistItems } from './workflow-editor/workflow-utils';

interface WorkflowEditorProps {
  checklistItems: ChecklistItem[];
  setChecklistItems: (items: ChecklistItem[]) => void;
}

const WorkflowEditor = ({ checklistItems, setChecklistItems }: WorkflowEditorProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<NodeData>>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = (description: string, inputType: string) => {
    if (!description || !inputType) return;
    
    const newNode = createNode(description, inputType, nodes.length);
    
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
    const items = convertNodesToChecklistItems(nodes);
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
        
        <ActionPanel 
          selectedNodeId={selectedNodeId} 
          removeNode={removeNode}
          saveWorkflow={saveWorkflow}
        />
        
        <NodePanel addNode={addNode} />
      </ReactFlow>
    </div>
  );
};

export default WorkflowEditor;
