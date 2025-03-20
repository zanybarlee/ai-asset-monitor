
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, AlertTriangle, Lock, FileCheck, Clock, CheckCircle } from "lucide-react";

// Mock data for safety protocols
const initialProtocols = [
  {
    id: 1,
    title: "Emergency Power Shutdown Procedure",
    category: "Critical",
    status: "Active",
    lastUpdated: "2023-07-15",
    steps: [
      "Notify all stakeholders of planned shutdown",
      "Verify all systems are in standby mode",
      "Isolate target equipment using safety locks",
      "Verify zero voltage state before proceeding",
      "Complete shutdown checklist before restart"
    ]
  },
  {
    id: 2,
    title: "HVAC Maintenance Safety Protocol",
    category: "Standard",
    status: "Active",
    lastUpdated: "2023-06-20",
    steps: [
      "Ensure proper PPE is worn",
      "Lock out electrical panels before work",
      "Verify refrigerant levels are safe",
      "Test air quality before and after work",
      "Document all maintenance actions taken"
    ]
  },
  {
    id: 3,
    title: "Fire Suppression System Testing Protocol",
    category: "Critical",
    status: "Under Review",
    lastUpdated: "2023-08-05",
    steps: [
      "Notify all personnel of testing schedule",
      "Disable alarm notifications to monitoring center",
      "Verify backup systems are operational",
      "Conduct testing according to manufacturer guidelines",
      "Reset all systems and verify normal operation"
    ]
  }
];

// Mock data for isolation permits
const initialPermits = [
  {
    id: 1,
    title: "UPS System Isolation",
    requestedBy: "Sarah Johnson",
    approvedBy: "Michael Chen",
    startDate: "2023-08-20",
    endDate: "2023-08-20",
    status: "Approved",
    affectedSystems: ["UPS-01", "Distribution Panel A"]
  },
  {
    id: 2,
    title: "Cooling System Maintenance",
    requestedBy: "John Smith",
    approvedBy: "Pending",
    startDate: "2023-08-22",
    endDate: "2023-08-22",
    status: "Pending Approval",
    affectedSystems: ["CRAC-03", "Chilled Water Loop B"]
  },
  {
    id: 3,
    title: "Generator Monthly Test",
    requestedBy: "Lisa Williams",
    approvedBy: "Michael Chen",
    startDate: "2023-08-15",
    endDate: "2023-08-15",
    status: "Completed",
    affectedSystems: ["Generator-01", "ATS-Main"]
  }
];

// Mock data for compliance audits
const initialAudits = [
  {
    id: 1,
    title: "Quarterly Safety Compliance Audit",
    auditor: "External - SafetyFirst Consultants",
    date: "2023-06-15",
    status: "Completed",
    findings: 2,
    score: 92
  },
  {
    id: 2,
    title: "Monthly Internal Safety Inspection",
    auditor: "Internal - Safety Team",
    date: "2023-07-10",
    status: "Completed",
    findings: 1,
    score: 95
  },
  {
    id: 3,
    title: "Annual Regulatory Compliance Audit",
    auditor: "Regulatory Authority",
    date: "2023-09-05",
    status: "Scheduled",
    findings: null,
    score: null
  }
];

const Compliance = () => {
  const [protocols, setProtocols] = useState(initialProtocols);
  const [permits, setPermits] = useState(initialPermits);
  const [audits, setAudits] = useState(initialAudits);
  const [activeTab, setActiveTab] = useState("protocols");

  // Helper function for status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
      case "Approved":
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Under Review":
      case "Pending Approval":
      case "Scheduled":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Active Protocols</CardTitle>
              <ShieldCheck className="h-5 w-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {protocols.filter(p => p.status === "Active").length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Safety procedures in place
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Pending Isolations</CardTitle>
              <Lock className="h-5 w-5 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {permits.filter(p => p.status === "Pending Approval").length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Awaiting approval
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-sm text-muted-foreground mt-1">
              Based on recent audits
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="protocols" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="protocols">Safety Protocols</TabsTrigger>
          <TabsTrigger value="isolation">Isolation Permits</TabsTrigger>
          <TabsTrigger value="audits">Compliance Audits</TabsTrigger>
        </TabsList>
        
        {/* Safety Protocols Tab */}
        <TabsContent value="protocols" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Safety & Operational Protocols</h3>
            <Button>
              <FileCheck className="mr-2 h-4 w-4" />
              New Protocol
            </Button>
          </div>
          
          <div className="space-y-4">
            {protocols.map(protocol => (
              <Card key={protocol.id} className="overflow-hidden">
                <div className={`h-1.5 ${
                  protocol.category === "Critical" ? "bg-red-500" : "bg-blue-500"
                }`} />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{protocol.title}</CardTitle>
                    <Badge variant={protocol.category === "Critical" ? "destructive" : "outline"}>
                      {protocol.category}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    Last updated: {protocol.lastUpdated}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Procedure Steps:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                      {protocol.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-0">
                  <div className={`px-2 py-1 text-xs rounded-full ${getStatusColor(protocol.status)}`}>
                    {protocol.status}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Review</Button>
                    <Button size="sm">View Details</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Isolation Permits Tab */}
        <TabsContent value="isolation" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">System Isolation Permits</h3>
            <Button>
              <Lock className="mr-2 h-4 w-4" />
              Request Isolation
            </Button>
          </div>
          
          <div className="space-y-4">
            {permits.map(permit => (
              <Card key={permit.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{permit.title}</CardTitle>
                    <div className={`px-2 py-1 text-xs rounded-full ${getStatusColor(permit.status)}`}>
                      {permit.status}
                    </div>
                  </div>
                  <CardDescription>
                    Requested by: {permit.requestedBy} • 
                    {permit.status === "Pending Approval" 
                      ? " Approval pending" 
                      : ` Approved by: ${permit.approvedBy}`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Start Date</p>
                      <p className="text-muted-foreground">{permit.startDate}</p>
                    </div>
                    <div>
                      <p className="font-medium">End Date</p>
                      <p className="text-muted-foreground">{permit.endDate}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Affected Systems:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {permit.affectedSystems.map((system, idx) => (
                        <Badge key={idx} variant="outline">{system}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 pt-0">
                  {permit.status === "Pending Approval" && (
                    <>
                      <Button size="sm" variant="outline">Reject</Button>
                      <Button size="sm">Approve</Button>
                    </>
                  )}
                  {permit.status === "Approved" && (
                    <>
                      <Button size="sm" variant="outline">Cancel</Button>
                      <Button size="sm">Complete</Button>
                    </>
                  )}
                  {permit.status === "Completed" && (
                    <Button size="sm">View Report</Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Compliance Audits Tab */}
        <TabsContent value="audits" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Safety & Compliance Audits</h3>
            <Button>
              <AlertTriangle className="mr-2 h-4 w-4" />
              Schedule Audit
            </Button>
          </div>
          
          <div className="space-y-4">
            {audits.map(audit => (
              <Card key={audit.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{audit.title}</CardTitle>
                    <div className={`px-2 py-1 text-xs rounded-full ${getStatusColor(audit.status)}`}>
                      {audit.status}
                    </div>
                  </div>
                  <CardDescription>
                    Conducted by: {audit.auditor} • Date: {audit.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {audit.status === "Completed" ? (
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-md">
                        <p className="text-sm font-medium">Compliance Score</p>
                        <p className={`text-2xl font-bold ${
                          audit.score && audit.score >= 90 ? "text-green-600" : 
                          audit.score && audit.score >= 70 ? "text-amber-600" : "text-red-600"
                        }`}>
                          {audit.score}%
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-md">
                        <p className="text-sm font-medium">Findings</p>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className={`h-5 w-5 ${
                            audit.findings === 0 ? "text-green-500" :
                            audit.findings && audit.findings <= 2 ? "text-amber-500" : "text-red-500"
                          }`} />
                          <p className="text-2xl font-bold">{audit.findings}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-muted rounded-md text-center">
                      <p className="text-sm text-muted-foreground">
                        Audit details will be available after completion
                      </p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end gap-2 pt-0">
                  {audit.status === "Scheduled" && (
                    <Button size="sm" variant="outline">Reschedule</Button>
                  )}
                  <Button size="sm">
                    {audit.status === "Completed" ? "View Report" : "View Details"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Compliance;
