
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Warranty components
import WarrantyHeader from "@/components/warranty/WarrantyHeader";
import MetricsCards from "@/components/warranty/MetricsCards";
import WarrantiesTable from "@/components/warranty/WarrantiesTable";
import ClaimsTable from "@/components/warranty/ClaimsTable";
import ExpiringWarrantiesCard from "@/components/warranty/ExpiringWarrantiesCard";
import RecentClaimsCard from "@/components/warranty/RecentClaimsCard";
import WarrantyFormDialog from "@/components/warranty/WarrantyFormDialog";
import ClaimFormDialog from "@/components/warranty/ClaimFormDialog";

// Mock data
import { mockWarranties, mockWarrantyClaims, mockWarrantyMetrics } from "@/components/warranty/mock-data";

const WarrantyManagement = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isWarrantyFormOpen, setIsWarrantyFormOpen] = useState(false);
  const [isClaimFormOpen, setIsClaimFormOpen] = useState(false);
  const [selectedWarrantyId, setSelectedWarrantyId] = useState<string | undefined>(undefined);
  
  const handleNewWarranty = () => {
    setIsWarrantyFormOpen(true);
  };
  
  const handleNewClaim = () => {
    setSelectedWarrantyId(undefined);
    setIsClaimFormOpen(true);
  };
  
  const handleCreateClaim = (warrantyId: string) => {
    setSelectedWarrantyId(warrantyId);
    setIsClaimFormOpen(true);
  };
  
  const handleViewDetails = (warrantyId: string) => {
    toast.info("Viewing warranty details", {
      description: `Warranty ID: ${warrantyId}`
    });
  };
  
  const handleViewClaim = (claimId: string) => {
    toast.info("Viewing claim details", {
      description: `Claim ID: ${claimId}`
    });
  };
  
  const handleViewDocuments = (warrantyId: string) => {
    toast.info("Viewing warranty documents", {
      description: `Warranty ID: ${warrantyId}`
    });
  };

  return (
    <div className="space-y-6">
      <WarrantyHeader onNewWarranty={handleNewWarranty} onNewClaim={handleNewClaim} />
      
      <MetricsCards metrics={mockWarrantyMetrics} />
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="warranties">Warranties</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <ExpiringWarrantiesCard 
              warranties={mockWarranties} 
              onViewDetails={handleViewDetails} 
            />
            <RecentClaimsCard 
              claims={mockWarrantyClaims} 
              onViewClaim={handleViewClaim} 
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Active Warranties</h3>
            <WarrantiesTable 
              warranties={mockWarranties.filter(w => w.status === 'Active')}
              onViewDetails={handleViewDetails}
              onCreateClaim={handleCreateClaim}
              onViewDocuments={handleViewDocuments}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="warranties" className="space-y-6 mt-6">
          <WarrantiesTable 
            warranties={mockWarranties}
            onViewDetails={handleViewDetails}
            onCreateClaim={handleCreateClaim}
            onViewDocuments={handleViewDocuments}
          />
        </TabsContent>
        
        <TabsContent value="claims" className="space-y-6 mt-6">
          <ClaimsTable 
            claims={mockWarrantyClaims}
            onViewClaim={handleViewClaim}
          />
        </TabsContent>
      </Tabs>
      
      {/* Dialogs */}
      {isWarrantyFormOpen && (
        <WarrantyFormDialog 
          open={isWarrantyFormOpen} 
          onClose={() => setIsWarrantyFormOpen(false)} 
        />
      )}
      
      {isClaimFormOpen && (
        <ClaimFormDialog 
          open={isClaimFormOpen} 
          onClose={() => setIsClaimFormOpen(false)}
          preselectedWarrantyId={selectedWarrantyId}
        />
      )}
    </div>
  );
};

export default WarrantyManagement;
