
import { Search, Filter, Calendar, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AuditSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedEventType: string;
  setSelectedEventType: (eventType: string) => void;
  eventTypes: { value: string; label: string }[];
}

const AuditSearchFilters = ({
  searchTerm,
  setSearchTerm,
  selectedEventType,
  setSelectedEventType,
  eventTypes,
}: AuditSearchFiltersProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2 w-1/2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by ID, user, action or details..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-9"
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select 
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={selectedEventType}
            onChange={(e) => setSelectedEventType(e.target.value)}
          >
            {eventTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        
        <Button variant="outline" size="sm" className="h-9">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Date Range</span>
        </Button>
        
        <Button variant="outline" size="sm" className="h-9">
          <Download className="h-4 w-4 mr-2" />
          <span>Export</span>
        </Button>
      </div>
    </div>
  );
};

export default AuditSearchFilters;
