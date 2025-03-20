
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, Plus, ArrowUpDown, QrCode, FileDown } from "lucide-react";

// Mock data for assets
const mockAssets = [
  {
    id: "AC-001",
    name: "Main Cooling Unit",
    type: "HVAC",
    status: "Operational",
    health: 94,
    lastMaintenance: "2023-05-15",
    nextMaintenance: "2023-11-15",
    location: "Server Room A",
  },
  {
    id: "PS-002",
    name: "Primary Power Supply",
    type: "Electrical",
    status: "Operational",
    health: 87,
    lastMaintenance: "2023-04-22",
    nextMaintenance: "2023-10-22",
    location: "Power Room",
  },
  {
    id: "FS-003",
    name: "Fire Suppression System",
    type: "Fire Safety",
    status: "Warning",
    health: 68,
    lastMaintenance: "2023-03-10",
    nextMaintenance: "2023-09-10",
    location: "Server Room B",
  },
  {
    id: "GN-004",
    name: "Backup Generator",
    type: "Electrical",
    status: "Operational",
    health: 91,
    lastMaintenance: "2023-06-05",
    nextMaintenance: "2023-12-05",
    location: "External Building",
  },
  {
    id: "UPS-005",
    name: "UPS System Rack 3",
    type: "Electrical",
    status: "Critical",
    health: 45,
    lastMaintenance: "2023-02-18",
    nextMaintenance: "2023-08-18",
    location: "Server Room A",
  },
  {
    id: "AC-006",
    name: "Secondary Cooling Unit",
    type: "HVAC",
    status: "Operational",
    health: 82,
    lastMaintenance: "2023-05-28",
    nextMaintenance: "2023-11-28",
    location: "Server Room C",
  },
];

const Assets = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  
  // Filter assets based on search query and selected tab
  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          asset.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "critical") return matchesSearch && asset.status === "Critical";
    if (selectedTab === "warning") return matchesSearch && asset.status === "Warning";
    if (selectedTab === "operational") return matchesSearch && asset.status === "Operational";
    
    return matchesSearch;
  });
  
  // Get counts for tabs
  const criticalCount = mockAssets.filter(a => a.status === "Critical").length;
  const warningCount = mockAssets.filter(a => a.status === "Warning").length;
  const operationalCount = mockAssets.filter(a => a.status === "Operational").length;
  
  // Get health status color
  const getHealthColor = (health: number) => {
    if (health >= 85) return "text-emerald-500";
    if (health >= 60) return "text-amber-500";
    return "text-destructive";
  };
  
  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Operational":
        return <Badge className="bg-emerald-500">{status}</Badge>;
      case "Warning":
        return <Badge className="bg-amber-500">{status}</Badge>;
      case "Critical":
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Asset Management</h2>
          <p className="text-muted-foreground">
            Monitor and manage all data center equipment
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Asset
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/4 space-y-4">
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
                  onChange={(e) => setSearchQuery(e.target.value)}
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
              <CardDescription>Overall health distribution</CardDescription>
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
        
        <div className="md:w-3/4">
          <Card className="glass">
            <CardHeader className="pb-2">
              <Tabs 
                defaultValue="all" 
                className="w-full"
                onValueChange={setSelectedTab}
              >
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">
                    All 
                    <Badge variant="outline" className="ml-2">{mockAssets.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="operational">
                    Operational
                    <Badge variant="outline" className="ml-2">{operationalCount}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="warning">
                    Warning
                    <Badge variant="outline" className="ml-2">{warningCount}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="critical">
                    Critical
                    <Badge variant="outline" className="ml-2">{criticalCount}</Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 bg-muted/50 p-4 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    ID <ArrowUpDown className="h-3 w-3" />
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    Asset Name <ArrowUpDown className="h-3 w-3" />
                  </div>
                  <div>Type</div>
                  <div>Health</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>
                
                <div className="divide-y">
                  {filteredAssets.length > 0 ? (
                    filteredAssets.map((asset) => (
                      <div key={asset.id} className="grid grid-cols-7 p-4 text-sm items-center">
                        <div className="font-medium">{asset.id}</div>
                        <div className="col-span-2 font-medium">{asset.name}</div>
                        <div>{asset.type}</div>
                        <div className="flex items-center gap-2">
                          <span className={getHealthColor(asset.health)}>{asset.health}%</span>
                          <Progress 
                            value={asset.health} 
                            className="h-2 w-20"
                            style={{
                              background: asset.health >= 85 ? 'rgba(16, 185, 129, 0.2)' :
                                        asset.health >= 60 ? 'rgba(245, 158, 11, 0.2)' : 
                                        'rgba(239, 68, 68, 0.2)',
                              color: asset.health >= 85 ? 'rgb(16, 185, 129)' :
                                     asset.health >= 60 ? 'rgb(245, 158, 11)' : 
                                     'rgb(239, 68, 68)'
                            }}
                          />
                        </div>
                        <div>{getStatusBadge(asset.status)}</div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">View</Button>
                          <Button variant="outline" size="icon">
                            <QrCode className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No assets match the current filters
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredAssets.length} of {mockAssets.length} assets
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Assets;
