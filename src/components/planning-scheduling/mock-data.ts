
// Mock data for the Planning and Scheduling module

// Mock schedules for the Gantt and Calendar views
export const mockSchedules = [
  {
    id: "WO-1001",
    title: "UPS Battery Replacement",
    type: "PM",
    priority: "Critical",
    team: "electrical",
    location: "Data Hall 3",
    startDate: "2023-10-15",
    endDate: "2023-10-16",
    startTime: "09:00",
    endTime: "17:00",
    duration: 2,
    dayOffset: 1,
    assignee: "John Smith"
  },
  {
    id: "WO-1002",
    title: "CRAC Filter Replacement",
    type: "PM",
    priority: "Medium",
    team: "hvac",
    location: "Data Hall 1",
    startDate: "2023-10-16",
    endDate: "2023-10-16",
    startTime: "10:00",
    endTime: "12:00",
    duration: 1,
    dayOffset: 2,
    assignee: "Sarah Johnson"
  },
  {
    id: "WO-1003",
    title: "Generator Fuel Check",
    type: "PM",
    priority: "High",
    team: "mechanical",
    location: "External",
    startDate: "2023-10-17",
    endDate: "2023-10-17",
    startTime: "08:00",
    endTime: "10:00",
    duration: 1,
    dayOffset: 3,
    assignee: "Mike Brown"
  },
  {
    id: "WO-1004",
    title: "PDU Maintenance",
    type: "PM",
    priority: "Critical",
    team: "electrical",
    location: "Data Hall 2",
    startDate: "2023-10-18",
    endDate: "2023-10-19",
    startTime: "09:00",
    endTime: "17:00",
    duration: 2,
    dayOffset: 4,
    assignee: "Alex Davis"
  },
  {
    id: "WO-1005",
    title: "Cooling System Inspection",
    type: "PM",
    priority: "Medium",
    team: "hvac",
    location: "Cooling Plant",
    startDate: "2023-10-20",
    endDate: "2023-10-20",
    startTime: "13:00",
    endTime: "16:00",
    duration: 1,
    dayOffset: 6,
    assignee: "Lisa Chen"
  },
  {
    id: "WO-1006",
    title: "Server Rack Cleaning",
    type: "PM",
    priority: "Low",
    team: "it",
    location: "Data Hall 1",
    startDate: "2023-10-21",
    endDate: "2023-10-21",
    startTime: "10:00",
    endTime: "15:00",
    duration: 1,
    dayOffset: 0,
    assignee: "Tom Wilson"
  },
  {
    id: "WO-1007",
    title: "Fire Suppression System Test",
    type: "PM",
    priority: "High",
    team: "mechanical",
    location: "All Halls",
    startDate: "2023-10-22",
    endDate: "2023-10-23",
    startTime: "08:00",
    endTime: "17:00",
    duration: 2,
    dayOffset: 1,
    assignee: "Jane Foster"
  },
  {
    id: "WO-1008",
    title: "Emergency Lighting Check",
    type: "PM",
    priority: "Medium",
    team: "electrical",
    location: "All Areas",
    startDate: "2023-10-24",
    endDate: "2023-10-24",
    startTime: "09:00",
    endTime: "13:00",
    duration: 1,
    dayOffset: 3,
    assignee: "Kevin Park"
  }
];

// Mock backlog tasks for the Backlog Management page
export const mockBacklogTasks = [
  {
    id: "WO-985",
    title: "Replace CRAC Unit Fan",
    priority: "High",
    status: "Overdue",
    age: 15,
    location: "Data Hall 2",
    type: "CM"
  },
  {
    id: "WO-986",
    title: "Inspect Cable Trays",
    priority: "Medium",
    status: "Pending",
    age: 10,
    location: "Data Hall 1",
    type: "PM"
  },
  {
    id: "WO-987",
    title: "Calibrate Temperature Sensors",
    priority: "Low",
    status: "Scheduled",
    age: 5,
    location: "Data Hall 3",
    type: "PM"
  },
  {
    id: "WO-988",
    title: "Replace UPS Batteries",
    priority: "Critical",
    status: "Overdue",
    age: 20,
    location: "UPS Room",
    type: "PM"
  },
  {
    id: "WO-989",
    title: "Fix Water Leak",
    priority: "Critical",
    status: "Pending",
    age: 2,
    location: "Cooling Plant",
    type: "CM"
  },
  {
    id: "WO-990",
    title: "Generator Maintenance",
    priority: "High",
    status: "Scheduled",
    age: 7,
    location: "Generator Room",
    type: "PM"
  },
  {
    id: "WO-991",
    title: "PDU Firmware Update",
    priority: "Medium",
    status: "Pending",
    age: 12,
    location: "Data Hall 1",
    type: "PM"
  },
  {
    id: "WO-992",
    title: "Replace Door Security Sensors",
    priority: "Low",
    status: "Overdue",
    age: 18,
    location: "Entrances",
    type: "CM"
  }
];

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

// Mock work order type data for the dashboard
export const mockWorkOrderData = [
  { name: "Preventive", value: 230, color: "#8884d8" },
  { name: "Corrective", value: 97, color: "#82ca9d" },
  { name: "Inspection", value: 45, color: "#ffc658" },
  { name: "Other", value: 35, color: "#ff8042" },
];

// Mock compliance data for the timeline chart
export const mockTimelineData = [
  { name: "Jan", compliance: 82, target: 90 },
  { name: "Feb", compliance: 85, target: 90 },
  { name: "Mar", compliance: 78, target: 90 },
  { name: "Apr", compliance: 80, target: 90 },
  { name: "May", compliance: 85, target: 90 },
  { name: "Jun", compliance: 87, target: 90 },
  { name: "Jul", compliance: 83, target: 90 },
  { name: "Aug", compliance: 88, target: 90 },
  { name: "Sep", compliance: 85, target: 90 },
];

// Mock work type data for the pie chart
export const mockWorkTypeData = [
  { name: "HVAC", value: 45, color: "#8884d8", compliance: 88 },
  { name: "Electrical", value: 38, color: "#82ca9d", compliance: 92 },
  { name: "Mechanical", value: 28, color: "#ffc658", compliance: 85 },
  { name: "IT", value: 15, color: "#ff8042", compliance: 78 },
  { name: "Fire Systems", value: 12, color: "#8dd1e1", compliance: 95 },
];

// Mock compliance data for charts
export const mockComplianceData = [
  { name: "Week 1", value: 82 },
  { name: "Week 2", value: 85 },
  { name: "Week 3", value: 78 },
  { name: "Week 4", value: 80 },
  { name: "Week 5", value: 85 },
  { name: "Week 6", value: 87 },
  { name: "Week 7", value: 83 },
  { name: "Week 8", value: 88 },
  { name: "Week 9", value: 85 },
  { name: "Week 10", value: 82 },
  { name: "Week 11", value: 85 },
  { name: "Week 12", value: 78 },
  { name: "Week 13", value: 80 },
  { name: "Week 14", value: 85 },
  { name: "Week 15", value: 87 },
  { name: "Week 16", value: 83 },
  { name: "Week 17", value: 88 },
  { name: "Week 18", value: 85 },
  { name: "Week 19", value: 82 },
  { name: "Week 20", value: 85 },
  { name: "Week 21", value: 78 },
];
