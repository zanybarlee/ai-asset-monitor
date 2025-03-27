
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, FileText, Download, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AddItemDialog } from "@/components/inventory/AddItemDialog";
import { InventoryItem } from "./types";

interface InventoryHeaderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onItemAdded: (newItem: InventoryItem) => void;
}

const InventoryHeader = ({ open, setOpen, onItemAdded }: InventoryHeaderProps) => {
  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center pb-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-6 w-6 text-amber-500">
            <path d="M20 5H8a4 4 0 0 0-4 4v10a1 1 0 0 0 1 1h.5"></path>
            <path d="M17 17.5V19a1 1 0 0 1-1 1h-1"></path>
            <path d="M15.75 11.5h.5"></path>
            <path d="M17 11.5a2.5 2.5 0 0 1 0 5"></path>
            <path d="M13 11.5a2.5 2.5 0 0 0 0 5"></path>
            <path d="M10.5 13.5a3.5 3.5 0 0 0-2.5 5"></path>
            <path d="M7 10V5.5a2 2 0 0 1 2-2h8"></path>
            <path d="M18 17.5a1.5 1.5 0 0 0 3 0v-6.1a2.5 2.5 0 0 0-1.5-2.3l-9-3.2a2.5 2.5 0 0 0-3 2.2"></path>
          </svg>
          Inventory Management
        </h1>
        <p className="text-muted-foreground">Track, manage and deploy hardware and software assets</p>
      </div>
      
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <div className="flex">
          <Input placeholder="Search inventory..." className="w-full md:w-64" />
          <Button variant="outline" size="icon" className="ml-2">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <AddItemDialog onItemAdded={onItemAdded} />
          </Dialog>
          
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Reports
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InventoryHeader;
