
export interface NodeData {
  label: string;
  inputType?: string;
  required?: boolean;
  critical?: boolean;
  [key: string]: unknown; // Index signature to satisfy Record<string, unknown>
}
