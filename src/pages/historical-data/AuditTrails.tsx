
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { auditData, eventTypes } from "@/components/audit-trails/AuditData";
import AuditSearchFilters from "@/components/audit-trails/AuditSearchFilters";
import AuditTable from "@/components/audit-trails/AuditTable";
import AuditPagination from "@/components/audit-trails/AuditPagination";

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
            <AuditSearchFilters 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedEventType={selectedEventType}
              setSelectedEventType={setSelectedEventType}
              eventTypes={eventTypes}
            />
            
            <AuditTable data={filteredAuditData} />
            
            <AuditPagination 
              filteredCount={filteredAuditData.length} 
              totalCount={auditData.length} 
              disabled={filteredAuditData.length === 0}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditTrails;
