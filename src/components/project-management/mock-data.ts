
export type ProjectStatus = "Planning" | "Active" | "On Hold" | "Completed";
export type ProjectType = "Upgrade" | "Expansion" | "Shutdown" | "Installation" | "Maintenance";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  type: ProjectType;
  startDate: string;
  endDate: string;
  location: string;
  manager: string;
  progress: number;
  priority: "Low" | "Medium" | "High" | "Critical";
  budget: {
    total: number;
    used: number;
  };
  workOrders: {
    total: number;
    completed: number;
    inProgress: number;
  };
  teams: string[];
  milestones: {
    name: string;
    date: string;
    status: "Completed" | "On Track" | "At Risk" | "Delayed";
    project: string;
  }[];
}

export const mockProjects: Project[] = [
  {
    id: "PROJ-1001",
    name: "Data Hall 1 Expansion",
    description: "Expansion of Data Hall 1 to add 200 new rack positions and increase power capacity by 2MW",
    status: "Active",
    type: "Expansion",
    startDate: "2023-06-01",
    endDate: "2023-12-15",
    location: "Building A, Floor 2",
    manager: "Sarah Johnson",
    progress: 65,
    priority: "High",
    budget: {
      total: 2500000,
      used: 1650000
    },
    workOrders: {
      total: 28,
      completed: 18,
      inProgress: 7
    },
    teams: ["Civil", "Electrical", "Mechanical", "IT"],
    milestones: [
      {
        name: "Foundation Complete",
        date: "2023-07-15",
        status: "Completed",
        project: "Data Hall 1 Expansion"
      },
      {
        name: "Power Distribution Installed",
        date: "2023-09-01",
        status: "Completed",
        project: "Data Hall 1 Expansion"
      },
      {
        name: "Cooling Systems Commissioned",
        date: "2023-10-15",
        status: "On Track",
        project: "Data Hall 1 Expansion"
      },
      {
        name: "Rack Installation Complete",
        date: "2023-11-30",
        status: "At Risk",
        project: "Data Hall 1 Expansion"
      }
    ]
  },
  {
    id: "PROJ-1002",
    name: "UPS Replacement - Building B",
    description: "Replace 4 end-of-life UPS systems with new N+1 redundant system",
    status: "Planning",
    type: "Upgrade",
    startDate: "2023-11-01",
    endDate: "2024-02-15",
    location: "Building B, UPS Room",
    manager: "Michael Chen",
    progress: 20,
    priority: "Critical",
    budget: {
      total: 1200000,
      used: 120000
    },
    workOrders: {
      total: 16,
      completed: 3,
      inProgress: 2
    },
    teams: ["Electrical", "Operations", "Vendor"],
    milestones: [
      {
        name: "Design Approval",
        date: "2023-10-15",
        status: "Completed",
        project: "UPS Replacement - Building B"
      },
      {
        name: "Equipment Delivery",
        date: "2023-12-10",
        status: "On Track",
        project: "UPS Replacement - Building B" 
      },
      {
        name: "Installation Start",
        date: "2024-01-05",
        status: "On Track",
        project: "UPS Replacement - Building B"
      },
      {
        name: "Commissioning Complete",
        date: "2024-02-10",
        status: "On Track",
        project: "UPS Replacement - Building B"
      }
    ]
  },
  {
    id: "PROJ-1003",
    name: "Annual Generator Maintenance",
    description: "Scheduled maintenance for all backup generators",
    status: "Completed",
    type: "Maintenance",
    startDate: "2023-04-10",
    endDate: "2023-05-05",
    location: "Generator Yards A, B, C",
    manager: "Robert Taylor",
    progress: 100,
    priority: "Medium",
    budget: {
      total: 350000,
      used: 320000
    },
    workOrders: {
      total: 12,
      completed: 12,
      inProgress: 0
    },
    teams: ["Mechanical", "Electrical", "Generator Vendor"],
    milestones: [
      {
        name: "Generator Set A Completed",
        date: "2023-04-18",
        status: "Completed",
        project: "Annual Generator Maintenance"
      },
      {
        name: "Generator Set B Completed",
        date: "2023-04-25",
        status: "Completed",
        project: "Annual Generator Maintenance"
      },
      {
        name: "Generator Set C Completed",
        date: "2023-05-03",
        status: "Completed",
        project: "Annual Generator Maintenance"
      }
    ]
  },
  {
    id: "PROJ-1004",
    name: "Quarterly Scheduled Shutdown",
    description: "Q4 scheduled maintenance shutdown for critical infrastructure",
    status: "Active",
    type: "Shutdown",
    startDate: "2023-10-01",
    endDate: "2023-10-03",
    location: "Data Center Wide",
    manager: "Lisa Wong",
    progress: 75,
    priority: "Critical",
    budget: {
      total: 80000,
      used: 65000
    },
    workOrders: {
      total: 22,
      completed: 16,
      inProgress: 6
    },
    teams: ["Electrical", "Mechanical", "IT", "Security", "Cooling"],
    milestones: [
      {
        name: "Pre-Shutdown Checklist Complete",
        date: "2023-09-28",
        status: "Completed",
        project: "Quarterly Scheduled Shutdown"
      },
      {
        name: "Power Systems Maintenance",
        date: "2023-10-01",
        status: "Completed",
        project: "Quarterly Scheduled Shutdown"
      },
      {
        name: "Cooling System Inspection",
        date: "2023-10-02",
        status: "In Progress",
        project: "Quarterly Scheduled Shutdown"
      },
      {
        name: "Post-Shutdown Verification",
        date: "2023-10-03",
        status: "On Track",
        project: "Quarterly Scheduled Shutdown"
      }
    ]
  },
  {
    id: "PROJ-1005",
    name: "Network Infrastructure Upgrade",
    description: "Upgrade core switches and implement new SDN architecture",
    status: "Active",
    type: "Upgrade",
    startDate: "2023-08-15",
    endDate: "2023-11-30",
    location: "MDF and IDFs",
    manager: "Ahmed Patel",
    progress: 45,
    priority: "High",
    budget: {
      total: 750000,
      used: 320000
    },
    workOrders: {
      total: 18,
      completed: 8,
      inProgress: 5
    },
    teams: ["Network", "IT Security", "Operations"],
    milestones: [
      {
        name: "Core Switch Replacement",
        date: "2023-09-15",
        status: "Completed",
        project: "Network Infrastructure Upgrade"
      },
      {
        name: "Distribution Layer Upgrade",
        date: "2023-10-25",
        status: "At Risk",
        project: "Network Infrastructure Upgrade"
      },
      {
        name: "SDN Controller Implementation",
        date: "2023-11-10",
        status: "On Track",
        project: "Network Infrastructure Upgrade"
      },
      {
        name: "Final Testing & Documentation",
        date: "2023-11-25",
        status: "On Track",
        project: "Network Infrastructure Upgrade"
      }
    ]
  }
];

// Project stats for dashboard cards
export const projectStats = {
  all: mockProjects.length,
  active: mockProjects.filter(p => p.status === "Active").length,
  planning: mockProjects.filter(p => p.status === "Planning").length,
  completed: mockProjects.filter(p => p.status === "Completed").length,
  onHold: mockProjects.filter(p => p.status === "On Hold").length,
  onTrack: mockProjects.filter(p => p.status === "Active" && p.progress >= p.milestones.filter(m => new Date(m.date) <= new Date()).length / p.milestones.length * 100 * 0.9).length,
  atRisk: mockProjects.filter(p => p.status === "Active" && p.progress < p.milestones.filter(m => new Date(m.date) <= new Date()).length / p.milestones.length * 100 * 0.9).length,
  byType: {
    expansion: mockProjects.filter(p => p.type === "Expansion").length,
    upgrade: mockProjects.filter(p => p.type === "Upgrade").length,
    shutdown: mockProjects.filter(p => p.type === "Shutdown").length,
    installation: mockProjects.filter(p => p.type === "Installation").length,
    maintenance: mockProjects.filter(p => p.type === "Maintenance").length,
  }
};
