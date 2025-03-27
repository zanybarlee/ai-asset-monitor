
import { Visitor, VisitorMovementsRecord } from "./types";

export const mockVisitors: Visitor[] = [
  {
    id: "V-1001",
    name: "David Wilson",
    company: "Acme IT Services",
    purpose: "Server Maintenance",
    host: "John Doe",
    checkIn: "2023-08-12T09:30:00",
    checkOut: "2023-08-12T14:15:00",
    status: "Completed"
  },
  {
    id: "V-1002",
    name: "Lisa Chen",
    company: "Electrical Solutions Inc.",
    purpose: "Electrical Inspection",
    host: "Sarah Johnson",
    checkIn: "2023-08-12T10:00:00",
    checkOut: null,
    status: "Active"
  },
  {
    id: "V-1003",
    name: "Robert Brown",
    company: "Cooling Systems Ltd.",
    purpose: "HVAC Upgrade Consultation",
    host: "Michael Rodriguez",
    checkIn: "2023-08-12T11:15:00",
    checkOut: null,
    status: "Active"
  },
  {
    id: "V-1004",
    name: "Emma Scott",
    company: "Security Solutions",
    purpose: "Security System Audit",
    host: "Emily Chen",
    checkIn: null,
    checkOut: null,
    status: "Scheduled",
    scheduledTime: "2023-08-15T09:00:00"
  },
  {
    id: "V-1005",
    name: "Thomas Moore",
    company: "Network Infrastructure Co.",
    purpose: "Network Upgrade Discussion",
    host: "John Doe",
    checkIn: null,
    checkOut: null,
    status: "Scheduled",
    scheduledTime: "2023-08-14T13:30:00"
  }
];

export const visitorMovements: VisitorMovementsRecord = {
  "V-1001": [
    { timestamp: "2023-08-12T09:30:00", zone: "Main Entrance", action: "Check In" },
    { timestamp: "2023-08-12T09:35:00", zone: "Security Checkpoint", action: "Access Granted" },
    { timestamp: "2023-08-12T09:42:00", zone: "Server Room B", action: "Access Granted" },
    { timestamp: "2023-08-12T11:15:00", zone: "Cafeteria", action: "Access Granted" },
    { timestamp: "2023-08-12T12:05:00", zone: "Server Room B", action: "Access Granted" },
    { timestamp: "2023-08-12T14:15:00", zone: "Main Entrance", action: "Check Out" },
  ],
  "V-1002": [
    { timestamp: "2023-08-12T10:00:00", zone: "Main Entrance", action: "Check In" },
    { timestamp: "2023-08-12T10:07:00", zone: "Security Checkpoint", action: "Access Granted" },
    { timestamp: "2023-08-12T10:15:00", zone: "Electrical Room", action: "Access Granted" },
    { timestamp: "2023-08-12T12:30:00", zone: "Cafeteria", action: "Access Granted" },
    { timestamp: "2023-08-12T13:15:00", zone: "Electrical Room", action: "Access Granted" },
  ],
  "V-1003": [
    { timestamp: "2023-08-12T11:15:00", zone: "Main Entrance", action: "Check In" },
    { timestamp: "2023-08-12T11:22:00", zone: "Security Checkpoint", action: "Access Granted" },
    { timestamp: "2023-08-12T11:30:00", zone: "HVAC Control Room", action: "Access Granted" },
  ]
};

export const todaysSchedule = [
  { name: "David Wilson", time: "09:30 - 14:15" },
  { name: "Lisa Chen", time: "10:00 - Present" },
  { name: "Robert Brown", time: "11:15 - Present" }
];
