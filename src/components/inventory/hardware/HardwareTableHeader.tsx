
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, ArrowUpDown, FileText } from "lucide-react";

interface HardwareTableHeaderProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const HardwareTableHeader = ({ 
  searchQuery, 
  onSearchChange 
}: HardwareTableHeaderProps) => {
  return (
    <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
      <div className="flex w-full md:w-auto">
        <Input
          placeholder="Search items..."
          value={searchQuery}
          onChange={onSearchChange}
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
  );
};

export default HardwareTableHeader;
