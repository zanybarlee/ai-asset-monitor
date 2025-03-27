
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HardwareInventoryTable from "./HardwareInventoryTable";
import SoftwareInventory from "./SoftwareInventory";
import ProceduresDocumentation from "./ProceduresDocumentation";
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
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Provisioning Workflows</h3>
          <p className="text-muted-foreground">
            Configure and manage automated provisioning workflows for servers, storage, and network equipment.
          </p>
          <div className="flex justify-center items-center h-64">
            <p className="text-muted-foreground">This feature is coming soon.</p>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="procedures">
        <ProceduresDocumentation />
      </TabsContent>
    </Tabs>
  );
};

export default InventoryTabs;
