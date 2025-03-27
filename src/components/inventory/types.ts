export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  category: string;
  partNumber: string;
  manufacturer: string;
  location: string;
  quantityAvailable: number;
  minimumStock: number;
  reorderPoint: number;
  unitCost: number;
  lastRestockDate: string;
  associatedAssets: string[];
  status: 'Available' | 'Low Stock' | 'Out of Stock' | 'Reordered' | 'Discontinued';
  specifications?: Record<string, string>;
  attachments?: string[];
  warrantyInfo?: {
    warrantyId?: string;
    expirationDate?: string;
    provider?: string;
  };
}

export interface InventoryTransaction {
  id: string;
  itemId: string;
  itemName: string;
  transactionType: 'Receipt' | 'Issue' | 'Return' | 'Adjustment' | 'Transfer';
  quantity: number;
  date: string;
  workOrderId?: string;
  assetId?: string;
  userId: string;
  sourceLocation?: string;
  destinationLocation?: string;
  notes?: string;
}

export interface InventoryLocation {
  id: string;
  name: string;
  type: 'Main Warehouse' | 'Satellite Store' | 'Cabinet' | 'Vehicle';
  address?: string;
  contactPerson?: string;
  contactPhone?: string;
}

export interface InventoryMetrics {
  totalItems: number;
  totalValue: number;
  lowStockItems: number;
  outOfStockItems: number;
  pendingTransfers: number;
  openOrders: number;
  itemsToReorder: number;
  averageLeadTimeDays: number;
}

export interface WorkflowStep {
  name: string;
  status: "Completed" | "In Progress" | "Pending";
}
