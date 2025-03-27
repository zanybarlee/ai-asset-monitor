
export interface NodeData {
  label: string;
  inputType?: string;
  required?: boolean;
  critical?: boolean;
  id?: string;
  [key: string]: unknown; // Index signature to satisfy Record<string, unknown>
}
