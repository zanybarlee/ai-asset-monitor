
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Clock, 
  Building, 
  LocateFixed, 
  User
} from "lucide-react";

interface EmergencyRequest {
  id: string;
  title: string;
  source: string;
  location: string;
  asset: string;
  timestamp: string;
  status: "New" | "Assigned" | "In Progress";
  assignee?: string;
}

interface EmergencyRequestsTableProps {
  onViewDetails: (orderId: string) => void;
}

const EmergencyRequestsTable = ({ onViewDetails }: EmergencyRequestsTableProps) => {
  // Sample emergency requests data
  const [emergencyRequests] = useState<EmergencyRequest[]>([
    {
      id: "ER-1001",
      title: "HVAC Cooling Failure - Critical Temperature Alarm",
      source: "Temperature Sensor TS-103",
      location: "Server Room A",
      asset: "HVAC-001",
      timestamp: "2023-07-12T08:23:15",
      status: "New"
    },
    {
      id: "ER-1002",
      title: "UPS Battery Critical - Imminent Failure",
      source: "Power Monitoring System",
      location: "Power Room",
      asset: "UPS-002",
      timestamp: "2023-07-12T10:15:43",
      status: "Assigned",
      assignee: "John Smith"
    },
    {
      id: "ER-1003",
      title: "Water Leak Detected Near Network Cabinet",
      source: "Leak Detector LD-05",
      location: "Network Room B",
      asset: "N/A",
      timestamp: "2023-07-12T11:02:37",
      status: "In Progress",
      assignee: "Sarah Chen"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-destructive text-white";
      case "Assigned":
        return "bg-amber-500 text-white";
      case "In Progress":
        return "bg-blue-500 text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const formatTimeSince = (timestamp: string) => {
    const requestTime = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - requestTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} min ago`;
    } else {
      const diffHours = Math.floor(diffMins / 60);
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="space-y-4">
      {emergencyRequests.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-muted-foreground">No emergency requests found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {emergencyRequests.map(request => (
            <Card key={request.id} className={`overflow-hidden border-l-4 ${
              request.status === "New" ? "border-l-destructive" : 
              request.status === "Assigned" ? "border-l-amber-500" : "border-l-blue-500"
            }`}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`h-4 w-4 ${
                        request.status === "New" ? "text-destructive" : 
                        request.status === "Assigned" ? "text-amber-500" : "text-blue-500"
                      }`} />
                      <span className="text-sm font-medium">{request.id}</span>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="mr-1 h-3 w-3" />
                        {formatTimeSince(request.timestamp)}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold">{request.title}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>Location: {request.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <LocateFixed className="h-4 w-4 text-muted-foreground" />
                        <span>Asset: {request.asset}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        <span>Source: {request.source}</span>
                      </div>
                      {request.assignee && (
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>Assignee: {request.assignee}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => onViewDetails("WO-1001")}>View Work Order</Button>
                    {request.status === "New" && (
                      <Button variant="outline">Assign Technician</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmergencyRequestsTable;
