
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MoreHorizontal, 
  Filter, 
  ArrowUpDown, 
  FileText, 
  Edit, 
  Trash2, 
  ShoppingCart, 
  Repeat, 
  Eye, 
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { InventoryItem } from "./types";

interface HardwareInventoryTableProps {
  inventoryItems: InventoryItem[];
}

const HardwareInventoryTable = ({ inventoryItems }: HardwareInventoryTableProps) => {
  const [filteredItems, setFilteredItems] = useState<InventoryItem[]>(inventoryItems);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredItems(inventoryItems);
    } else {
      const filtered = inventoryItems.filter(
        item => 
          item.name.toLowerCase().includes(query) || 
          item.partNumber.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
      setFilteredItems(filtered);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'Available':
        return <Badge className="bg-emerald-500">{status}</Badge>;
      case 'Low Stock':
        return <Badge className="bg-amber-500">{status}</Badge>;
      case 'Out of Stock':
        return <Badge className="bg-red-500">{status}</Badge>;
      case 'Reordered':
        return <Badge className="bg-blue-500">{status}</Badge>;
      case 'Discontinued':
        return <Badge className="bg-gray-500">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="flex w-full md:w-auto">
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full md:w-80"
          />
          <Button variant="outline" size="icon" className="ml-2">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <Button variant="outline" size="sm">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sort
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Part Number</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right hidden lg:table-cell">Unit Cost</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No items found.
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.partNumber}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="hidden md:table-cell">{item.location}</TableCell>
                  <TableCell className="text-right">
                    {item.quantityAvailable}
                    {item.quantityAvailable < item.minimumStock && (
                      <AlertTriangle className="h-4 w-4 text-amber-500 inline ml-1" />
                    )}
                    {item.quantityAvailable === 0 && (
                      <AlertTriangle className="h-4 w-4 text-red-500 inline ml-1" />
                    )}
                    {item.quantityAvailable > item.reorderPoint && (
                      <CheckCircle className="h-4 w-4 text-emerald-500 inline ml-1" />
                    )}
                  </TableCell>
                  <TableCell className="text-right hidden lg:table-cell">{formatCurrency(item.unitCost)}</TableCell>
                  <TableCell>{renderStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Item
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Reorder
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Repeat className="mr-2 h-4 w-4" />
                          Transfer
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="p-4 text-sm text-muted-foreground">
        Showing {filteredItems.length} of {inventoryItems.length} items
      </div>
    </div>
  );
};

export default HardwareInventoryTable;
