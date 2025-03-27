
import { useState } from "react";
import { InventoryItem } from "@/components/inventory/AddItemDialog";
import InventoryHeader from "@/components/inventory/InventoryHeader";
import MetricsCards from "@/components/inventory/MetricsCards";
import InventoryTabs from "@/components/inventory/InventoryTabs";

const InventoryManagement = () => {
  const [open, setOpen] = useState(false);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    { id: 'SRV-1042', name: 'Dell PowerEdge R740', category: 'Server', location: 'Server Room A', status: 'Deployed' },
    { id: 'STO-789', name: 'NetApp FAS8700', category: 'Storage', location: 'Server Room A', status: 'Deployed' },
    { id: 'SRV-1043', name: 'HP ProLiant DL380', category: 'Server', location: 'Inventory', status: 'Available' },
    { id: 'NET-442', name: 'Cisco Nexus 9336C', category: 'Network', location: 'Rack B12', status: 'Deployed' },
    { id: 'SRV-1044', name: 'Dell PowerEdge R640', category: 'Server', location: 'Server Room B', status: 'Maintenance' },
  ]);

  const handleAddItem = (newItem: InventoryItem) => {
    setInventoryItems([...inventoryItems, newItem]);
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <InventoryHeader 
        open={open} 
        setOpen={setOpen} 
        onItemAdded={handleAddItem} 
      />
      <MetricsCards />
      <InventoryTabs inventoryItems={inventoryItems} />
    </div>
  );
};

export default InventoryManagement;
