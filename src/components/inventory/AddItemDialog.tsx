
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package } from "lucide-react";
import { InventoryItem } from "./types";

export interface AddItemDialogProps {
  onItemAdded: (newItem: InventoryItem) => void;
}

export function AddItemDialog({ onItemAdded }: AddItemDialogProps) {
  const [partNumber, setPartNumber] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState("");
  const [minStock, setMinStock] = useState("");
  const [reorderPoint, setReorderPoint] = useState("");
  const [unitCost, setUnitCost] = useState("");

  const categories = [
    "Server Components",
    "Storage Components",
    "Network Components",
    "Power Components",
    "Cooling Components",
    "Cables & Connectors",
    "Testing Equipment",
    "Safety Equipment"
  ];

  const locations = [
    "Main Data Center - Warehouse A",
    "Satellite Store - Building B",
    "Emergency Backup Cabinet - Server Room A"
  ];

  const handleSubmit = () => {
    const newItem: InventoryItem = {
      id: `PART-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      description,
      category,
      partNumber,
      manufacturer,
      location,
      quantityAvailable: parseInt(quantity) || 0,
      minimumStock: parseInt(minStock) || 0,
      reorderPoint: parseInt(reorderPoint) || 0,
      unitCost: parseFloat(unitCost) || 0,
      lastRestockDate: new Date().toISOString().split('T')[0],
      associatedAssets: [],
      status: parseInt(quantity) > parseInt(minStock) ? 'Available' : parseInt(quantity) > 0 ? 'Low Stock' : 'Out of Stock',
      specifications: {}
    };

    onItemAdded(newItem);
  };

  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle className="flex items-center text-xl">
          <Package className="mr-2 h-5 w-5" />
          Add New Inventory Item
        </DialogTitle>
      </DialogHeader>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Details</TabsTrigger>
          <TabsTrigger value="technical">Technical Specs</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="partNumber">Part Number <span className="text-red-500">*</span></Label>
              <Input
                id="partNumber"
                value={partNumber}
                onChange={(e) => setPartNumber(e.target.value)}
                placeholder="e.g., PSU-DELL-495W"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Item Name <span className="text-red-500">*</span></Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Server Power Supply Unit"
                required
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the item"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="manufacturer">Manufacturer</Label>
              <Input
                id="manufacturer"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
                placeholder="e.g., Dell"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Storage Location <span className="text-red-500">*</span></Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Initial Quantity <span className="text-red-500">*</span></Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g., 10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minStock">Minimum Stock Level</Label>
              <Input
                id="minStock"
                type="number"
                min="0"
                value={minStock}
                onChange={(e) => setMinStock(e.target.value)}
                placeholder="e.g., 5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reorderPoint">Reorder Point</Label>
              <Input
                id="reorderPoint"
                type="number"
                min="0"
                value={reorderPoint}
                onChange={(e) => setReorderPoint(e.target.value)}
                placeholder="e.g., 8"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unitCost">Unit Cost ($)</Label>
              <Input
                id="unitCost"
                type="number"
                min="0"
                step="0.01"
                value={unitCost}
                onChange={(e) => setUnitCost(e.target.value)}
                placeholder="e.g., 349.99"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="technical" className="space-y-4 pt-4">
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md border">
              <p className="text-muted-foreground text-sm">Technical specifications can be added after the item is created.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="file">Upload Datasheet (Optional)</Label>
                <Input id="file" type="file" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Upload Image (Optional)</Label>
                <Input id="image" type="file" accept="image/*" />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <DialogFooter>
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button 
          type="button" 
          onClick={handleSubmit}
          disabled={!name || !partNumber || !category || !location || !quantity}
        >
          Add Item
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
