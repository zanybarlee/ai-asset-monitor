
import { useState } from "react";
import WorkOrderForm from "@/components/work-orders/WorkOrderForm";
import WorkOrderCreationWizard from "@/components/work-orders/enhanced/WorkOrderCreationWizard";
import WorkOrderDetails from "@/components/work-orders/WorkOrderDetails";

interface WorkOrderDialogsProps {
  isFormOpen: boolean;
  isWizardOpen: boolean;
  isDetailsOpen: boolean;
  selectedOrderId: string | null;
  onCloseForm: () => void;
  onCloseWizard: () => void;
  onCloseDetails: () => void;
}

const WorkOrderDialogs = ({
  isFormOpen,
  isWizardOpen,
  isDetailsOpen,
  selectedOrderId,
  onCloseForm,
  onCloseWizard,
  onCloseDetails
}: WorkOrderDialogsProps) => {
  return (
    <>
      {/* Work Order Form Dialog */}
      {isFormOpen && <WorkOrderForm open={isFormOpen} onClose={onCloseForm} />}
      
      {/* Work Order Creation Wizard */}
      {isWizardOpen && <WorkOrderCreationWizard open={isWizardOpen} onClose={onCloseWizard} />}
      
      {/* Work Order Details Dialog */}
      {isDetailsOpen && selectedOrderId && (
        <WorkOrderDetails 
          open={isDetailsOpen} 
          onClose={onCloseDetails} 
          orderId={selectedOrderId} 
        />
      )}
    </>
  );
};

export default WorkOrderDialogs;
