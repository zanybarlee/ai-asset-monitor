
import { ShieldCheck, Plus, FileText, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WarrantyHeaderProps {
  onNewWarranty: () => void;
  onNewClaim: () => void;
}

const WarrantyHeader = ({ onNewWarranty, onNewClaim }: WarrantyHeaderProps) => {
  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center pb-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center">
          <ShieldCheck className="mr-2 h-6 w-6 text-emerald-500" />
          Warranty Management
        </h1>
        <p className="text-muted-foreground">Track, manage, and claim warranties for data center assets</p>
      </div>
      
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <div className="flex">
          <Input placeholder="Search warranties..." className="max-w-xs" />
          <div className="ml-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Warranties</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expiring">Expiring Soon</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button onClick={onNewWarranty} className="sm:w-auto">
            <Plus className="h-4 w-4 mr-2" /> New Warranty
          </Button>
          <Button onClick={onNewClaim} variant="outline" className="sm:w-auto">
            <FileText className="h-4 w-4 mr-2" /> Submit Claim
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WarrantyHeader;
