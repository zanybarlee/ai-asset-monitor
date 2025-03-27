
import { Node, Edge } from '@xyflow/react';
import { ChecklistItem } from '../workflow-types';
import { NodeData } from './types';

// Define node styles for different types of checklist items
export const getNodeStyle = (inputType: string) => {
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

// Define initial nodes and edges
export const initialNodes: Node<NodeData>[] = [
  {
    id: 'start',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 0 },
    className: 'bg-green-100 border-green-500 border',
  },
];

export const initialEdges: Edge[] = [];

export const createNode = (description: string, inputType: string, nodeCount: number): Node<NodeData> => {
  return {
    id: `task-${Date.now()}`,
    data: { 
      label: description,
      inputType: inputType,
      required: true,
      critical: false
    },
    position: { 
      x: 250, 
      y: (nodeCount * 100) + 50 
    },
    className: `border ${getNodeStyle(inputType)}`
  };
};

export const convertNodesToChecklistItems = (nodes: Node<NodeData>[]): ChecklistItem[] => {
  return nodes
    .filter(node => node.id !== 'start') // Skip the start node
    .map(node => ({
      description: String(node.data.label || ''),
      inputType: String(node.data.inputType || 'Text'),
      required: Boolean(node.data.required),
      critical: Boolean(node.data.critical)
    }));
};
