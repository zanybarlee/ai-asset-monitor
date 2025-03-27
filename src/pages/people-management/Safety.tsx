
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, FileText, ShieldAlert, Shield, ClipboardCheck, ClipboardList } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockSafetyIncidents, mockSafetyChecklist } from "@/components/people-management/mock-data";
import AddSafetyIncidentDialog from "@/components/people-management/AddSafetyIncidentDialog";

const Safety = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("incidents");
  const [showAddIncident, setShowAddIncident] = useState(false);

  // Filter safety incidents based on search
  const filteredIncidents = mockSafetyIncidents.filter((incident) => {
    return incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.reportedBy.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getIncidentSeverityStyle = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-destructive text-destructive-foreground";
      case "High": return "bg-amber-500 text-white";
      case "Medium": return "bg-orange-500 text-white";
      case "Low": return "bg-emerald-500 text-white";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2 flex-1 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search incidents, checklists..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Button onClick={() => setShowAddIncident(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Report Incident
        </Button>
      </div>

      <Tabs defaultValue="incidents" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="incidents">Safety Incidents</TabsTrigger>
          <TabsTrigger value="checklists">Safety Checklists</TabsTrigger>
          <TabsTrigger value="permits">Work Permits</TabsTrigger>
        </TabsList>
        
        <TabsContent value="incidents" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredIncidents.map((incident) => (
              <Card key={incident.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-base">{incident.title}</CardTitle>
                    <Badge className={getIncidentSeverityStyle(incident.severity)}>
                      {incident.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {incident.location} • {new Date(incident.date).toLocaleDateString()}
                  </p>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <p className="text-sm">{incident.description}</p>
                    <div className="flex items-center text-sm mt-2">
                      <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Status: {incident.status}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Reported by: {incident.reportedBy}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">View Details</Button>
                  {incident.status !== "Resolved" && (
                    <Button variant="outline" size="sm">Update Status</Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="checklists" className="mt-4">
          <div className="grid grid-cols-1 gap-4">
            {mockSafetyChecklist.map((checklist) => (
              <Card key={checklist.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-base">{checklist.title}</CardTitle>
                    <Badge variant={checklist.status === "Completed" ? "default" : "outline"}>
                      {checklist.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {checklist.asset} • Last updated: {new Date(checklist.lastUpdated).toLocaleDateString()}
                  </p>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <ClipboardCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Items: {checklist.completedItems}/{checklist.totalItems}</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Assigned to: {checklist.assignedTo}</span>
                      </div>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full mt-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(checklist.completedItems / checklist.totalItems) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">View Checklist</Button>
                  {checklist.status !== "Completed" && (
                    <Button variant="outline" size="sm">Complete Checklist</Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="permits" className="mt-4">
          <div className="text-center py-10">
            <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No active work permits</h3>
            <p className="text-muted-foreground">
              Create a new work permit to get started.
            </p>
            <Button className="mt-4" onClick={() => toast({ title: "Feature coming soon", description: "Work permits functionality will be available in the next release." })}>
              <Plus className="mr-2 h-4 w-4" />
              Create Work Permit
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Safety Incident Dialog */}
      {showAddIncident && (
        <AddSafetyIncidentDialog
          open={showAddIncident}
          onClose={() => setShowAddIncident(false)}
        />
      )}
    </div>
  );
};

export default Safety;
