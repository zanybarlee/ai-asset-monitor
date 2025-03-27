
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LocationsList from "@/components/locations/LocationsList";
import LocationDetails from "@/components/locations/LocationDetails";
import BulkImportLocations from "@/components/locations/BulkImportLocations";
import { useToast } from "@/hooks/use-toast";

const LocationManagement = () => {
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocationId(locationId);
  };

  const handleBulkImportSuccess = () => {
    toast({
      title: "Locations imported successfully",
      description: "The locations have been added to the system",
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Location Management</h2>
        <p className="text-muted-foreground">
          Manage locations, associate assets, and generate QR codes
        </p>
      </div>

      <Tabs defaultValue="list">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="list">Locations List</TabsTrigger>
          <TabsTrigger value="details" disabled={!selectedLocationId}>Location Details</TabsTrigger>
          <TabsTrigger value="import">Bulk Import</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <LocationsList onSelectLocation={handleLocationSelect} />
        </TabsContent>
        
        <TabsContent value="details">
          {selectedLocationId && <LocationDetails locationId={selectedLocationId} />}
        </TabsContent>
        
        <TabsContent value="import">
          <BulkImportLocations onImportSuccess={handleBulkImportSuccess} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LocationManagement;
