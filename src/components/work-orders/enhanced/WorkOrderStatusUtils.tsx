
import { Clock, Wrench } from "lucide-react";

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Open":
      return "bg-blue-500";
    case "In Progress":
      return "bg-amber-500";
    case "Pending":
      return "bg-purple-500";
    case "Completed":
      return "bg-emerald-500";
    case "Delayed":
      return "bg-destructive";
    default:
      return "bg-secondary";
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Critical":
      return "bg-destructive/90 text-white";
    case "High":
      return "bg-amber-500/90 text-white";
    case "Medium":
      return "bg-blue-500/90 text-white";
    case "Low":
      return "bg-secondary text-secondary-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "Open":
      return <Clock className="h-4 w-4" />;
    case "In Progress":
      return <Wrench className="h-4 w-4" />;
    case "Pending":
      return <Clock className="h-4 w-4" />;
    case "Completed":
      return <Clock className="h-4 w-4" />;
    default:
      return null;
  }
};
