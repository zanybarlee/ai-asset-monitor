
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, QrCode, LogIn, LogOut } from "lucide-react";

interface Visitor {
  id: string;
  name: string;
  company: string;
  purpose: string;
  host: string;
  checkIn: string | null;
  checkOut: string | null;
  status: string;
  scheduledTime?: string;
  accessLevel?: string;
  requiresEscort?: boolean;
  email?: string;
  phone?: string;
}

interface VisitorsListProps {
  visitors: Visitor[];
  selectedVisitor: string | null;
  onSelectVisitor: (id: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onQrScan: () => void;
  qrScanActive: boolean;
  onCheckIn?: (visitorId: string) => void;
  onCheckOut?: (visitorId: string) => void;
}

const VisitorsList = ({
  visitors,
  selectedVisitor,
  onSelectVisitor,
  activeTab,
  setActiveTab,
  onQrScan,
  qrScanActive,
  onCheckIn,
  onCheckOut
}: VisitorsListProps) => {
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
          <div className="grid grid-cols-7 bg-muted/50 p-3 text-sm font-medium">
            <div className="col-span-2">Visitor</div>
            <div>Host</div>
            <div>Check In</div>
            <div>Check Out</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          
          <div className="divide-y">
            {visitors.map((visitor) => (
              <div 
                key={visitor.id} 
                className={`grid grid-cols-7 p-3 text-sm items-center cursor-pointer hover:bg-muted/30 ${selectedVisitor === visitor.id ? 'bg-muted/30' : ''}`}
                onClick={() => onSelectVisitor(visitor.id)}
              >
                <div className="col-span-2">
                  <p className="font-medium">{visitor.name}</p>
                  <p className="text-muted-foreground">{visitor.company}</p>
                  <p className="text-xs text-muted-foreground">{visitor.purpose}</p>
                </div>
                <div>{visitor.host}</div>
                <div>{visitor.checkIn ? formatDateTime(visitor.checkIn) : visitor.status === "Scheduled" ? formatDateTime(visitor.scheduledTime) : "—"}</div>
                <div>{formatDateTime(visitor.checkOut)}</div>
                <div>{getStatusBadge(visitor.status)}</div>
                <div className="flex items-center gap-2">
                  {visitor.status === "Scheduled" && onCheckIn && (
                    <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={(e) => {
                      e.stopPropagation();
                      onCheckIn(visitor.id);
                    }}>
                      <LogIn className="h-3 w-3" />
                      Check In
                    </Button>
                  )}
                  {visitor.status === "Active" && onCheckOut && (
                    <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={(e) => {
                      e.stopPropagation();
                      onCheckOut(visitor.id);
                    }}>
                      <LogOut className="h-3 w-3" />
                      Check Out
                    </Button>
                  )}
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
  );
};

export default VisitorsList;
