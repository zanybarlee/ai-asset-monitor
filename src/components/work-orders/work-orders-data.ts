
export interface WorkOrder {
  id: string;
  title: string;
  priority: string;
  status: string;
  assignee: string;
  dueDate: string;
  createdAt: string;
  description: string;
  facility?: string;
  location?: string;
  asset?: string;
  parts?: Part[];
  laborTasks?: LaborTask[];
  costTotal?: number;
}

export interface Part {
  id: string;
  name: string;
  partNumber: string;
  quantity: number;
  unitCost: number;
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

export interface Technician {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  available: boolean;
}

export const mockOrders: WorkOrder[] = [
  {
    id: "WO-1001",
    title: "HVAC Maintenance Check",
    priority: "High",
    status: "Open",
    assignee: "John Doe",
    dueDate: "2023-08-18",
    createdAt: "2023-08-10",
    description: "Perform routine maintenance check on the HVAC system in Server Room A.",
    facility: "Main Data Center",
    location: "Server Room A",
    asset: "CRAC Unit 01",
    parts: [
      {
        id: "P1001",
        name: "Air Filter",
        partNumber: "AF-2023-4",
        quantity: 2,
        unitCost: 45.99,
        total: 91.98
      }
    ],
    laborTasks: [
      {
        id: "L1001",
        description: "HVAC System Inspection",
        assignedTo: "John Doe",
        estimatedHours: 2,
        hourlyRate: 75,
        total: 150
      }
    ],
    costTotal: 241.98
  },
  {
    id: "WO-1002",
    title: "Power Supply Inspection",
    priority: "Critical",
    status: "In Progress",
    assignee: "Sarah Johnson",
    dueDate: "2023-08-15",
    createdAt: "2023-08-09",
    description: "Inspect and test the backup power supply systems following recent power fluctuations.",
    facility: "Main Data Center",
    location: "Power Room",
    asset: "UPS System 02",
    parts: [
      {
        id: "P1002",
        name: "UPS Battery",
        partNumber: "UB-500-12",
        quantity: 1,
        unitCost: 350,
        total: 350
      }
    ],
    laborTasks: [
      {
        id: "L1002",
        description: "UPS Inspection and Testing",
        assignedTo: "Sarah Johnson",
        estimatedHours: 3,
        hourlyRate: 85,
        total: 255
      }
    ],
    costTotal: 605
  },
  {
    id: "WO-1003",
    title: "Fire Suppression Test",
    priority: "Medium",
    status: "Completed",
    assignee: "Mike Brown",
    dueDate: "2023-08-12",
    createdAt: "2023-08-05",
    description: "Conduct quarterly testing of the fire suppression system in Server Room B.",
    facility: "Main Data Center",
    location: "Server Room B",
    asset: "FM-200 System",
    laborTasks: [
      {
        id: "L1003",
        description: "Fire Suppression System Test",
        assignedTo: "Mike Brown",
        estimatedHours: 4,
        hourlyRate: 90,
        total: 360
      }
    ],
    costTotal: 360
  },
  {
    id: "WO-1004",
    title: "Replace UPS Batteries",
    priority: "High",
    status: "Open",
    assignee: "Unassigned",
    dueDate: "2023-08-20",
    createdAt: "2023-08-11",
    description: "Replace batteries in the UPS system that are showing signs of degradation.",
    facility: "Backup Data Center",
    location: "Power Room",
    asset: "UPS System 04",
    parts: [
      {
        id: "P1003",
        name: "UPS Battery Pack",
        partNumber: "UBP-2000",
        quantity: 4,
        unitCost: 420,
        total: 1680
      },
      {
        id: "P1004",
        name: "Battery Cables",
        partNumber: "BC-100",
        quantity: 8,
        unitCost: 15,
        total: 120
      }
    ],
    costTotal: 1800
  },
  {
    id: "WO-1005",
    title: "Network Switch Installation",
    priority: "Medium",
    status: "In Progress",
    assignee: "Alex Chen",
    dueDate: "2023-08-17",
    createdAt: "2023-08-08",
    description: "Install new network switches in Rack 5 to expand capacity.",
    facility: "Main Data Center",
    location: "Network Room",
    asset: "Rack 5",
    parts: [
      {
        id: "P1005",
        name: "Network Switch",
        partNumber: "NS-10G-48P",
        quantity: 2,
        unitCost: 2250,
        total: 4500
      },
      {
        id: "P1006",
        name: "Fiber Patch Cables",
        partNumber: "FPC-5M",
        quantity: 24,
        unitCost: 35,
        total: 840
      }
    ],
    laborTasks: [
      {
        id: "L1004",
        description: "Switch Installation and Configuration",
        assignedTo: "Alex Chen",
        estimatedHours: 6,
        hourlyRate: 95,
        total: 570
      }
    ],
    costTotal: 5910
  }
];

export const technicians: Technician[] = [
  {
    id: "T1001",
    name: "John Doe",
    specialty: "HVAC Systems",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    available: true
  },
  {
    id: "T1002",
    name: "Sarah Johnson",
    specialty: "Power Systems",
    email: "sarah.johnson@example.com",
    phone: "555-234-5678",
    available: true
  },
  {
    id: "T1003",
    name: "Mike Brown",
    specialty: "Fire Safety Systems",
    email: "mike.brown@example.com",
    phone: "555-345-6789",
    available: false
  },
  {
    id: "T1004",
    name: "Alex Chen",
    specialty: "Network Infrastructure",
    email: "alex.chen@example.com",
    phone: "555-456-7890",
    available: true
  },
  {
    id: "T1005",
    name: "Lisa Wong",
    specialty: "Cooling Systems",
    email: "lisa.wong@example.com",
    phone: "555-567-8901",
    available: true
  }
];

export const dataCenterParts: Part[] = [
  {
    id: "P1001",
    name: "Air Filter",
    partNumber: "AF-2023-4",
    quantity: 25,
    unitCost: 45.99,
    total: 1149.75
  },
  {
    id: "P1002",
    name: "UPS Battery",
    partNumber: "UB-500-12",
    quantity: 12,
    unitCost: 350,
    total: 4200
  },
  {
    id: "P1003",
    name: "UPS Battery Pack",
    partNumber: "UBP-2000",
    quantity: 8,
    unitCost: 420,
    total: 3360
  },
  {
    id: "P1004",
    name: "Battery Cables",
    partNumber: "BC-100",
    quantity: 50,
    unitCost: 15,
    total: 750
  },
  {
    id: "P1005",
    name: "Network Switch",
    partNumber: "NS-10G-48P",
    quantity: 4,
    unitCost: 2250,
    total: 9000
  },
  {
    id: "P1006",
    name: "Fiber Patch Cables",
    partNumber: "FPC-5M",
    quantity: 100,
    unitCost: 35,
    total: 3500
  },
  {
    id: "P1007",
    name: "HVAC Coolant",
    partNumber: "HC-R410A",
    quantity: 5,
    unitCost: 120,
    total: 600
  },
  {
    id: "P1008",
    name: "Server Rack Fan",
    partNumber: "SRF-120MM",
    quantity: 20,
    unitCost: 45,
    total: 900
  }
];
