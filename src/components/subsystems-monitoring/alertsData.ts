
export type AlertType = {
  id: string;
  timestamp: string;
  source: string;
  severity: "High" | "Medium" | "Low";
  message: string;
  status: "Active" | "Resolved";
};

// Sample alerts data
export const alertsData: AlertType[] = [
  { 
    id: "ALT-1234", 
    timestamp: "2023-09-02 14:32:15", 
    source: "Electrical", 
    severity: "High", 
    message: "UPS 2 load exceeding 85% capacity for >15 minutes", 
    status: "Active" 
  },
  { 
    id: "ALT-1233", 
    timestamp: "2023-09-02 13:18:44", 
    source: "HVAC", 
    severity: "Medium", 
    message: "CRAC 3 temperature deviation 2.5°C above setpoint", 
    status: "Active" 
  },
  { 
    id: "ALT-1232", 
    timestamp: "2023-09-02 11:05:22", 
    source: "Safety", 
    severity: "Low", 
    message: "Security camera 12 in generator room connectivity issues", 
    status: "Active" 
  },
  { 
    id: "ALT-1231", 
    timestamp: "2023-09-02 09:47:38", 
    source: "Electrical", 
    severity: "Medium", 
    message: "Generator 1 fuel level below 85%", 
    status: "Resolved" 
  },
  { 
    id: "ALT-1230", 
    timestamp: "2023-09-02 08:12:55", 
    source: "HVAC", 
    severity: "High", 
    message: "Primary chiller pump pressure drop detected", 
    status: "Resolved" 
  },
];
