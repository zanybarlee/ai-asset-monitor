
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
  description?: string;
}

export const INPUT_TYPES = [
  { value: "Yes/No", label: "Yes/No" },
  { value: "Numeric", label: "Numeric Value" },
  { value: "Text", label: "Text Input" },
  { value: "Multi-select", label: "Multi Select" },
  { value: "Date", label: "Date" }
];
