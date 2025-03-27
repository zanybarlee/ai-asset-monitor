
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, CheckCircle2, Clock, PlayCircle, Plus, Server } from "lucide-react";

const ProvisioningWorkflows = () => {
  // Mock data for provisioning workflows
  const activeWorkflows = [
    {
      id: "PROV-001",
      name: "New Server Deployment - Rack B12",
      type: "Server Provisioning",
      status: "In Progress",
      progress: 65,
      startDate: "2025-03-20",
      estimatedCompletion: "2025-03-28",
      assignedTo: "Server Team",
      steps: [
        { name: "Hardware Preparation", status: "Completed" },
        { name: "Rack Installation", status: "Completed" },
        { name: "Network Configuration", status: "In Progress" },
        { name: "OS Installation", status: "Pending" },
        { name: "Post-Installation Verification", status: "Pending" }
      ]
    },
    {
      id: "PROV-002",
      name: "Storage Array Expansion - SAN02",
      type: "Storage Provisioning",
      status: "In Progress",
      progress: 30,
      startDate: "2025-03-22",
      estimatedCompletion: "2025-03-30",
      assignedTo: "Storage Team",
      steps: [
        { name: "Parts Verification", status: "Completed" },
        { name: "Hardware Installation", status: "In Progress" },
        { name: "Array Configuration", status: "Pending" },
        { name: "Integration Testing", status: "Pending" },
        { name: "Documentation Update", status: "Pending" }
      ]
    }
  ];

  const templateWorkflows = [
    {
      id: "TMPL-001",
      name: "Standard Server Deployment",
      type: "Server Provisioning",
      description: "End-to-end workflow for deploying standard server configurations",
      steps: 8,
      estimatedDuration: "5-7 days"
    },
    {
      id: "TMPL-002",
      name: "Storage Array Expansion",
      type: "Storage Provisioning",
      description: "Process for adding capacity to existing storage arrays",
      steps: 6,
      estimatedDuration: "3-5 days"
    },
    {
      id: "TMPL-003",
      name: "Network Equipment Replacement",
      type: "Network Provisioning",
      description: "Workflow for safely swapping out network devices",
      steps: 9,
      estimatedDuration: "2-3 days"
    },
    {
      id: "TMPL-004",
      name: "Rack Decommissioning",
      type: "Decommissioning",
      description: "Full process for safely decommissioning data center racks",
      steps: 12,
      estimatedDuration: "7-10 days"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Provisioning Workflows</h3>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Workflow
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid grid-cols-2 w-64 mb-4">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          {activeWorkflows.length === 0 ? (
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8 text-center">
              <Server className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Active Workflows</h3>
              <p className="text-muted-foreground mb-4">
                There are no active provisioning workflows at the moment.
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New Workflow
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {activeWorkflows.map((workflow) => (
                <Card key={workflow.id}>
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center">
                          <Server className="h-5 w-5 text-blue-500 mr-2" />
                          {workflow.name}
                        </CardTitle>
                        <CardDescription>
                          Started: {workflow.startDate} • Est. Completion: {workflow.estimatedCompletion}
                        </CardDescription>
                      </div>
                      <Badge variant={workflow.status === "In Progress" ? "default" : "outline"}>
                        {workflow.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{workflow.progress}%</span>
                      </div>
                      <Progress value={workflow.progress} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      {workflow.steps.map((step, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            {step.status === "Completed" ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2" />
                            ) : step.status === "In Progress" ? (
                              <Clock className="h-4 w-4 text-amber-500 mr-2" />
                            ) : (
                              <div className="h-4 w-4 border rounded-full mr-2" />
                            )}
                            <span className={`text-sm ${step.status === "Completed" ? "line-through text-muted-foreground" : ""}`}>
                              {step.name}
                            </span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {step.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      Assigned to: {workflow.assignedTo}
                    </div>
                    <Button size="sm">
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Manage Workflow
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="templates">
          <div className="grid md:grid-cols-2 gap-4">
            {templateWorkflows.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type:</span>
                    <span>{template.type}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Steps:</span>
                    <span>{template.steps}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Est. Duration:</span>
                    <span>{template.estimatedDuration}</span>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full">
                    Start New Workflow
                    <ArrowRight className="ml-2 h-4 w-4" />
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

export default ProvisioningWorkflows;
