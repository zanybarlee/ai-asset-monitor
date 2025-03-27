
import { useState } from "react";
import ProvisioningWorkflows from "@/components/inventory/ProvisioningWorkflows";

const ProvisioningWorkflowsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Provisioning Workflows</h2>
        <p className="text-muted-foreground">
          Manage and track provisioning workflows for hardware and infrastructure
        </p>
      </div>
      <ProvisioningWorkflows />
    </div>
  );
};

export default ProvisioningWorkflowsPage;
