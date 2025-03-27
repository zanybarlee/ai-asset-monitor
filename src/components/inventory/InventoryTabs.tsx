
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HardwareInventoryTable from "@/components/inventory/HardwareInventoryTable";
import SoftwareInventory from "@/components/inventory/SoftwareInventory";
import ProvisioningWorkflows from "@/components/inventory/ProvisioningWorkflows";
import ProceduresDocumentation from "@/components/inventory/ProceduresDocumentation";
import { InventoryItem } from "@/components/inventory/AddItemDialog";

interface InventoryTabsProps {
  inventoryItems: InventoryItem[];
}

const InventoryTabs = ({ inventoryItems }: InventoryTabsProps) => {
  return (
    <Tabs defaultValue="hardware" className="space-y-4">
      <TabsList>
        <TabsTrigger value="hardware">Hardware</TabsTrigger>
        <TabsTrigger value="software">Software</TabsTrigger>
        <TabsTrigger value="provisioning">Provisioning</TabsTrigger>
        <TabsTrigger value="procedures">Procedures</TabsTrigger>
      </TabsList>
      <TabsContent value="hardware" className="space-y-4">
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
