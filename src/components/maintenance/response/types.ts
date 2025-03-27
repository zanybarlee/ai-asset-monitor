
import { MaintenanceTask } from "../schedule/maintenance-data";

export interface Part {
  id: string;
  name: string;
  quantity: number;
  cost: number;
}

export interface Labor {
  id: string;
  description: string;
  hours: number;
  rate: number;
}

export interface ResponseDialogProps {
  open: boolean;
  onClose: () => void;
  task: MaintenanceTask;
}
