
export interface MaintenanceTask {
  id: string;
  title: string;
  location: string;
  asset: string;
  assignee: string;
  dueDate: string;
  status: string;
  priority: string;
}

// Mock data for scheduled maintenance
export const scheduledMaintenanceList: MaintenanceTask[] = [
  {
    id: "SM-2023-001",
    title: "HVAC MAINTENANCE DAILY",
    location: "Server Room A",
    asset: "CRAC Unit 01",
    assignee: "John Doe",
    dueDate: "2023-08-15",
    status: "Pending",
    priority: "High"
  },
  {
    id: "SM-2023-002",
    title: "UPS BATTERY CHECK",
    location: "Power Room",
    asset: "UPS System",
    assignee: "Sarah Johnson",
    dueDate: "2023-08-18",
    status: "Pending",
    priority: "Critical"
  },
  {
    id: "SM-2023-003",
    title: "GENERATOR TEST RUN",
    location: "Basement",
    asset: "Backup Generator",
    assignee: "Mike Davis",
    dueDate: "2023-08-20",
    status: "Pending",
    priority: "Medium"
  },
  {
    id: "SM-2023-004",
    title: "STORM WATER PUMP INSPECTION",
    location: "Drainage System",
    asset: "Pump Station 2",
    assignee: "Alex Wong",
    dueDate: "2023-08-12",
    status: "Completed",
    priority: "High"
  }
];

// Mock data for pending tasks
export const pendingTasks: MaintenanceTask[] = [
  {
    id: "SM-2023-001",
    title: "HVAC MAINTENANCE DAILY",
    location: "Server Room A",
    asset: "CRAC Unit 01",
    assignee: "Current User",
    dueDate: "2023-08-15",
    status: "Pending",
    priority: "High"
  },
  {
    id: "SM-2023-002",
    title: "UPS BATTERY CHECK",
    location: "Power Room",
    asset: "UPS System",
    assignee: "Current User",
    dueDate: "2023-08-18",
    status: "Pending",
    priority: "Critical"
  }
];

// Mock data for involved tasks
export const involvedTasks: MaintenanceTask[] = [
  {
    id: "SM-2023-004",
    title: "STORM WATER PUMP INSPECTION",
    location: "Drainage System",
    asset: "Pump Station 2",
    assignee: "Alex Wong",
    dueDate: "2023-08-12",
    status: "Completed",
    priority: "High"
  }
];
