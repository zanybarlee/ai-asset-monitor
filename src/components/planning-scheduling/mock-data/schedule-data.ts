
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
    assignee: "John Smith",
    status: "Scheduled"
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
    assignee: "Sarah Johnson",
    status: "Scheduled"
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
    assignee: "Mike Brown",
    status: "Scheduled"
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
    assignee: "Alex Davis",
    status: "Scheduled"
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
    assignee: "Lisa Chen",
    status: "Scheduled"
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
    assignee: "Tom Wilson",
    status: "Scheduled"
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
    assignee: "Jane Foster",
    status: "Scheduled"
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
    assignee: "Kevin Park",
    status: "Scheduled"
  },
  // Adding new upcoming tasks
  {
    id: "WO-2001",
    title: "Chiller Maintenance",
    type: "PM",
    priority: "High",
    team: "hvac",
    location: "Main Plant Room",
    startDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0],
    endDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0],
    startTime: "08:00",
    endTime: "16:00",
    duration: 2,
    dayOffset: 0,
    assignee: "Michael Chen",
    status: "Upcoming"
  },
  {
    id: "WO-2002",
    title: "Switchgear Inspection",
    type: "PM",
    priority: "Critical",
    team: "electrical",
    location: "Electrical Room",
    startDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
    startTime: "09:00",
    endTime: "12:00",
    duration: 1,
    dayOffset: 0,
    assignee: "Sarah Williams",
    status: "Upcoming" 
  },
  {
    id: "WO-2003",
    title: "Air Handling Unit Service",
    type: "PM",
    priority: "Medium",
    team: "hvac",
    location: "Roof",
    startDate: new Date(new Date().setDate(new Date().getDate() + 4)).toISOString().split('T')[0],
    endDate: new Date(new Date().setDate(new Date().getDate() + 4)).toISOString().split('T')[0],
    startTime: "10:00",
    endTime: "15:00",
    duration: 1,
    dayOffset: 0,
    assignee: "Robert Johnson",
    status: "Upcoming"
  },
  {
    id: "WO-2004",
    title: "Roof Drain Cleaning",
    type: "PM",
    priority: "Medium",
    team: "mechanical",
    location: "Roof",
    startDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0],
    endDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0],
    startTime: "13:00",
    endTime: "16:00",
    duration: 1,
    dayOffset: 0,
    assignee: "Jennifer Adams",
    status: "Upcoming"
  },
  {
    id: "WO-2005",
    title: "Fire Alarm Testing",
    type: "CM",
    priority: "Critical",
    team: "electrical",
    location: "All Halls",
    startDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0],
    endDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0],
    startTime: "07:00",
    endTime: "09:00",
    duration: 1,
    dayOffset: 0,
    assignee: "Mark Wilson",
    status: "Upcoming"
  }
];

// Add separate upcoming tasks function for better organization
export const getUpcomingTasks = () => {
  const today = new Date();
  return mockSchedules.filter(task => {
    const taskDate = new Date(task.startDate);
    return taskDate >= today && task.status === "Upcoming";
  }).sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  }).slice(0, 5); // Get the nearest 5 upcoming tasks
};

// Get scheduled maintenance tasks
export const getScheduledMaintenance = () => {
  return mockSchedules.filter(task => task.status === "Scheduled");
};
