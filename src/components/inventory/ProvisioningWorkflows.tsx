
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import ActiveWorkflowsTab from "./workflows/ActiveWorkflowsTab";
import TemplateWorkflowsTab from "./workflows/TemplateWorkflowsTab";
import { ActiveWorkflowProps } from "./workflows/ActiveWorkflowItem";
import { TemplateWorkflowProps } from "./workflows/TemplateWorkflowItem";

const ProvisioningWorkflows = () => {
  // Mock data for provisioning workflows
  const activeWorkflows: ActiveWorkflowProps[] = [
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

  const templateWorkflows: TemplateWorkflowProps[] = [
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
          <ActiveWorkflowsTab workflows={activeWorkflows} />
        </TabsContent>
        
        <TabsContent value="templates">
          <TemplateWorkflowsTab templates={templateWorkflows} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProvisioningWorkflows;
