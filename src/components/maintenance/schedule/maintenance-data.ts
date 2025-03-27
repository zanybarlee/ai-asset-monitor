
export interface MaintenanceTask {
  id: string;
  title: string;
  location: string;
  asset: string;
  assignee: string;
  dueDate: string;
  status: string;
  priority: string;
  description?: string;
  maintenanceType?: string;
  estimatedDuration?: string;
  lastPerformed?: string;
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
    priority: "High",
    maintenanceType: "Preventive",
    estimatedDuration: "45 minutes",
    description: "Inspect filters, check coolant levels, verify temperature readings, clean coils if necessary"
  },
  {
    id: "SM-2023-002",
    title: "UPS BATTERY CHECK",
    location: "Power Room",
    asset: "UPS System",
    assignee: "Sarah Johnson",
    dueDate: "2023-08-18",
    status: "In Progress",
    priority: "Critical",
    maintenanceType: "Preventive",
    estimatedDuration: "2 hours",
    description: "Test battery voltage, inspect connections, check runtime performance"
  },
  {
    id: "SM-2023-003",
    title: "GENERATOR TEST RUN",
    location: "Basement",
    asset: "Backup Generator",
    assignee: "Mike Davis",
    dueDate: "2023-08-20",
    status: "Pending",
    priority: "Medium",
    maintenanceType: "Preventive",
    estimatedDuration: "1 hour",
    description: "Start generator, verify output voltage, check fuel levels, inspect for leaks"
  },
  {
    id: "SM-2023-004",
    title: "STORM WATER PUMP INSPECTION",
    location: "Drainage System",
    asset: "Pump Station 2",
    assignee: "Alex Wong",
    dueDate: "2023-08-12",
    status: "Completed",
    priority: "High",
    maintenanceType: "Preventive",
    estimatedDuration: "30 minutes",
    lastPerformed: "2023-08-12"
  },
  {
    id: "SM-2023-005",
    title: "FIRE SUPPRESSION SYSTEM TEST",
    location: "Data Center",
    asset: "FM-200 System",
    assignee: "Emily Chen",
    dueDate: "2023-09-05",
    status: "Scheduled",
    priority: "Critical",
    maintenanceType: "Regulatory",
    estimatedDuration: "4 hours",
    description: "Annual test of fire suppression system per NFPA requirements"
  },
  {
    id: "SM-2023-006",
    title: "COOLING TOWER MAINTENANCE",
    location: "Roof",
    asset: "Cooling Tower #2",
    assignee: "Robert Miller",
    dueDate: "2023-08-28",
    status: "Pending",
    priority: "Medium",
    maintenanceType: "Preventive",
    estimatedDuration: "3 hours",
    description: "Clean basin, check water treatment chemicals, inspect fan blades"
  },
  {
    id: "SM-2023-007",
    title: "ELEVATOR QUARTERLY SERVICE",
    location: "Main Building",
    asset: "Elevator #1",
    assignee: "Elevator Tech Ltd.",
    dueDate: "2023-09-15",
    status: "Scheduled",
    priority: "Medium",
    maintenanceType: "Contracted",
    estimatedDuration: "2 hours",
    description: "Quarterly service by contracted elevator maintenance company"
  },
  {
    id: "SM-2023-008",
    title: "EMERGENCY LIGHTING TEST",
    location: "All Floors",
    asset: "Emergency Lighting System",
    assignee: "Safety Team",
    dueDate: "2023-08-30",
    status: "Pending",
    priority: "High",
    maintenanceType: "Regulatory",
    estimatedDuration: "3 hours",
    description: "Monthly test of all emergency lighting systems and exit signs"
  },
  {
    id: "SM-2023-009",
    title: "CHILLER INSPECTION",
    location: "Mechanical Room",
    asset: "Chiller #1",
    assignee: "HVAC Team",
    dueDate: "2023-09-10",
    status: "Scheduled",
    priority: "High",
    maintenanceType: "Preventive",
    estimatedDuration: "2 hours",
    description: "Check refrigerant levels, inspect compressor, verify operating temperatures"
  },
  {
    id: "SM-2023-010",
    title: "AHU FILTER REPLACEMENT",
    location: "Roof",
    asset: "AHU-3",
    assignee: "Maintenance Team",
    dueDate: "2023-08-22",
    status: "Pending",
    priority: "Medium",
    maintenanceType: "Preventive",
    estimatedDuration: "1.5 hours",
    description: "Replace air filters, clean condensate pan, check belts"
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
    priority: "High",
    maintenanceType: "Preventive",
    estimatedDuration: "45 minutes"
  },
  {
    id: "SM-2023-002",
    title: "UPS BATTERY CHECK",
    location: "Power Room",
    asset: "UPS System",
    assignee: "Current User",
    dueDate: "2023-08-18",
    status: "Pending",
    priority: "Critical",
    maintenanceType: "Preventive",
    estimatedDuration: "2 hours"
  },
  {
    id: "SM-2023-008",
    title: "EMERGENCY LIGHTING TEST",
    location: "All Floors",
    asset: "Emergency Lighting System",
    assignee: "Current User",
    dueDate: "2023-08-30",
    status: "Pending",
    priority: "High",
    maintenanceType: "Regulatory",
    estimatedDuration: "3 hours"
  },
  {
    id: "SM-2023-011",
    title: "PLUMBING LEAK REPAIR",
    location: "Restroom 2F",
    asset: "Sink Fixture",
    assignee: "Current User",
    dueDate: "2023-08-14",
    status: "Pending",
    priority: "Medium",
    maintenanceType: "Corrective",
    estimatedDuration: "1 hour",
    description: "Fix leaking faucet and replace gasket"
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
    priority: "High",
    maintenanceType: "Preventive",
    estimatedDuration: "30 minutes",
    lastPerformed: "2023-08-12"
  },
  {
    id: "SM-2023-012",
    title: "DOOR ACCESS SYSTEM MAINTENANCE",
    location: "Security Room",
    asset: "Access Control Panel",
    assignee: "Security Team",
    dueDate: "2023-08-08",
    status: "Completed",
    priority: "Medium",
    maintenanceType: "Preventive",
    estimatedDuration: "1.5 hours",
    lastPerformed: "2023-08-08"
  },
  {
    id: "SM-2023-013",
    title: "ELECTRICAL PANEL INSPECTION",
    location: "Electrical Room",
    asset: "Main Distribution Panel",
    assignee: "Electrical Team",
    dueDate: "2023-08-05",
    status: "Completed",
    priority: "High",
    maintenanceType: "Preventive",
    estimatedDuration: "2 hours",
    lastPerformed: "2023-08-05"
  }
];

// Additional data for work orders
export const workOrders: MaintenanceTask[] = [
  {
    id: "WO-2023-001",
    title: "REPAIR AIR CONDITIONING UNIT",
    location: "Office Area 3F",
    asset: "Split AC Unit 3",
    assignee: "HVAC Team",
    dueDate: "2023-08-16",
    status: "In Progress",
    priority: "High",
    maintenanceType: "Corrective",
    estimatedDuration: "3 hours",
    description: "Unit not cooling properly, possible refrigerant leak"
  },
  {
    id: "WO-2023-002",
    title: "REPLACE BROKEN WINDOW",
    location: "Conference Room A",
    asset: "Window Panel East",
    assignee: "Facilities Team",
    dueDate: "2023-08-17",
    status: "Scheduled",
    priority: "Medium",
    maintenanceType: "Corrective",
    estimatedDuration: "1.5 hours",
    description: "Replace cracked window panel with new safety glass"
  },
  {
    id: "WO-2023-003",
    title: "INVESTIGATE WATER LEAK",
    location: "Server Room B",
    asset: "Ceiling Area",
    assignee: "Plumbing Team",
    dueDate: "2023-08-14",
    status: "Critical",
    priority: "Critical",
    maintenanceType: "Emergency",
    estimatedDuration: "Unknown",
    description: "Water dripping from ceiling near server racks. Immediate investigation required."
  }
];
