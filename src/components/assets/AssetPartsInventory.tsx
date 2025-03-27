
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package2, AlertTriangle, Plus, ArrowDown, ArrowUpRight, ShoppingCart, CalendarDays } from "lucide-react";

interface Part {
  id: string;
  name: string;
  partNumber: string;
  location: string;
  quantity: number;
  minQuantity: number;
  unitCost: number;
  lastUsed: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

interface WorkOrder {
  id: string;
  title: string;
  date: string;
  parts: {
    id: string;
    name: string;
    quantity: number;
  }[];
}

interface AssetPartsInventoryProps {
  assetId: string;
}

const AssetPartsInventory = ({ assetId }: AssetPartsInventoryProps) => {
  const [activeTab, setActiveTab] = useState("inventory");
  const [isAddPartOpen, setIsAddPartOpen] = useState(false);
  const [isOrderPartsOpen, setIsOrderPartsOpen] = useState(false);
  
  // Mock parts data
  const parts: Part[] = [
    {
      id: "P001",
      name: "Air Filter",
      partNumber: "AF-1040-C",
      location: "Main Warehouse",
      quantity: 5,
      minQuantity: 3,
      unitCost: 38.50,
      lastUsed: "2024-02-10",
      status: "In Stock"
    },
    {
      id: "P002",
      name: "Condenser Fan Motor",
      partNumber: "CFM-2234",
      location: "Main Warehouse",
      quantity: 1,
      minQuantity: 1,
      unitCost: 245.99,
      lastUsed: "2023-11-15",
      status: "Low Stock"
    },
    {
      id: "P003",
      name: "Compressor Contactor",
      partNumber: "CC-5501",
      location: "Main Warehouse",
      quantity: 0,
      minQuantity: 1,
      unitCost: 68.75,
      lastUsed: "2023-09-22",
      status: "Out of Stock"
    },
    {
      id: "P004",
      name: "Run Capacitor",
      partNumber: "RC-4015-45",
      location: "Electrical Room",
      quantity: 3,
      minQuantity: 2,
      unitCost: 24.99,
      lastUsed: "2024-01-18",
      status: "In Stock"
    },
    {
      id: "P005",
      name: "Pressure Switch",
      partNumber: "PS-3340-LP",
      location: "Electrical Room",
      quantity: 2,
      minQuantity: 2,
      unitCost: 42.50,
      lastUsed: "2023-10-30",
      status: "In Stock"
    }
  ];
  
  // Mock work order history
  const workOrderHistory: WorkOrder[] = [
    {
      id: "WO-2023-112",
      title: "Quarterly Maintenance",
      date: "2024-02-10",
      parts: [
        { id: "P001", name: "Air Filter", quantity: 1 }
      ]
    },
    {
      id: "WO-2023-098",
      title: "Fan Motor Replacement",
      date: "2023-11-15",
      parts: [
        { id: "P002", name: "Condenser Fan Motor", quantity: 1 },
        { id: "P004", name: "Run Capacitor", quantity: 1 }
      ]
    },
    {
      id: "WO-2023-075",
      title: "Electrical System Repair",
      date: "2023-09-22",
      parts: [
        { id: "P003", name: "Compressor Contactor", quantity: 1 },
        { id: "P005", name: "Pressure Switch", quantity: 1 }
      ]
    }
  ];
  
  // Upcoming scheduled parts replacements
  const scheduledReplacements = [
    {
      id: "SPR-001",
      part: "Air Filter",
      quantity: 1,
      scheduledDate: "2024-05-10",
      workOrder: "WO-2024-042"
    },
    {
      id: "SPR-002",
      part: "Compressor Oil",
      quantity: 2,
      scheduledDate: "2024-06-15",
      workOrder: "WO-2024-055"
    }
  ];
  
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-emerald-500">In Stock</Badge>;
      case "Low Stock":
        return <Badge className="bg-amber-500">Low Stock</Badge>;
      case "Out of Stock":
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">Parts & Inventory</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => setIsOrderPartsOpen(true)}>
            <ShoppingCart className="h-4 w-4" />
            Order Parts
          </Button>
          <Button size="sm" className="flex items-center gap-1" onClick={() => setIsAddPartOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Part
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="inventory" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="inventory">Parts Inventory</TabsTrigger>
          <TabsTrigger value="usage">Usage History</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Replacements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="inventory" className="pt-4">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-7 bg-muted/50 p-4 text-sm font-medium">
                  <div>Part #</div>
                  <div className="col-span-2">Name</div>
                  <div>Location</div>
                  <div>Quantity</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>
                
                <div className="divide-y">
                  {parts.map((part) => (
                    <div key={part.id} className="grid grid-cols-7 p-4 text-sm items-center">
                      <div className="font-medium">{part.partNumber}</div>
                      <div className="col-span-2 font-medium">{part.name}</div>
                      <div>{part.location}</div>
                      <div className="flex items-center gap-1">
                        <span>{part.quantity}</span>
                        {part.quantity <= part.minQuantity && part.quantity > 0 && (
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        )}
                        {part.quantity === 0 && (
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                      <div>{renderStatusBadge(part.status)}</div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Package2 className="h-4 w-4 text-blue-500" />
                  Total Parts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{parts.length}</div>
                <p className="text-xs text-muted-foreground">Unique parts associated with this asset</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Low Stock
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{parts.filter(p => p.status === "Low Stock").length}</div>
                <p className="text-xs text-muted-foreground">Parts below minimum quantity</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  Out of Stock
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{parts.filter(p => p.status === "Out of Stock").length}</div>
                <p className="text-xs text-muted-foreground">Parts with zero quantity</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="usage" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Parts Usage History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workOrderHistory.map((workOrder) => (
                  <Card key={workOrder.id} className="overflow-hidden">
                    <CardHeader className="bg-muted/50 p-4 pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-md flex items-center gap-2">
                            {workOrder.id}
                            <span className="text-sm font-normal">-</span>
                            <span className="font-normal">{workOrder.title}</span>
                          </CardTitle>
                          <div className="text-sm text-muted-foreground">{workOrder.date}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-3">
                      <div className="space-y-2">
                        {workOrder.parts.map((part) => (
                          <div key={part.id} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Package2 className="h-4 w-4 text-muted-foreground" />
                              <span>{part.name}</span>
                            </div>
                            <div className="text-sm">Quantity: {part.quantity}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scheduled" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-blue-600" />
                Scheduled Part Replacements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReplacements.length > 0 ? (
                  scheduledReplacements.map((replacement) => (
                    <div key={replacement.id} className="flex items-center p-3 border rounded-md">
                      <div className="flex-1">
                        <div className="font-medium">{replacement.part}</div>
                        <div className="text-sm text-muted-foreground">
                          Quantity: {replacement.quantity} • Scheduled: {replacement.scheduledDate}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{replacement.workOrder}</Badge>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No scheduled replacements
                  </div>
                )}
                
                <div className="flex justify-center mt-6">
                  <Button variant="outline" className="flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    Schedule Replacement
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Replacement Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-3 border rounded-md">
                  <div className="flex-1">
                    <div className="font-medium">Compressor Contactor</div>
                    <div className="text-sm text-muted-foreground">
                      Based on usage patterns, this part should be replaced every 18 months
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-amber-500">Recommended</Badge>
                    <Button variant="outline" size="sm">Schedule</Button>
                  </div>
                </div>
                
                <div className="flex items-center p-3 border rounded-md">
                  <div className="flex-1">
                    <div className="font-medium">Fan Belt</div>
                    <div className="text-sm text-muted-foreground">
                      Based on manufacturer guidelines, this part should be replaced every 12 months
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Optional</Badge>
                    <Button variant="outline" size="sm">Schedule</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Part Dialog */}
      <Dialog open={isAddPartOpen} onOpenChange={setIsAddPartOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Part to Inventory</DialogTitle>
            <DialogDescription>
              Link a new part to this asset and add it to inventory
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="partNumber" className="text-right">
                Part Number
              </Label>
              <Input id="partNumber" placeholder="AF-1040-C" className="col-span-3" />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="partName" className="text-right">
                Name
              </Label>
              <Input id="partName" placeholder="Air Filter" className="col-span-3" />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Select>
                <SelectTrigger id="location" className="col-span-3">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Warehouse</SelectItem>
                  <SelectItem value="electrical">Electrical Room</SelectItem>
                  <SelectItem value="mechanical">Mechanical Room</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input id="quantity" type="number" min="0" placeholder="1" className="col-span-3" />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="minQuantity" className="text-right">
                Min Quantity
              </Label>
              <Input id="minQuantity" type="number" min="0" placeholder="1" className="col-span-3" />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unitCost" className="text-right">
                Unit Cost ($)
              </Label>
              <Input id="unitCost" type="number" min="0" step="0.01" placeholder="0.00" className="col-span-3" />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPartOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddPartOpen(false)}>
              Add Part
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Order Parts Dialog */}
      <Dialog open={isOrderPartsOpen} onOpenChange={setIsOrderPartsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Parts</DialogTitle>
            <DialogDescription>
              Place an order for parts that are low or out of stock
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-4 bg-muted/50 p-3 text-sm font-medium">
                <div className="col-span-2">Part</div>
                <div>Current Stock</div>
                <div>Order Quantity</div>
              </div>
              
              <div className="divide-y">
                {parts.filter(part => part.quantity <= part.minQuantity).map((part) => (
                  <div key={part.id} className="grid grid-cols-4 p-3 text-sm items-center">
                    <div className="col-span-2 font-medium">{part.name}</div>
                    <div className="flex items-center gap-1">
                      <span>{part.quantity}</span>
                      {part.quantity <= part.minQuantity && part.quantity > 0 && (
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      )}
                      {part.quantity === 0 && (
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <div>
                      <Input 
                        type="number" 
                        min="1" 
                        defaultValue={part.minQuantity - part.quantity + 1} 
                        className="h-8"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vendor">Vendor</Label>
              <Select defaultValue="official">
                <SelectTrigger id="vendor">
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="official">Official Manufacturer</SelectItem>
                  <SelectItem value="preferred">Preferred Supplier</SelectItem>
                  <SelectItem value="alternate">Alternate Supplier</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select defaultValue="standard">
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emergency">Emergency (24h)</SelectItem>
                  <SelectItem value="rush">Rush (2-3 days)</SelectItem>
                  <SelectItem value="standard">Standard (1 week)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input id="notes" placeholder="Additional instructions for this order" />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOrderPartsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOrderPartsOpen(false)}>
              Place Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssetPartsInventory;
