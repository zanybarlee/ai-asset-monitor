
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Search, QrCode, Calendar, Clock, User, Plus, Filter, 
  Shield, MapPin, History, UserCheck, LogIn, LogOut
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const mockVisitors = [
  {
    id: "V-1001",
    name: "David Wilson",
    company: "Acme IT Services",
    purpose: "Server Maintenance",
    host: "John Doe",
    checkIn: "2023-08-12T09:30:00",
    checkOut: "2023-08-12T14:15:00",
    status: "Completed"
  },
  {
    id: "V-1002",
    name: "Lisa Chen",
    company: "Electrical Solutions Inc.",
    purpose: "Electrical Inspection",
    host: "Sarah Johnson",
    checkIn: "2023-08-12T10:00:00",
    checkOut: null,
    status: "Active"
  },
  {
    id: "V-1003",
    name: "Robert Brown",
    company: "Cooling Systems Ltd.",
    purpose: "HVAC Upgrade Consultation",
    host: "Michael Rodriguez",
    checkIn: "2023-08-12T11:15:00",
    checkOut: null,
    status: "Active"
  },
  {
    id: "V-1004",
    name: "Emma Scott",
    company: "Security Solutions",
    purpose: "Security System Audit",
    host: "Emily Chen",
    checkIn: null,
    checkOut: null,
    status: "Scheduled",
    scheduledTime: "2023-08-15T09:00:00"
  },
  {
    id: "V-1005",
    name: "Thomas Moore",
    company: "Network Infrastructure Co.",
    purpose: "Network Upgrade Discussion",
    host: "John Doe",
    checkIn: null,
    checkOut: null,
    status: "Scheduled",
    scheduledTime: "2023-08-14T13:30:00"
  }
];

// Movement path data for each visitor
const visitorMovements = {
  "V-1001": [
    { timestamp: "2023-08-12T09:30:00", zone: "Main Entrance", action: "Check In" },
    { timestamp: "2023-08-12T09:35:00", zone: "Security Checkpoint", action: "Access Granted" },
    { timestamp: "2023-08-12T09:42:00", zone: "Server Room B", action: "Access Granted" },
    { timestamp: "2023-08-12T11:15:00", zone: "Cafeteria", action: "Access Granted" },
    { timestamp: "2023-08-12T12:05:00", zone: "Server Room B", action: "Access Granted" },
    { timestamp: "2023-08-12T14:15:00", zone: "Main Entrance", action: "Check Out" },
  ],
  "V-1002": [
    { timestamp: "2023-08-12T10:00:00", zone: "Main Entrance", action: "Check In" },
    { timestamp: "2023-08-12T10:07:00", zone: "Security Checkpoint", action: "Access Granted" },
    { timestamp: "2023-08-12T10:15:00", zone: "Electrical Room", action: "Access Granted" },
    { timestamp: "2023-08-12T12:30:00", zone: "Cafeteria", action: "Access Granted" },
    { timestamp: "2023-08-12T13:15:00", zone: "Electrical Room", action: "Access Granted" },
  ],
  "V-1003": [
    { timestamp: "2023-08-12T11:15:00", zone: "Main Entrance", action: "Check In" },
    { timestamp: "2023-08-12T11:22:00", zone: "Security Checkpoint", action: "Access Granted" },
    { timestamp: "2023-08-12T11:30:00", zone: "HVAC Control Room", action: "Access Granted" },
  ]
};

const Visitors = () => {
  const { toast } = useToast();
  const [selectedVisitor, setSelectedVisitor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [qrScanActive, setQrScanActive] = useState(false);

  const formatDateTime = (timestamp: string | null) => {
    if (!timestamp) return "—";
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-emerald-500">{status}</Badge>;
      case "Completed":
        return <Badge className="bg-blue-500">{status}</Badge>;
      case "Scheduled":
        return <Badge variant="outline">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleQrScan = () => {
    setQrScanActive(true);
    
    // Simulate a successful QR scan after 2 seconds
    setTimeout(() => {
      setQrScanActive(false);
      toast({
        title: "QR Code Scanned Successfully",
        description: "Visitor Lisa Chen (V-1002) verified.",
      });
    }, 2000);
  };

  const handleQuickCheckIn = () => {
    toast({
      title: "Visitor Check-In Complete",
      description: "Temporary access badge issued to Robert Brown.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Visitor Management System</h2>
          <p className="text-muted-foreground">
            Physical Security & Access Control Module
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Register Visitor
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 space-y-4">
          <Card className="glass">
            <CardHeader className="pb-2">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search visitors..." className="pl-8" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <div className="grid grid-cols-6 bg-muted/50 p-3 text-sm font-medium">
                  <div className="col-span-2">Visitor</div>
                  <div>Host</div>
                  <div>Check In</div>
                  <div>Check Out</div>
                  <div>Status</div>
                </div>
                
                <div className="divide-y">
                  {mockVisitors.map((visitor) => (
                    <div 
                      key={visitor.id} 
                      className={`grid grid-cols-6 p-3 text-sm items-center cursor-pointer hover:bg-muted/30 ${selectedVisitor === visitor.id ? 'bg-muted/30' : ''}`}
                      onClick={() => setSelectedVisitor(visitor.id)}
                    >
                      <div className="col-span-2">
                        <p className="font-medium">{visitor.name}</p>
                        <p className="text-muted-foreground">{visitor.company}</p>
                        <p className="text-xs text-muted-foreground">{visitor.purpose}</p>
                      </div>
                      <div>{visitor.host}</div>
                      <div>{visitor.checkIn ? formatDateTime(visitor.checkIn) : visitor.status === "Scheduled" ? formatDateTime(visitor.scheduledTime) : "—"}</div>
                      <div>{formatDateTime(visitor.checkOut)}</div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(visitor.status)}
                        {visitor.status === "Active" && (
                          <Button variant="outline" size="icon" className="h-6 w-6">
                            <QrCode className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {selectedVisitor && visitorMovements[selectedVisitor as keyof typeof visitorMovements] && (
            <Card className="glass">
              <CardHeader>
                <CardTitle>Movement Path Timeline</CardTitle>
                <CardDescription>
                  Detailed movement tracking for visitor {
                    mockVisitors.find(v => v.id === selectedVisitor)?.name
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6 border-l">
                  {visitorMovements[selectedVisitor as keyof typeof visitorMovements].map((movement, index) => (
                    <div key={index} className="mb-4 relative">
                      <div className="absolute -left-[23px] w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        {movement.action.includes("Check In") ? (
                          <LogIn className="h-3 w-3 text-white" />
                        ) : movement.action.includes("Check Out") ? (
                          <LogOut className="h-3 w-3 text-white" />
                        ) : (
                          <MapPin className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <div className="bg-card border rounded-md p-3">
                        <div className="flex justify-between">
                          <div className="font-medium">{movement.zone}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(movement.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                        <div className="text-sm mt-1">
                          <Badge variant="secondary">{movement.action}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card className="glass">
            <CardHeader>
              <CardTitle>Visitor Access Map</CardTitle>
              <CardDescription>Real-time location and access zones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative border rounded-md p-6 flex items-center justify-center h-64 bg-muted/30">
                <img 
                  src="/lovable-uploads/4a63fe47-4d32-401d-ae4d-1d791ce296d6.png" 
                  alt="Physical Security & Access Control Map" 
                  className="absolute inset-0 w-full h-full object-contain opacity-50"
                />
                {selectedVisitor && (
                  <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="h-4 w-4 rounded-full bg-red-500 animate-ping"></div>
                    <div className="h-4 w-4 rounded-full bg-red-500 absolute top-0"></div>
                  </div>
                )}
                <div className="z-10 bg-background/80 p-4 rounded-md">
                  <p className="text-muted-foreground">
                    {selectedVisitor ? 
                      `Showing current location for ${mockVisitors.find(v => v.id === selectedVisitor)?.name}` : 
                      "Select a visitor to view their location on the facility map"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card className="glass">
            <CardHeader className="pb-2">
              <CardTitle>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Quick Actions
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleQrScan}
                disabled={qrScanActive}
              >
                {qrScanActive ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                    Scanning...
                  </>
                ) : (
                  <>
                    <QrCode className="mr-2 h-4 w-4" />
                    Scan QR Code
                  </>
                )}
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleQuickCheckIn}>
                <UserCheck className="mr-2 h-4 w-4" />
                Quick Check-In
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Visit
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <History className="mr-2 h-4 w-4" />
                Access Logs
              </Button>
            </CardContent>
          </Card>
          
          <Card className="glass">
            <CardHeader className="pb-2">
              <CardTitle>Visitor Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="border rounded-md p-3 flex flex-col items-center">
                  <span className="text-3xl font-bold text-emerald-500">2</span>
                  <span className="text-sm text-muted-foreground">Active</span>
                </div>
                <div className="border rounded-md p-3 flex flex-col items-center">
                  <span className="text-3xl font-bold text-blue-500">1</span>
                  <span className="text-sm text-muted-foreground">Completed</span>
                </div>
                <div className="border rounded-md p-3 flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary">2</span>
                  <span className="text-sm text-muted-foreground">Scheduled</span>
                </div>
                <div className="border rounded-md p-3 flex flex-col items-center">
                  <span className="text-3xl font-bold">5</span>
                  <span className="text-sm text-muted-foreground">Total</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Today's Schedule</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 border rounded-md">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="font-medium">David Wilson</p>
                      <p className="text-xs text-muted-foreground">09:30 - 14:15</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 border rounded-md">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="font-medium">Lisa Chen</p>
                      <p className="text-xs text-muted-foreground">10:00 - Present</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 border rounded-md">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="font-medium">Robert Brown</p>
                      <p className="text-xs text-muted-foreground">11:15 - Present</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Visitors;
