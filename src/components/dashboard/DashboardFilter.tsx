
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

interface DashboardFilterProps {
  filterPeriod: string;
  setFilterPeriod: (value: string) => void;
  filterLocation: string;
  setFilterLocation: (value: string) => void;
  filterType: string; 
  setFilterType: (value: string) => void;
}

const DashboardFilter = ({
  filterPeriod,
  setFilterPeriod,
  filterLocation,
  setFilterLocation,
  filterType,
  setFilterType
}: DashboardFilterProps) => {
  return (
    <div className="flex flex-wrap gap-4 items-center p-4 border rounded-lg bg-muted/20">
      <div className="font-medium">Filter by:</div>
      <div className="flex items-center gap-2">
        <label className="text-sm">Time Period:</label>
        <Select value={filterPeriod} onValueChange={setFilterPeriod}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center gap-2">
        <label className="text-sm">Location:</label>
        <Select value={filterLocation} onValueChange={setFilterLocation}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="serverRoomA">Server Room A</SelectItem>
            <SelectItem value="serverRoomB">Server Room B</SelectItem>
            <SelectItem value="coolingTower">Cooling Tower</SelectItem>
            <SelectItem value="powerRoom">Power Room</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center gap-2">
        <label className="text-sm">Type:</label>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="preventative">Preventative</SelectItem>
            <SelectItem value="corrective">Corrective</SelectItem>
            <SelectItem value="emergency">Emergency</SelectItem>
            <SelectItem value="installation">Installation</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button variant="secondary" size="sm" className="ml-auto">
        <Filter className="h-4 w-4 mr-2" />
        Apply Filters
      </Button>
    </div>
  );
};

export default DashboardFilter;
