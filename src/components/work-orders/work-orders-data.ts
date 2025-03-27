
export interface Part {
  id: string;
  name: string;
  partNumber: string;
  unitCost: number;
  quantity: number;
  total: number;
}

export interface LaborTask {
  id: string;
  description: string;
  assignedTo: string;
  estimatedHours: number;
  hourlyRate: number;
  total: number;
}

export interface WorkOrder {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
  dueDate: string;
  assignee: string;
  createdBy: string;
  location?: string;
  asset?: string;
  parts?: Part[];
  laborTasks?: LaborTask[];
  costTotal?: number;
  attachments?: string[];
}

export const technicians = [
  { id: "tech-001", name: "John Smith", specialty: "HVAC", available: true },
  { id: "tech-002", name: "Sarah Johnson", specialty: "Electrical", available: true },
  { id: "tech-003", name: "Michael Brown", specialty: "Plumbing", available: false },
  { id: "tech-004", name: "Emily Davis", specialty: "General", available: true },
  { id: "tech-005", name: "Robert Wilson", specialty: "Security", available: true },
  { id: "tech-006", name: "Jennifer Thompson", specialty: "IT", available: false },
];

export const dataCenterParts = [
  { id: "part-001", name: "Air Filter", partNumber: "AF-2340", unitCost: 45.99 },
  { id: "part-002", name: "Cooling Fan", partNumber: "CF-1200", unitCost: 89.50 },
  { id: "part-003", name: "Power Supply", partNumber: "PS-5500", unitCost: 129.99 },
  { id: "part-004", name: "Network Cable", partNumber: "NC-CAT6E", unitCost: 12.75 },
  { id: "part-005", name: "UPS Battery", partNumber: "UPB-1500", unitCost: 199.00 },
  { id: "part-006", name: "Server Rail Kit", partNumber: "SRK-R720", unitCost: 65.50 },
  { id: "part-007", name: "Memory Module", partNumber: "MEM-16GB", unitCost: 87.25 },
  { id: "part-008", name: "Hard Drive", partNumber: "HD-2TB-SAS", unitCost: 175.00 },
];

export const mockOrders: WorkOrder[] = [
  {
    id: "WO-1001",
    title: "HVAC Maintenance in Server Room",
    description: "Perform routine maintenance on HVAC system in the main server room.",
    status: "In Progress",
    priority: "High",
    createdAt: "2023-05-10T08:30:00Z",
    dueDate: "2023-05-17T17:00:00Z",
    assignee: "John Smith",
    createdBy: "Admin User",
    location: "Data Center - Floor 1",
    asset: "HVAC-001",
    parts: [
      {
        id: "part-001",
        name: "Air Filter",
        partNumber: "AF-2340",
        unitCost: 45.99,
        quantity: 2,
        total: 91.98
      },
      {
        id: "part-002",
        name: "Cooling Fan",
        partNumber: "CF-1200",
        unitCost: 89.50,
        quantity: 1,
        total: 89.50
      }
    ],
    laborTasks: [
      {
        id: "labor-001",
        description: "HVAC Inspection",
        assignedTo: "John Smith",
        estimatedHours: 2,
        hourlyRate: 75,
        total: 150
      }
    ],
    costTotal: 331.48
  },
  {
    id: "WO-1002",
    title: "UPS Battery Replacement",
    description: "Replace failing UPS batteries in the electrical room.",
    status: "Open",
    priority: "Critical",
    createdAt: "2023-05-11T10:15:00Z",
    dueDate: "2023-05-13T17:00:00Z",
    assignee: "Current User",
    createdBy: "System Alert",
    location: "Data Center - Floor 1",
    asset: "UPS-002",
    parts: [
      {
        id: "part-005",
        name: "UPS Battery",
        partNumber: "UPB-1500",
        unitCost: 199.00,
        quantity: 3,
        total: 597.00
      }
    ],
    costTotal: 597.00
  },
  {
    id: "WO-1003",
    title: "Network Cable Replacement",
    description: "Replace damaged network cables between racks B4 and B5.",
    status: "Completed",
    priority: "Medium",
    createdAt: "2023-05-08T13:45:00Z",
    dueDate: "2023-05-10T17:00:00Z",
    assignee: "Sarah Johnson",
    createdBy: "Current User",
    location: "Data Center - Floor 2",
    asset: "RACK-B4",
    parts: [
      {
        id: "part-004",
        name: "Network Cable",
        partNumber: "NC-CAT6E",
        unitCost: 12.75,
        quantity: 10,
        total: 127.50
      }
    ],
    laborTasks: [
      {
        id: "labor-002",
        description: "Cable Installation",
        assignedTo: "Sarah Johnson",
        estimatedHours: 1.5,
        hourlyRate: 65,
        total: 97.50
      }
    ],
    costTotal: 225.00
  },
  {
    id: "WO-1004",
    title: "Server Hardware Upgrade",
    description: "Upgrade memory and storage in production servers.",
    status: "Open",
    priority: "High",
    createdAt: "2023-05-12T09:30:00Z",
    dueDate: "2023-05-19T17:00:00Z",
    assignee: "Current User",
    createdBy: "Project Manager",
    location: "Data Center - Floor 2",
    asset: "SRV-PROD-04",
    parts: [
      {
        id: "part-007",
        name: "Memory Module",
        partNumber: "MEM-16GB",
        unitCost: 87.25,
        quantity: 8,
        total: 698.00
      },
      {
        id: "part-008",
        name: "Hard Drive",
        partNumber: "HD-2TB-SAS",
        unitCost: 175.00,
        quantity: 4,
        total: 700.00
      }
    ],
    costTotal: 1398.00
  },
  {
    id: "WO-1005",
    title: "Car Door Issue",
    description: "Car door won't close properly, requires inspection and repair.",
    status: "In Progress",
    priority: "Medium",
    createdAt: "2023-05-14T11:20:00Z",
    dueDate: "2023-05-16T17:00:00Z",
    assignee: "Current User",
    createdBy: "Facility Manager",
    location: "Parking Garage - Level B1",
    asset: "VEH-COMP-112"
  }
];
