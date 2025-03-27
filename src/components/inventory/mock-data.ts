
import { InventoryItem, InventoryTransaction, InventoryLocation, InventoryMetrics } from './types';

export const mockInventoryItems: InventoryItem[] = [
  {
    id: 'PART-1001',
    name: 'Server Power Supply Unit',
    description: 'Redundant Power Supply for Dell PowerEdge Servers',
    category: 'Power Components',
    partNumber: 'PSU-DELL-495W',
    manufacturer: 'Dell',
    location: 'Main Data Center - Warehouse A',
    quantityAvailable: 12,
    minimumStock: 5,
    reorderPoint: 8,
    unitCost: 349.99,
    lastRestockDate: '2025-01-15',
    associatedAssets: ['SRV-1042', 'SRV-1043', 'SRV-1044'],
    status: 'Available',
    specifications: {
      'Output Power': '495W',
      'Input Voltage': '100-240V',
      'Efficiency Rating': '80+ Platinum'
    },
    attachments: ['datasheet-psu.pdf', 'installation-guide.pdf'],
    warrantyInfo: {
      warrantyId: 'WARR-PSU-2025',
      expirationDate: '2026-01-15',
      provider: 'Dell Enterprise Support'
    }
  },
  {
    id: 'PART-1002',
    name: 'Cooling Fan Assembly',
    description: 'Replacement cooling fans for rack-mounted servers',
    category: 'Cooling Components',
    partNumber: 'FAN-120MM-DUAL',
    manufacturer: 'Arctic',
    location: 'Main Data Center - Warehouse A',
    quantityAvailable: 8,
    minimumStock: 10,
    reorderPoint: 15,
    unitCost: 89.95,
    lastRestockDate: '2025-02-10',
    associatedAssets: ['SRV-1042', 'SRV-1045', 'SRV-1046'],
    status: 'Low Stock',
    specifications: {
      'Size': '120mm',
      'Type': 'Dual Fan',
      'Speed': '1500-3000 RPM',
      'Noise Level': '25-35 dB'
    }
  },
  {
    id: 'PART-1003',
    name: 'Network Switch Module',
    description: '24-Port 10GbE SFP+ Network Switch Module',
    category: 'Network Components',
    partNumber: 'NSW-24-10G',
    manufacturer: 'Cisco',
    location: 'Satellite Store - Building B',
    quantityAvailable: 3,
    minimumStock: 2,
    reorderPoint: 3,
    unitCost: 4599.99,
    lastRestockDate: '2024-12-01',
    associatedAssets: ['NET-442', 'NET-443', 'NET-444'],
    status: 'Available',
    specifications: {
      'Ports': '24 x SFP+',
      'Throughput': '480 Gbps',
      'Management': 'CLI and Web Interface',
      'Form Factor': '1U'
    },
    warrantyInfo: {
      warrantyId: 'WARR-NSW-2024',
      expirationDate: '2027-12-01',
      provider: 'Cisco SmartNet'
    }
  },
  {
    id: 'PART-1004',
    name: 'Memory Module DDR4',
    description: '32GB DDR4 ECC RDIMM Memory Module',
    category: 'Server Components',
    partNumber: 'MEM-32GB-DDR4-3200',
    manufacturer: 'Kingston',
    location: 'Main Data Center - Warehouse A',
    quantityAvailable: 0,
    minimumStock: 6,
    reorderPoint: 10,
    unitCost: 279.95,
    lastRestockDate: '2024-11-15',
    associatedAssets: ['SRV-1042', 'SRV-1043', 'SRV-1044', 'SRV-1045'],
    status: 'Out of Stock',
    specifications: {
      'Capacity': '32GB',
      'Type': 'DDR4 ECC RDIMM',
      'Speed': '3200 MHz',
      'CAS Latency': 'CL22'
    }
  },
  {
    id: 'PART-1005',
    name: 'SSD Drive 1.92TB',
    description: '1.92TB NVMe SSD Enterprise Drive',
    category: 'Storage Components',
    partNumber: 'SSD-1.92TB-NVMe',
    manufacturer: 'Samsung',
    location: 'Main Data Center - Warehouse A',
    quantityAvailable: 15,
    minimumStock: 5,
    reorderPoint: 8,
    unitCost: 829.99,
    lastRestockDate: '2025-02-20',
    associatedAssets: ['STO-789', 'STO-790', 'SRV-1050'],
    status: 'Available',
    specifications: {
      'Capacity': '1.92TB',
      'Interface': 'NVMe PCIe 4.0',
      'Sequential Read': 'Up to 7,000 MB/s',
      'Sequential Write': 'Up to 3,500 MB/s',
      'DWPD': '1.3'
    },
    warrantyInfo: {
      warrantyId: 'WARR-SSD-2025',
      expirationDate: '2028-02-20',
      provider: 'Samsung Enterprise'
    }
  }
];

export const mockInventoryTransactions: InventoryTransaction[] = [
  {
    id: 'TRANS-001',
    itemId: 'PART-1001',
    itemName: 'Server Power Supply Unit',
    transactionType: 'Receipt',
    quantity: 20,
    date: '2025-01-15',
    userId: 'user-001',
    sourceLocation: 'Vendor',
    destinationLocation: 'Main Data Center - Warehouse A',
    notes: 'Regular restock of power supplies'
  },
  {
    id: 'TRANS-002',
    itemId: 'PART-1001',
    itemName: 'Server Power Supply Unit',
    transactionType: 'Issue',
    quantity: 2,
    date: '2025-01-20',
    workOrderId: 'WO-2025-042',
    assetId: 'SRV-1042',
    userId: 'user-002',
    sourceLocation: 'Main Data Center - Warehouse A',
    notes: 'Emergency replacement due to failure'
  },
  {
    id: 'TRANS-003',
    itemId: 'PART-1002',
    itemName: 'Cooling Fan Assembly',
    transactionType: 'Transfer',
    quantity: 5,
    date: '2025-02-10',
    userId: 'user-001',
    sourceLocation: 'Main Data Center - Warehouse A',
    destinationLocation: 'Satellite Store - Building B',
    notes: 'Rebalancing inventory between locations'
  },
  {
    id: 'TRANS-004',
    itemId: 'PART-1004',
    itemName: 'Memory Module DDR4',
    transactionType: 'Issue',
    quantity: 6,
    date: '2025-02-15',
    workOrderId: 'WO-2025-053',
    assetId: 'SRV-1043',
    userId: 'user-003',
    sourceLocation: 'Main Data Center - Warehouse A',
    notes: 'Server memory upgrade project'
  },
  {
    id: 'TRANS-005',
    itemId: 'PART-1003',
    itemName: 'Network Switch Module',
    transactionType: 'Adjustment',
    quantity: -1,
    date: '2025-02-18',
    userId: 'user-001',
    sourceLocation: 'Satellite Store - Building B',
    notes: 'Inventory count correction - damaged item'
  }
];

export const mockInventoryLocations: InventoryLocation[] = [
  {
    id: 'LOC-001',
    name: 'Main Data Center - Warehouse A',
    type: 'Main Warehouse',
    address: 'Building 5, Floor 2, Data Center Complex',
    contactPerson: 'John Smith',
    contactPhone: '+966-123-4567'
  },
  {
    id: 'LOC-002',
    name: 'Satellite Store - Building B',
    type: 'Satellite Store',
    address: 'Building B, Floor 1, Room 112',
    contactPerson: 'Mohammed Al-Farsi',
    contactPhone: '+966-123-4568'
  },
  {
    id: 'LOC-003',
    name: 'Emergency Backup Cabinet - Server Room A',
    type: 'Cabinet',
    address: 'Server Room A, Aisle 3',
    contactPerson: 'Technical Lead on Duty',
    contactPhone: '+966-123-4569'
  }
];

export const mockInventoryMetrics: InventoryMetrics = {
  totalItems: 38,
  totalValue: 142857.32,
  lowStockItems: 5,
  outOfStockItems: 2,
  pendingTransfers: 3,
  openOrders: 8,
  itemsToReorder: 4,
  averageLeadTimeDays: 12.5
};
