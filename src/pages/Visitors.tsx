
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, QrCode, Calendar, Clock, User, Plus, Filter } from "lucide-react";

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

const Visitors = () => {
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Visitor Management</h2>
          <p className="text-muted-foreground">
            Register and track visitors to the data center
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
              <Tabs defaultValue="all" className="w-full">
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
                    <div key={visitor.id} className="grid grid-cols-6 p-3 text-sm items-center">
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
          
          <Card className="glass">
            <CardHeader>
              <CardTitle>Visitor Access Map</CardTitle>
              <CardDescription>Real-time location and access zones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-6 flex items-center justify-center h-64 bg-muted/30">
                <p className="text-muted-foreground">Interactive facility map with visitor locations would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card className="glass">
            <CardHeader className="pb-2">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <QrCode className="mr-2 h-4 w-4" />
                Scan QR Code
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Quick Check-In
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Visit
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
