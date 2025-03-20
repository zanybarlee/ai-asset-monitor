
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, Calendar, User, Activity, LayoutList, Shield } from "lucide-react";

// Sample audit trail data
const auditData = [
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
const eventTypes = [
  { value: "all", label: "All Events" },
  { value: "login", label: "System Login/Logout" },
  { value: "config", label: "Configuration Changes" },
  { value: "export", label: "Data Exports" },
  { value: "user", label: "User Management" },
  { value: "alert", label: "Alert Actions" },
  { value: "system", label: "System Operations" },
];

const AuditTrails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("all");
  
  // Filter the audit data based on search term and event type
  const filteredAuditData = auditData.filter(item => {
    const matchesSearch = 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.details.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (selectedEventType === "all") return matchesSearch;
    
    // Filter by event type
    const eventTypeMatches = 
      (selectedEventType === "login" && (item.action.includes("Login") || item.action.includes("Logout"))) ||
      (selectedEventType === "config" && item.action.includes("Configuration")) ||
      (selectedEventType === "export" && item.action.includes("Export")) ||
      (selectedEventType === "user" && (item.action.includes("User") || item.resource.includes("User"))) ||
      (selectedEventType === "alert" && item.action.includes("Alert")) ||
      (selectedEventType === "system" && item.user === "system");
      
    return matchesSearch && eventTypeMatches;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span>Complete Audit Trails</span>
          </CardTitle>
          <CardDescription>
            Comprehensive traceability of all operational events for compliance and forensic review
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 w-1/2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID, user, action or details..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-9"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select 
                    className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={selectedEventType}
                    onChange={(e) => setSelectedEventType(e.target.value)}
                  >
                    {eventTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <Button variant="outline" size="sm" className="h-9">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Date Range</span>
                </Button>
                
                <Button variant="outline" size="sm" className="h-9">
                  <Download className="h-4 w-4 mr-2" />
                  <span>Export</span>
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead className="w-[180px]">Timestamp</TableHead>
                    <TableHead className="w-[180px]">User</TableHead>
                    <TableHead className="w-[150px]">Action</TableHead>
                    <TableHead className="w-[150px]">Resource</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAuditData.length > 0 ? (
                    filteredAuditData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-2 text-muted-foreground" />
                            {item.timestamp}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-2 text-muted-foreground" />
                            {item.user}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Activity className="h-3 w-3 mr-2 text-muted-foreground" />
                            {item.action}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <LayoutList className="h-3 w-3 mr-2 text-muted-foreground" />
                            {item.resource}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={item.status === "Success" ? "default" : "destructive"} 
                                 className={item.status === "Success" ? "bg-green-500 hover:bg-green-600" : ""}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[300px] truncate" title={item.details}>
                          {item.details}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No audit records found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex items-center justify-between pt-4">
              <div className="text-sm text-muted-foreground">
                Showing {filteredAuditData.length} of {auditData.length} records
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled={filteredAuditData.length === 0}>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled={filteredAuditData.length === 0}>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditTrails;
