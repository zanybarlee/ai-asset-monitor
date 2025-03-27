
import EmptyWorkflowState from "./EmptyWorkflowState";
import ActiveWorkflowItem, { ActiveWorkflowProps } from "./ActiveWorkflowItem";

interface ActiveWorkflowsTabProps {
  workflows: ActiveWorkflowProps[];
}

const ActiveWorkflowsTab = ({ workflows }: ActiveWorkflowsTabProps) => {
  return (
    <>
      {workflows.length === 0 ? (
        <EmptyWorkflowState />
      ) : (
        <div className="grid gap-4">
          {workflows.map((workflow) => (
            <ActiveWorkflowItem key={workflow.id} workflow={workflow} />
          ))}
        </div>
      )}
    </>
  );
};

export default ActiveWorkflowsTab;
