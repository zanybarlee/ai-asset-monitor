
import { Panel } from '@xyflow/react';
import { Trash, Save } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ActionPanelProps {
  selectedNodeId: string | null;
  removeNode: (nodeId: string) => void;
  saveWorkflow: () => void;
}

const ActionPanel = ({ selectedNodeId, removeNode, saveWorkflow }: ActionPanelProps) => {
  return (
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
  );
};

export default ActionPanel;
