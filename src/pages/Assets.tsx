import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, Plus, ArrowUpDown, QrCode, FileDown, Upload, Clipboard, Tag, ChevronDown, HardDrive, BookOpen } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, LineChart } from "@/components/ui/charts";

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
    mtbf: "4344 hrs",
    mttr: "1.2 hrs",
    sensors: ["temp-01", "humid-02"],
    manufacturer: "Schneider Electric",
    model: "ACRD1012A",
    serialNumber: "SE-29384756",
    installDate: "2021-08-15",
    warrantyExpiry: "2026-08-15"
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

const timeSeriesData = [
  { month: "Jan", uptime: 720, downtime: 24 },
  { month: "Feb", uptime: 672, downtime: 0 },
  { month: "Mar", uptime: 744, downtime: 0 },
  { month: "Apr", uptime: 720, downtime: 0 },
  { month: "May", uptime: 744, downtime: 0 },
  { month: "Jun", uptime: 720, downtime: 8 },
];

const failureData = [
  { month: "Jan", failures: 3 },
  { month: "Feb", failures: 2 },
  { month: "Mar", failures: 1 },
  { month: "Apr", failures: 0 },
  { month: "May", failures: 3 },
  { month: "Jun", failures: 1 },
  { month: "Jul", failures: 2 },
];

const Assets = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [showAssetDetails, setShowAssetDetails] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  
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
  
  const criticalCount = mockAssets.filter(a => a.status === "Critical").length;
  const warningCount = mockAssets.filter(a => a.status === "Warning").length;
  const operationalCount = mockAssets.filter(a => a.status === "Operational").length;
  
  const getHealthColor = (health: number) => {
    if (health >= 85) return "text-emerald-500";
    if (health >= 60) return "text-amber-500";
    return "text-destructive";
  };
  
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
          <Button variant="outline" size="sm" onClick={() => setShowMetrics(true)}>
            <BookOpen className="mr-2 h-4 w-4" />
            Metrics
          </Button>
          <Button variant="outline" size="sm">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowBulkImport(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Bulk Import
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Asset
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Assets Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold">{mockAssets.length}</span>
              <span className="text-sm text-muted-foreground">Registered Devices</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">MTBF</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold">4344</span>
              <span className="text-sm text-muted-foreground">Hours</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">MTTR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold">24</span>
              <span className="text-sm text-muted-foreground">Hours</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold">99.45%</span>
              <span className="text-sm text-muted-foreground">Uptime</span>
            </div>
          </CardContent>
        </Card>
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
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => {
                              setSelectedAsset(asset);
                              setShowAssetDetails(true);
                            }}
                          >
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => {
                              setSelectedAsset(asset);
                              setShowQRCode(true);
                            }}
                          >
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
      
      <Dialog open={showAssetDetails} onOpenChange={setShowAssetDetails}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Asset Details</DialogTitle>
            <DialogDescription>
              View and manage complete asset information
            </DialogDescription>
          </DialogHeader>
          
          {selectedAsset && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ID:</span>
                      <span className="font-medium">{selectedAsset.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{selectedAsset.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span>{selectedAsset.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span>{getStatusBadge(selectedAsset.status)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Health:</span>
                      <span className={getHealthColor(selectedAsset.health)}>{selectedAsset.health}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span>{selectedAsset.location}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Maintenance Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Maintenance:</span>
                      <span>{selectedAsset.lastMaintenance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Next Maintenance:</span>
                      <span>{selectedAsset.nextMaintenance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">MTBF:</span>
                      <span>{selectedAsset.mtbf}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">MTTR:</span>
                      <span>{selectedAsset.mttr}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">IoT Sensors</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAsset.sensors && selectedAsset.sensors.map((sensor: string) => (
                      <Badge key={sensor} variant="outline" className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {sensor}
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm" className="mt-2">
                      <Plus className="h-3 w-3 mr-1" />
                      Add Sensor
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Technical Specifications</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Manufacturer:</span>
                      <span>{selectedAsset.manufacturer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Model:</span>
                      <span>{selectedAsset.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Serial Number:</span>
                      <span>{selectedAsset.serialNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Install Date:</span>
                      <span>{selectedAsset.installDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Warranty Expiry:</span>
                      <span>{selectedAsset.warrantyExpiry}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Documentation</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <FileDown className="mr-2 h-4 w-4" />
                      User Manual
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileDown className="mr-2 h-4 w-4" />
                      Maintenance Log
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileDown className="mr-2 h-4 w-4" />
                      Warranty Certificate
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline">Generate Report</Button>
            <Button>Edit Asset</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Asset QR Code</DialogTitle>
            <DialogDescription>
              Scan for quick access to asset information
            </DialogDescription>
          </DialogHeader>
          
          {selectedAsset && (
            <div className="flex flex-col items-center justify-center">
              <div className="border border-dashed border-gray-300 p-6 rounded-lg">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://aramco-cmms.com/assets/${selectedAsset.id}`}
                  alt="Asset QR Code"
                  className="w-48 h-48"
                />
              </div>
              <p className="text-center mt-4 text-sm text-muted-foreground">
                {selectedAsset.id}: {selectedAsset.name}
              </p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <FileDown className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Clipboard className="mr-2 h-4 w-4" />
                  Print
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Dialog open={showBulkImport} onOpenChange={setShowBulkImport}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Bulk Import Assets</DialogTitle>
            <DialogDescription>
              Upload a file to import multiple assets
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Drag and drop your file here, or click to browse
              </p>
              <Button variant="outline" className="mt-4">
                Select File
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Accepted formats: .xlsx, .csv</p>
              <p>Maximum file size: 10MB</p>
              <Button variant="outline" size="sm" className="w-full">
                <FileDown className="mr-2 h-4 w-4" />
                Download Template
              </Button>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkImport(false)}>Cancel</Button>
            <Button>Import Assets</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showMetrics} onOpenChange={setShowMetrics}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Asset Metrics & Analytics</DialogTitle>
            <DialogDescription>
              View detailed performance metrics and reliability data
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Breakdown Count</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold">1</span>
                    <span className="text-sm text-muted-foreground">Last 30 days</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">MTBF (Hours)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold">4344</span>
                    <span className="text-sm text-muted-foreground">Mean Time Between Failures</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold">99.45%</span>
                    <span className="text-sm text-muted-foreground">System Uptime</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Up Time & Down Time (Hours)</CardTitle>
                <CardDescription>Last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <BarChart 
                    data={timeSeriesData}
                    index="month"
                    categories={["uptime", "downtime"]}
                    colors={["#10b981", "#f43f5e"]}
                    valueFormatter={(value) => `${value} hrs`}
                    showLegend={true}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Equipment Failures by Month</CardTitle>
                <CardDescription>Last 7 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <BarChart 
                    data={failureData}
                    index="month"
                    categories={["failures"]}
                    colors={["#3b82f6"]}
                    valueFormatter={(value) => `${value} failures`}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Detailed Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead>2023</TableHead>
                      <TableHead>2024 YTD</TableHead>
                      <TableHead>Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">MTTR (hrs)</TableCell>
                      <TableCell>4.2</TableCell>
                      <TableCell>1.8</TableCell>
                      <TableCell className="text-emerald-500">-57.1%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">MTBF (hrs)</TableCell>
                      <TableCell>3120</TableCell>
                      <TableCell>4344</TableCell>
                      <TableCell className="text-emerald-500">+39.2%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Availability</TableCell>
                      <TableCell>98.7%</TableCell>
                      <TableCell>99.5%</TableCell>
                      <TableCell className="text-emerald-500">+0.8%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Total Failures</TableCell>
                      <TableCell>27</TableCell>
                      <TableCell>6</TableCell>
                      <TableCell className="text-emerald-500">-77.8%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Critical Failures</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell className="text-emerald-500">-87.5%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          
          <DialogFooter>
            <Button variant="outline">Generate Report</Button>
            <Button onClick={() => setShowMetrics(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Assets;
