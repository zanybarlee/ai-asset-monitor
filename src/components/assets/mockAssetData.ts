
export type AssetType = {
  id: string;
  name: string;
  type: string;
  status: "Operational" | "Warning" | "Critical";
  health: number;
  lastMaintenance: string;
  nextMaintenance: string;
  location: string;
  mtbf?: string;
  mttr?: string;
  sensors?: string[];
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  installDate?: string;
  warrantyExpiry?: string;
};

export const mockAssets: AssetType[] = [
  {
    id: "AC-001",
    name: "Main Cooling Unit",
    type: "HVAC",
    status: "Operational",
    health: 94,
    lastMaintenance: "2023-05-15",
    nextMaintenance: "2023-11-15",
    location: "Server Room A",
    mtbf: "4344 hrs",
    mttr: "1.2 hrs",
    sensors: ["temp-01", "humid-02"],
    manufacturer: "Schneider Electric",
    model: "ACRD1012A",
    serialNumber: "SE-29384756",
    installDate: "2021-08-15",
    warrantyExpiry: "2026-08-15"
  },
  {
    id: "PS-002",
    name: "Primary Power Supply",
    type: "Electrical",
    status: "Operational",
    health: 87,
    lastMaintenance: "2023-04-22",
    nextMaintenance: "2023-10-22",
    location: "Power Room",
  },
  {
    id: "FS-003",
    name: "Fire Suppression System",
    type: "Fire Safety",
    status: "Warning",
    health: 68,
    lastMaintenance: "2023-03-10",
    nextMaintenance: "2023-09-10",
    location: "Server Room B",
  },
  {
    id: "GN-004",
    name: "Backup Generator",
    type: "Electrical",
    status: "Operational",
    health: 91,
    lastMaintenance: "2023-06-05",
    nextMaintenance: "2023-12-05",
    location: "External Building",
  },
  {
    id: "UPS-005",
    name: "UPS System Rack 3",
    type: "Electrical",
    status: "Critical",
    health: 45,
    lastMaintenance: "2023-02-18",
    nextMaintenance: "2023-08-18",
    location: "Server Room A",
  },
  {
    id: "AC-006",
    name: "Secondary Cooling Unit",
    type: "HVAC",
    status: "Operational",
    health: 82,
    lastMaintenance: "2023-05-28",
    nextMaintenance: "2023-11-28",
    location: "Server Room C",
  },
];

export const timeSeriesData = [
  { month: "Jan", uptime: 720, downtime: 24 },
  { month: "Feb", uptime: 672, downtime: 0 },
  { month: "Mar", uptime: 744, downtime: 0 },
  { month: "Apr", uptime: 720, downtime: 0 },
  { month: "May", uptime: 744, downtime: 0 },
  { month: "Jun", uptime: 720, downtime: 8 },
];

export const failureData = [
  { month: "Jan", failures: 3 },
  { month: "Feb", failures: 2 },
  { month: "Mar", failures: 1 },
  { month: "Apr", failures: 0 },
  { month: "May", failures: 3 },
  { month: "Jun", failures: 1 },
  { month: "Jul", failures: 2 },
];
