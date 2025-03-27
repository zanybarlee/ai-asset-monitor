
export interface Warranty {
  id: string;
  assetId: string;
  assetName: string;
  assetType: string;
  startDate: string;
  expirationDate: string;
  coverageType: 'Repair' | 'Replacement' | 'Service' | 'Parts' | 'Labor' | 'Full';
  provider: string;
  providerContact: string;
  status: 'Active' | 'Expired' | 'Expiring Soon';
  documents: string[];
  notes?: string;
}

export interface WarrantyClaim {
  id: string;
  warrantyId: string;
  assetId: string;
  assetName: string;
  dateSubmitted: string;
  description: string;
  documents: string[];
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Denied' | 'Closed';
  assignedTo?: string;
  vendor: string;
  estimatedValue: number;
  actualValue?: number;
  resolutionDate?: string;
  resolutionNotes?: string;
}

export interface WarrantyMetrics {
  activeWarranties: number;
  expiringWarranties: number;
  expiredWarranties: number;
  pendingClaims: number;
  approvedClaims: number;
  deniedClaims: number;
  totalSavings: number;
  claimSuccessRate: number;
  avgResolutionDays: number;
  coverageCompleteness: number;
}
