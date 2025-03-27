
// Mock data for People Management module

// Personnel Data
export const mockPersonnel = [
  {
    id: "p1",
    name: "Ahmed Al-Farsi",
    jobTitle: "Senior Technician",
    department: "Facilities",
    type: "Employee",
    email: "ahmed.alfarsi@aramco.com",
    phone: "+966 50 123 4567",
    avatar: "",
    skills: ["HVAC Systems", "Electrical Systems", "Mechanical Engineering", "Emergency Response"],
    certifications: ["HVAC Certified", "Electrical Safety", "First Aid"],
    location: "Building A, Floor 2",
    hireDate: "2019-03-15",
    manager: "Fatima Al-Zahrani",
    status: "Active"
  },
  {
    id: "p2",
    name: "Fatima Al-Zahrani",
    jobTitle: "Facilities Manager",
    department: "Management",
    type: "Employee",
    email: "fatima.alzahrani@aramco.com",
    phone: "+966 50 987 6543",
    avatar: "",
    skills: ["Team Leadership", "Strategic Planning", "Budget Management", "Vendor Relations"],
    certifications: ["Project Management Professional", "Facility Management Professional"],
    location: "Building A, Floor 3",
    hireDate: "2017-06-10",
    manager: "Khalid Al-Omar",
    status: "Active"
  },
  {
    id: "p3",
    name: "Mohammad Al-Qahtani",
    jobTitle: "IT Network Specialist",
    department: "IT",
    type: "Employee",
    email: "mohammad.alqahtani@aramco.com",
    phone: "+966 55 555 1234",
    avatar: "",
    skills: ["Network Security", "Cisco Systems", "Firewall Configuration", "Network Monitoring"],
    certifications: ["CCNA", "Network+", "Security+"],
    location: "Building B, Floor 1",
    hireDate: "2020-01-20",
    manager: "Saleh Al-Harbi",
    status: "Active"
  },
  {
    id: "p4",
    name: "Layla Al-Amri",
    jobTitle: "Security Officer",
    department: "Security",
    type: "Employee",
    email: "layla.alamri@aramco.com",
    phone: "+966 50 222 3456",
    avatar: "",
    skills: ["CCTV Monitoring", "Access Control Systems", "Emergency Protocols", "Security Audits"],
    certifications: ["Security Officer Certificate", "First Aid"],
    location: "Building A, Ground Floor",
    hireDate: "2021-07-12",
    manager: "Ibrahim Al-Shahrani",
    status: "Active"
  },
  {
    id: "p5",
    name: "Khalid Al-Omar",
    jobTitle: "Operations Director",
    department: "Management",
    type: "Employee",
    email: "khalid.alomar@aramco.com",
    phone: "+966 50 876 5432",
    avatar: "",
    skills: ["Leadership", "Strategic Planning", "Budget Optimization", "Crisis Management"],
    certifications: ["MBA", "Six Sigma Black Belt", "ISO 9001 Lead Auditor"],
    location: "Building A, Floor 4",
    hireDate: "2015-11-08",
    manager: "",
    status: "Active"
  },
  {
    id: "p6",
    name: "John Smith",
    jobTitle: "UPS Systems Specialist",
    department: "Operations",
    type: "Contractor",
    email: "john.smith@vendor.com",
    phone: "+1 555 123 4567",
    avatar: "",
    skills: ["UPS Systems", "Electrical Engineering", "Power Management", "Battery Systems"],
    certifications: ["UPS Technical Certification", "Electrical Safety"],
    location: "Various",
    hireDate: "2022-02-15",
    manager: "Fatima Al-Zahrani",
    status: "Active"
  },
  {
    id: "p7",
    name: "Tech Systems Inc.",
    jobTitle: "HVAC Maintenance Provider",
    department: "Facilities",
    type: "Vendor",
    email: "support@techsystems.com",
    phone: "+1 800 555 9876",
    avatar: "",
    skills: ["HVAC Maintenance", "Cooling Systems", "Air Quality Management"],
    certifications: ["ISO 9001", "HVAC Excellence"],
    location: "External",
    hireDate: "2020-09-30",
    manager: "Fatima Al-Zahrani",
    status: "Active"
  },
  {
    id: "p8",
    name: "Saleh Al-Harbi",
    jobTitle: "IT Manager",
    department: "IT",
    type: "Employee",
    email: "saleh.alharbi@aramco.com",
    phone: "+966 55 444 7890",
    avatar: "",
    skills: ["IT Infrastructure", "Team Management", "Project Planning", "Cloud Systems"],
    certifications: ["ITIL Master", "AWS Certified Solutions Architect", "PMP"],
    location: "Building B, Floor 2",
    hireDate: "2018-04-22",
    manager: "Khalid Al-Omar",
    status: "Active"
  }
];

// Certification Data
export const mockCertifications = [
  {
    id: "c1",
    personId: "p1",
    person: "Ahmed Al-Farsi",
    name: "HVAC Certified",
    issuer: "HVAC Association",
    issueDate: "2022-01-15",
    expiryDate: "2024-01-15",
    status: "Valid"
  },
  {
    id: "c2",
    personId: "p1",
    person: "Ahmed Al-Farsi",
    name: "Electrical Safety",
    issuer: "Electrical Safety Board",
    issueDate: "2021-05-20",
    expiryDate: "2023-05-20",
    status: "Expired"
  },
  {
    id: "c3",
    personId: "p1",
    person: "Ahmed Al-Farsi",
    name: "First Aid",
    issuer: "Red Crescent",
    issueDate: "2022-10-10",
    expiryDate: "2024-10-10",
    status: "Valid"
  },
  {
    id: "c4",
    personId: "p2",
    person: "Fatima Al-Zahrani",
    name: "Project Management Professional",
    issuer: "PMI",
    issueDate: "2020-03-25",
    expiryDate: "2023-03-25",
    status: "Expired"
  },
  {
    id: "c5",
    personId: "p2",
    person: "Fatima Al-Zahrani",
    name: "Facility Management Professional",
    issuer: "IFMA",
    issueDate: "2021-07-15",
    expiryDate: "2024-07-15",
    status: "Valid"
  },
  {
    id: "c6",
    personId: "p3",
    person: "Mohammad Al-Qahtani",
    name: "CCNA",
    issuer: "Cisco",
    issueDate: "2022-02-10",
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString().split('T')[0],
    status: "Expiring Soon"
  },
  {
    id: "c7",
    personId: "p3",
    person: "Mohammad Al-Qahtani",
    name: "Network+",
    issuer: "CompTIA",
    issueDate: "2021-11-05",
    expiryDate: "2024-11-05",
    status: "Valid"
  },
  {
    id: "c8",
    personId: "p3",
    person: "Mohammad Al-Qahtani",
    name: "Security+",
    issuer: "CompTIA",
    issueDate: "2022-06-15",
    expiryDate: "2025-06-15",
    status: "Valid"
  },
  {
    id: "c9",
    personId: "p4",
    person: "Layla Al-Amri",
    name: "Security Officer Certificate",
    issuer: "Security Services Association",
    issueDate: "2021-08-20",
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split('T')[0],
    status: "Expiring Soon"
  },
  {
    id: "c10",
    personId: "p6",
    person: "John Smith",
    name: "UPS Technical Certification",
    issuer: "UPS Manufacturers Association",
    issueDate: "2022-03-10",
    expiryDate: "2024-03-10",
    status: "Valid"
  }
];

// Staff Schedule Data
export const mockSchedules = [
  {
    id: "s1",
    personId: "p1",
    person: "Ahmed Al-Farsi",
    role: "Senior Technician",
    department: "Facilities",
    startDate: "2023-08-15",
    endDate: "2023-08-15",
    startTime: "08:00",
    endTime: "16:00",
    status: "Scheduled"
  },
  {
    id: "s2",
    personId: "p1",
    person: "Ahmed Al-Farsi",
    role: "Senior Technician",
    department: "Facilities",
    startDate: "2023-08-16",
    endDate: "2023-08-16",
    startTime: "08:00",
    endTime: "16:00",
    status: "Scheduled"
  },
  {
    id: "s3",
    personId: "p1",
    person: "Ahmed Al-Farsi",
    role: "Senior Technician",
    department: "Facilities",
    startDate: "2023-08-17",
    endDate: "2023-08-17",
    startTime: "08:00",
    endTime: "16:00",
    status: "Scheduled"
  },
  {
    id: "s4",
    personId: "p3",
    person: "Mohammad Al-Qahtani",
    role: "IT Network Specialist",
    department: "IT",
    startDate: "2023-08-15",
    endDate: "2023-08-15",
    startTime: "09:00",
    endTime: "17:00",
    status: "Scheduled"
  },
  {
    id: "s5",
    personId: "p3",
    person: "Mohammad Al-Qahtani",
    role: "IT Network Specialist",
    department: "IT",
    startDate: "2023-08-16",
    endDate: "2023-08-16",
    startTime: "09:00",
    endTime: "17:00",
    status: "Scheduled"
  },
  {
    id: "s6",
    personId: "p3",
    person: "Mohammad Al-Qahtani",
    role: "IT Network Specialist",
    department: "IT",
    startDate: "2023-08-17",
    endDate: "2023-08-17",
    startTime: "09:00",
    endTime: "17:00",
    status: "Scheduled"
  },
  {
    id: "s7",
    personId: "p4",
    person: "Layla Al-Amri",
    role: "Security Officer",
    department: "Security",
    startDate: "2023-08-15",
    endDate: "2023-08-15",
    startTime: "20:00",
    endTime: "08:00",
    status: "Scheduled"
  },
  {
    id: "s8",
    personId: "p4",
    person: "Layla Al-Amri",
    role: "Security Officer",
    department: "Security",
    startDate: "2023-08-16",
    endDate: "2023-08-16",
    startTime: "20:00",
    endTime: "08:00",
    status: "Scheduled"
  }
];

// Safety Incidents Data
export const mockSafetyIncidents = [
  {
    id: "i1",
    title: "HVAC Gas Leak",
    description: "Small refrigerant leak detected in HVAC system in server room B.",
    severity: "Medium",
    date: "2023-08-10",
    reportedBy: "Ahmed Al-Farsi",
    location: "Server Room B",
    status: "In Progress",
    assignedTo: "Ahmed Al-Farsi",
    actions: [
      "Isolated affected unit",
      "Ordered replacement parts",
      "Scheduled repair for August 12"
    ]
  },
  {
    id: "i2",
    title: "Tripping Hazard",
    description: "Exposed cabling near workstation area creating tripping hazard.",
    severity: "Low",
    date: "2023-08-08",
    reportedBy: "Layla Al-Amri",
    location: "Office Area, Floor 2",
    status: "Resolved",
    assignedTo: "Mohammad Al-Qahtani",
    actions: [
      "Secured cables with cable management system",
      "Installed warning signs",
      "Added to monthly safety checklist"
    ]
  },
  {
    id: "i3",
    title: "UPS Battery Overheating",
    description: "UPS battery bank showing signs of overheating during routine inspection.",
    severity: "High",
    date: "2023-08-12",
    reportedBy: "John Smith",
    location: "Power Room A",
    status: "In Progress",
    assignedTo: "John Smith",
    actions: [
      "Shut down affected battery bank",
      "Added temporary cooling measures",
      "Contacted manufacturer for emergency service"
    ]
  },
  {
    id: "i4",
    title: "Water Leak Near Electrical Panel",
    description: "Water leak from cooling system detected near main electrical panel.",
    severity: "Critical",
    date: "2023-08-11",
    reportedBy: "Ahmed Al-Farsi",
    location: "Electrical Room, Floor 1",
    status: "In Progress",
    assignedTo: "Fatima Al-Zahrani",
    actions: [
      "Shut down power to affected area",
      "Diverted water source",
      "Emergency response team called",
      "Temporary power routing established"
    ]
  }
];

// Safety Checklist Data
export const mockSafetyChecklist = [
  {
    id: "sc1",
    title: "Monthly HVAC Safety Inspection",
    asset: "HVAC System - Building A",
    assignedTo: "Ahmed Al-Farsi",
    status: "In Progress",
    completedItems: 15,
    totalItems: 25,
    lastUpdated: "2023-08-10",
    dueDate: "2023-08-15",
    items: [
      { id: "i1", description: "Check refrigerant levels", completed: true },
      { id: "i2", description: "Inspect all electrical connections", completed: true },
      { id: "i3", description: "Verify proper fan operation", completed: true }
    ]
  },
  {
    id: "sc2",
    title: "Quarterly UPS Maintenance",
    asset: "UPS System - Data Center",
    assignedTo: "John Smith",
    status: "Completed",
    completedItems: 20,
    totalItems: 20,
    lastUpdated: "2023-08-05",
    dueDate: "2023-08-05",
    items: [
      { id: "i1", description: "Test battery voltage", completed: true },
      { id: "i2", description: "Check for overheating components", completed: true },
      { id: "i3", description: "Test failover system", completed: true }
    ]
  },
  {
    id: "sc3",
    title: "Weekly Fire Alarm Test",
    asset: "Fire Alarm System - Building A",
    assignedTo: "Layla Al-Amri",
    status: "In Progress",
    completedItems: 3,
    totalItems: 8,
    lastUpdated: "2023-08-11",
    dueDate: "2023-08-12",
    items: [
      { id: "i1", description: "Test alarm panel functionality", completed: true },
      { id: "i2", description: "Check emergency lighting", completed: true },
      { id: "i3", description: "Verify exit signs are illuminated", completed: true }
    ]
  },
  {
    id: "sc4",
    title: "Daily Security Rounds",
    asset: "Facility Perimeter",
    assignedTo: "Layla Al-Amri",
    status: "Not Started",
    completedItems: 0,
    totalItems: 12,
    lastUpdated: "2023-08-12",
    dueDate: "2023-08-12",
    items: [
      { id: "i1", description: "Check exterior doors", completed: false },
      { id: "i2", description: "Verify camera functionality", completed: false },
      { id: "i3", description: "Inspect access control system", completed: false }
    ]
  }
];
