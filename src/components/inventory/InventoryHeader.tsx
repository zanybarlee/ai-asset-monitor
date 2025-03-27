
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddItemDialog, { InventoryItem } from "@/components/inventory/AddItemDialog";

interface InventoryHeaderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onItemAdded: (newItem: InventoryItem) => void;
}

const InventoryHeader = ({ open, setOpen, onItemAdded }: InventoryHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-2xl font-bold">Provisioning & Inventory Management</h3>
        <p className="text-muted-foreground">Track, manage and deploy hardware and software assets</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <AddItemDialog onItemAdded={onItemAdded} />
        </Dialog>
      </div>
    </div>
  );
};

export default InventoryHeader;
