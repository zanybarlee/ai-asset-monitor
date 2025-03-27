
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { InventoryItem } from "./types";
import HardwareTableHeader from "./hardware/HardwareTableHeader";
import InventoryTableRow from "./hardware/InventoryTableRow";
import { formatCurrency } from "./utils/formatters";

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

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <HardwareTableHeader 
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
      />
      
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
                <InventoryTableRow 
                  key={item.id} 
                  item={item} 
                  formatCurrency={formatCurrency} 
                />
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
