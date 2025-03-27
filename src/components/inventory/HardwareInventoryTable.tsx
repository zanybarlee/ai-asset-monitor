
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown } from "lucide-react";
import { InventoryItem } from "@/components/inventory/AddItemDialog";

interface HardwareInventoryTableProps {
  inventoryItems: InventoryItem[];
}

const HardwareInventoryTable = ({ inventoryItems }: HardwareInventoryTableProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Hardware Inventory</CardTitle>
            <CardDescription>All hardware assets in the system</CardDescription>
          </div>
          <div className="flex gap-2">
            <Input className="w-64" placeholder="Search assets..." />
            <Button variant="outline" size="icon">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-12 p-4 text-sm font-medium text-muted-foreground bg-muted">
            <div className="col-span-1">ID</div>
            <div className="col-span-3">Name</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Location</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Last Updated</div>
          </div>
          {inventoryItems.map((item, i) => (
            <div key={i} className="grid grid-cols-12 p-4 text-sm border-t">
              <div className="col-span-1 font-medium">{item.id}</div>
              <div className="col-span-3">{item.name}</div>
              <div className="col-span-2">{item.category}</div>
              <div className="col-span-2">{item.location}</div>
              <div className="col-span-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item.status === 'Deployed' ? 'bg-green-100 text-green-800' : 
                  item.status === 'Available' ? 'bg-blue-100 text-blue-800' : 
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status}
                </span>
              </div>
              <div className="col-span-2 text-muted-foreground">
                {item.id.startsWith('SRV') || item.id.startsWith('STO') || item.id.startsWith('NET') 
                  ? ['2 days ago', '5 days ago', '1 week ago', '3 days ago', '1 day ago'][i % 5] 
                  : 'Just now'}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">Showing {inventoryItems.length} of {1280 + inventoryItems.length} items</div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default HardwareInventoryTable;
