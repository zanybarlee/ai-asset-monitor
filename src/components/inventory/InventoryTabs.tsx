
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HardwareInventoryTable from "./HardwareInventoryTable";
import SoftwareInventory from "./SoftwareInventory";
import ProceduresDocumentation from "./ProceduresDocumentation";
import ProvisioningWorkflows from "./ProvisioningWorkflows";
import { InventoryItem } from "./types";

interface InventoryTabsProps {
  inventoryItems: InventoryItem[];
}

const InventoryTabs = ({ inventoryItems }: InventoryTabsProps) => {
  return (
    <Tabs defaultValue="hardware" className="w-full">
      <TabsList className="grid grid-cols-4 w-full mb-4">
        <TabsTrigger value="hardware">Hardware Inventory</TabsTrigger>
        <TabsTrigger value="software">Software Inventory</TabsTrigger>
        <TabsTrigger value="provisioning">Provisioning Workflows</TabsTrigger>
        <TabsTrigger value="procedures">Procedures & Docs</TabsTrigger>
      </TabsList>
      
      <TabsContent value="hardware">
        <HardwareInventoryTable inventoryItems={inventoryItems} />
      </TabsContent>
      
      <TabsContent value="software">
        <SoftwareInventory />
      </TabsContent>
      
      <TabsContent value="provisioning">
        <ProvisioningWorkflows />
      </TabsContent>
      
      <TabsContent value="procedures">
        <ProceduresDocumentation />
      </TabsContent>
    </Tabs>
  );
};

export default InventoryTabs;
