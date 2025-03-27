
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Plus, QrCode, Search } from "lucide-react";
import LocationQRCode from "./LocationQRCode";
import AddLocationDialog from "./AddLocationDialog";
import { mockLocations } from "./mockLocationData";

interface LocationsListProps {
  onSelectLocation: (locationId: string) => void;
}

const LocationsList = ({ onSelectLocation }: LocationsListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<{id: string, name: string} | null>(null);
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filteredLocations = mockLocations.filter(
    (location) => 
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.buildingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.floor.toString().includes(searchQuery)
  );

  const handleSelectLocation = (locationId: string) => {
    onSelectLocation(locationId);
    const location = mockLocations.find(loc => loc.id === locationId);
    if (location) {
      setSelectedLocation({ id: location.id, name: location.name });
    }
  };

  const handleQRCode = (locationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const location = mockLocations.find(loc => loc.id === locationId);
    if (location) {
      setSelectedLocation({ id: location.id, name: location.name });
      setShowQRDialog(true);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>All Locations</CardTitle>
          <div className="flex w-full sm:w-auto gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search locations..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Location
                </Button>
              </DialogTrigger>
              <AddLocationDialog onClose={() => setShowAddDialog(false)} />
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location Name</TableHead>
                <TableHead>Building Code</TableHead>
                <TableHead>Floor</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Asset Count</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLocations.length > 0 ? (
                filteredLocations.map((location) => (
                  <TableRow 
                    key={location.id} 
                    className="cursor-pointer hover:bg-muted" 
                    onClick={() => handleSelectLocation(location.id)}
                  >
                    <TableCell className="font-medium">{location.name}</TableCell>
                    <TableCell>{location.buildingCode}</TableCell>
                    <TableCell>{location.floor}</TableCell>
                    <TableCell>{location.room}</TableCell>
                    <TableCell>{location.assetCount}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => handleQRCode(location.id, e)}
                        title="Generate QR Code"
                      >
                        <QrCode className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No locations found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      
      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        {selectedLocation && (
          <LocationQRCode locationId={selectedLocation.id} locationName={selectedLocation.name} />
        )}
      </Dialog>
    </Card>
  );
};

export default LocationsList;
