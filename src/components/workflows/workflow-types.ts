
export interface ChecklistItem {
  description: string;
  inputType: string;
  required: boolean;
  critical: boolean;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  status: string;
  department: string;
  checklist: ChecklistItem[];
}
