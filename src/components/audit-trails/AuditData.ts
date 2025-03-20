
// Sample audit trail data
export const auditData = [
  { 
    id: "AUD001", 
    timestamp: "2023-12-01 08:15:32", 
    user: "admin@aramco.com", 
    action: "System Login", 
    resource: "Admin Portal", 
    status: "Success",
    details: "Authentication successful via SSO" 
  },
  { 
    id: "AUD002", 
    timestamp: "2023-12-01 08:23:47", 
    user: "john.engineer@aramco.com", 
    action: "Configuration Change", 
    resource: "UPS Settings", 
    status: "Success",
    details: "Changed notification threshold from 80% to 85%" 
  },
  { 
    id: "AUD003", 
    timestamp: "2023-12-01 09:05:11", 
    user: "sarah.tech@aramco.com", 
    action: "File Export", 
    resource: "Power Reports", 
    status: "Success",
    details: "Exported monthly power consumption data" 
  },
  { 
    id: "AUD004", 
    timestamp: "2023-12-01 10:12:08", 
    user: "mike.admin@aramco.com", 
    action: "User Creation", 
    resource: "User Management", 
    status: "Success",
    details: "Created new account for technical staff" 
  },
  { 
    id: "AUD005", 
    timestamp: "2023-12-01 11:33:29", 
    user: "unknown", 
    action: "System Login", 
    resource: "Monitoring Dashboard", 
    status: "Failed",
    details: "Authentication failed - Invalid credentials (3rd attempt)" 
  },
  { 
    id: "AUD006", 
    timestamp: "2023-12-01 13:45:22", 
    user: "ahmed.ops@aramco.com", 
    action: "Alert Acknowledgement", 
    resource: "Alert System", 
    status: "Success",
    details: "Acknowledged high temperature alert for Server Room B" 
  },
  { 
    id: "AUD007", 
    timestamp: "2023-12-01 14:57:01", 
    user: "system", 
    action: "Scheduled Backup", 
    resource: "Configuration Database", 
    status: "Success",
    details: "Completed automated daily backup" 
  },
  { 
    id: "AUD008", 
    timestamp: "2023-12-01 16:22:15", 
    user: "john.engineer@aramco.com", 
    action: "Emergency Override", 
    resource: "Cooling Controls", 
    status: "Success",
    details: "Manually overrode cooling settings for emergency maintenance" 
  },
  { 
    id: "AUD009", 
    timestamp: "2023-12-01 17:08:33", 
    user: "david.security@aramco.com", 
    action: "Permission Change", 
    resource: "Access Controls", 
    status: "Success",
    details: "Updated role permissions for maintenance team" 
  },
  { 
    id: "AUD010", 
    timestamp: "2023-12-01 18:30:47", 
    user: "admin@aramco.com", 
    action: "System Logout", 
    resource: "Admin Portal", 
    status: "Success",
    details: "User logged out manually" 
  },
];

// Audit event types for filtering
export const eventTypes = [
  { value: "all", label: "All Events" },
  { value: "login", label: "System Login/Logout" },
  { value: "config", label: "Configuration Changes" },
  { value: "export", label: "Data Exports" },
  { value: "user", label: "User Management" },
  { value: "alert", label: "Alert Actions" },
  { value: "system", label: "System Operations" },
];
