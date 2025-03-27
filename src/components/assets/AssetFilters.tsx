
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AssetFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const AssetFilters = ({ searchQuery, onSearchChange }: AssetFiltersProps) => {
  return (
    <div className="space-y-4">
      <Card className="glass">
        <CardHeader className="pb-2">
          <CardTitle>Filter Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search assets..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="font-medium text-sm">Asset Types</div>
            <div className="space-y-1">
              <div className="flex items-center">
                <input type="checkbox" id="type-hvac" className="mr-2" defaultChecked />
                <label htmlFor="type-hvac" className="text-sm">HVAC Systems</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="type-electrical" className="mr-2" defaultChecked />
                <label htmlFor="type-electrical" className="text-sm">Electrical</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="type-fire" className="mr-2" defaultChecked />
                <label htmlFor="type-fire" className="text-sm">Fire Safety</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="type-security" className="mr-2" defaultChecked />
                <label htmlFor="type-security" className="text-sm">Security Systems</label>
              </div>
            </div>
            
            <div className="font-medium text-sm mt-4">Locations</div>
            <div className="space-y-1">
              <div className="flex items-center">
                <input type="checkbox" id="loc-roomA" className="mr-2" defaultChecked />
                <label htmlFor="loc-roomA" className="text-sm">Server Room A</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="loc-roomB" className="mr-2" defaultChecked />
                <label htmlFor="loc-roomB" className="text-sm">Server Room B</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="loc-roomC" className="mr-2" defaultChecked />
                <label htmlFor="loc-roomC" className="text-sm">Server Room C</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="loc-power" className="mr-2" defaultChecked />
                <label htmlFor="loc-power" className="text-sm">Power Room</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="loc-external" className="mr-2" defaultChecked />
                <label htmlFor="loc-external" className="text-sm">External Building</label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            <Filter className="mr-2 h-4 w-4" />
            Apply Filters
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="glass">
        <CardHeader className="pb-2">
          <CardTitle>Asset Health</CardTitle>
          <div className="text-sm text-muted-foreground">Overall health distribution</div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Excellent (85-100%)</span>
                <span className="text-sm font-medium text-emerald-500">3</span>
              </div>
              <Progress value={50} className="h-2 bg-muted" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Good (60-84%)</span>
                <span className="text-sm font-medium text-amber-500">2</span>
              </div>
              <Progress value={33} className="h-2 bg-muted" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Poor (0-59%)</span>
                <span className="text-sm font-medium text-destructive">1</span>
              </div>
              <Progress value={17} className="h-2 bg-muted" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetFilters;
