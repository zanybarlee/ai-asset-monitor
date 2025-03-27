
import { TableRow, TableCell } from "@/components/ui/table";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { InventoryItem } from "../types";
import StatusBadge from "./StatusBadge";
import ItemActionsMenu from "./ItemActionsMenu";

interface InventoryTableRowProps {
  item: InventoryItem;
  formatCurrency: (value: number) => string;
}

const InventoryTableRow = ({ item, formatCurrency }: InventoryTableRowProps) => {
  return (
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
      <TableCell className="text-right hidden lg:table-cell">
        {formatCurrency(item.unitCost)}
      </TableCell>
      <TableCell>
        <StatusBadge status={item.status} />
      </TableCell>
      <TableCell>
        <ItemActionsMenu />
      </TableCell>
    </TableRow>
  );
};

export default InventoryTableRow;
