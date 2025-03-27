
// Mock staff data for the Resource Optimization page
export const mockStaffData = [
  {
    id: 1,
    name: "John Smith",
    role: "Senior Technician",
    department: "electrical",
    skills: ["UPS Systems", "Power Distribution", "Electrical Safety"],
    available: true,
    workload: 85,
    assignedTasks: 4,
    completedTasks: 12
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "HVAC Specialist",
    department: "hvac",
    skills: ["CRAC Units", "Chiller Systems", "Temperature Control"],
    available: true,
    workload: 65,
    assignedTasks: 3,
    completedTasks: 8
  },
  {
    id: 3,
    name: "Mike Brown",
    role: "Mechanical Engineer",
    department: "mechanical",
    skills: ["Generators", "Fuel Systems", "Fire Suppression"],
    available: false,
    workload: 0,
    assignedTasks: 0,
    completedTasks: 15
  },
  {
    id: 4,
    name: "Alex Davis",
    role: "Senior Electrician",
    department: "electrical",
    skills: ["PDU Maintenance", "Circuit Analysis", "Emergency Power"],
    available: true,
    workload: 90,
    assignedTasks: 5,
    completedTasks: 20
  },
  {
    id: 5,
    name: "Lisa Chen",
    role: "HVAC Technician",
    department: "hvac",
    skills: ["Cooling Systems", "Air Handling", "Preventive Maintenance"],
    available: true,
    workload: 75,
    assignedTasks: 4,
    completedTasks: 10
  },
  {
    id: 6,
    name: "Tom Wilson",
    role: "IT Specialist",
    department: "it",
    skills: ["Server Hardware", "Rack Management", "Network Infrastructure"],
    available: true,
    workload: 60,
    assignedTasks: 2,
    completedTasks: 6
  }
];

// Mock team data for the Resource Optimization page
export const mockTeamData = [
  { name: "Mechanical", current: 75, optimal: 80, capacity: 90, memberCount: 8 },
  { name: "Electrical", current: 85, optimal: 75, capacity: 95, memberCount: 10 },
  { name: "HVAC", current: 60, optimal: 70, capacity: 75, memberCount: 7 },
  { name: "IT Support", current: 90, optimal: 75, capacity: 100, memberCount: 6 },
];

// Mock resource utilization data for the dashboard
export const mockResourceData = [
  { name: "Week 1", utilization: 65, capacity: 90 },
  { name: "Week 2", utilization: 70, capacity: 90 },
  { name: "Week 3", utilization: 85, capacity: 90 },
  { name: "Week 4", utilization: 75, capacity: 90 },
];
