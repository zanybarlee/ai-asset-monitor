
import { useState } from "react";
import InventoryHeader from "@/components/inventory/InventoryHeader";
import MetricsCards from "@/components/inventory/MetricsCards";
import InventoryTabs from "@/components/inventory/InventoryTabs";
import { InventoryItem } from "@/components/inventory/types";
import { mockInventoryItems, mockInventoryMetrics } from "@/components/inventory/mock-data";

const InventoryManagement = () => {
  const [open, setOpen] = useState(false);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(mockInventoryItems);

  const handleAddItem = (newItem: InventoryItem) => {
    setInventoryItems([...inventoryItems, newItem]);
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Inventory Management</h2>
        <p className="text-muted-foreground">
          Track, manage and deploy hardware and software assets
        </p>
      </div>
      
      <InventoryHeader 
        open={open} 
        setOpen={setOpen} 
        onItemAdded={handleAddItem} 
      />
      <MetricsCards metrics={mockInventoryMetrics} />
      <InventoryTabs inventoryItems={inventoryItems} />
    </div>
  );
};

export default InventoryManagement;
