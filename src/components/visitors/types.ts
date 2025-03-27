
export interface Visitor {
  id: string;
  name: string;
  company: string;
  purpose: string;
  host: string;
  checkIn: string | null;
  checkOut: string | null;
  status: string;
  scheduledTime?: string;
  accessLevel?: string;
  requiresEscort?: boolean;
  email?: string;
  phone?: string;
}

export interface VisitorMovement {
  timestamp: string;
  zone: string;
  action: string;
}

export type VisitorMovementsRecord = Record<string, VisitorMovement[]>;
