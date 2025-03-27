
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CreateTaskButtonProps {
  onClick: () => void;
}

const CreateTaskButton = ({ onClick }: CreateTaskButtonProps) => {
  return (
    <Button onClick={onClick}>
      <Plus className="mr-2 h-4 w-4" />
      Create Task
    </Button>
  );
};

export default CreateTaskButton;
