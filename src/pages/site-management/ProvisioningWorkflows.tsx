
import ProvisioningWorkflowsComponent from "@/components/inventory/ProvisioningWorkflows";

const ProvisioningWorkflowsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Provisioning Workflows</h2>
        <p className="text-muted-foreground">
          Manage and track provisioning workflows for hardware and infrastructure
        </p>
      </div>
      <ProvisioningWorkflowsComponent />
    </div>
  );
};

export default ProvisioningWorkflowsPage;
