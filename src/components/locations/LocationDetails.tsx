
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Save, Tag } from "lucide-react";
import { mockLocations } from "./mockLocationData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import LocationQRCode from "./LocationQRCode";

interface LocationDetailsProps {
  locationId: string;
}

const LocationDetails = ({ locationId }: LocationDetailsProps) => {
  const location = mockLocations.find((loc) => loc.id === locationId);
  const [showQRDialog, setShowQRDialog] = useState(false);
  
  if (!location) {
    return <div>Location not found</div>;
  }

  // Mock assets for this location
  const locationAssets = [
    { id: "asset-1", name: "HVAC Unit", type: "Equipment", status: "Operational" },
    { id: "asset-2", name: "Generator", type: "Power", status: "Maintenance" },
    { id: "asset-3", name: "Security Camera", type: "Security", status: "Operational" },
  ];

  // Mock requests for this location
  const locationRequests = [
    { id: "req-1", title: "HVAC Repair", status: "Pending", date: "2023-10-15" },
    { id: "req-2", title: "Electrical Inspection", status: "Completed", date: "2023-10-10" },
    { id: "req-3", title: "Security System Update", status: "In Progress", date: "2023-10-25" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{location.name}</CardTitle>
              <CardDescription>Building: {location.buildingCode}, Floor: {location.floor}, Room: {location.room}</CardDescription>
            </div>
            <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <QrCode className="mr-2 h-4 w-4" />
                  Generate QR Code
                </Button>
              </DialogTrigger>
              <LocationQRCode locationId={location.id} locationName={location.name} />
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="locationName">Location Name</Label>
                <Input id="locationName" defaultValue={location.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buildingCode">Building Code</Label>
                <Input id="buildingCode" defaultValue={location.buildingCode} />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="floor">Floor</Label>
                <Input id="floor" type="number" defaultValue={location.floor.toString()} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="room">Room</Label>
                <Input id="room" defaultValue={location.room} />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Update Location
          </Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="assets">
        <TabsList>
          <TabsTrigger value="assets">Associated Assets</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assets" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Assets in this Location</CardTitle>
                <Button variant="outline">
                  <Tag className="mr-2 h-4 w-4" />
                  Associate Asset
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {locationAssets.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell className="font-medium">{asset.name}</TableCell>
                      <TableCell>{asset.type}</TableCell>
                      <TableCell>{asset.status}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Requests for this Location</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {locationRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.title}</TableCell>
                      <TableCell>{request.status}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LocationDetails;
