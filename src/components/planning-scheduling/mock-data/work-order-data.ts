
// Mock work order type data for the dashboard
export const mockWorkOrderData = [
  { name: "Preventive", value: 230, color: "#8884d8" },
  { name: "Corrective", value: 97, color: "#82ca9d" },
  { name: "Inspection", value: 45, color: "#ffc658" },
  { name: "Other", value: 35, color: "#ff8042" },
];

// Mock work type data for the pie chart
export const mockWorkTypeData = [
  { name: "HVAC", value: 45, color: "#8884d8", compliance: 88 },
  { name: "Electrical", value: 38, color: "#82ca9d", compliance: 92 },
  { name: "Mechanical", value: 28, color: "#ffc658", compliance: 85 },
  { name: "IT", value: 15, color: "#ff8042", compliance: 78 },
  { name: "Fire Systems", value: 12, color: "#8dd1e1", compliance: 95 },
];

// Mock data for work order location distribution
export const mockWorkOrderLocationData = [
  { name: "Data Hall 1", pm: 45, cm: 12, other: 5 },
  { name: "Data Hall 2", pm: 38, cm: 18, other: 7 },
  { name: "UPS Room", pm: 25, cm: 8, other: 3 },
  { name: "Cooling Plant", pm: 35, cm: 22, other: 8 },
  { name: "Generator", pm: 15, cm: 5, other: 2 },
];
