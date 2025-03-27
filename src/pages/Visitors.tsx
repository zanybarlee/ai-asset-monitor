
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import RegisterVisitorDialog from "@/components/visitors/RegisterVisitorDialog";
import VisitorsList from "@/components/visitors/VisitorsList";
import VisitorMovementTimeline from "@/components/visitors/VisitorMovementTimeline";
import VisitorAccessMap from "@/components/visitors/VisitorAccessMap";
import QuickActionsCard from "@/components/visitors/QuickActionsCard";
import VisitorStatsCard from "@/components/visitors/VisitorStatsCard";
import { mockVisitors, visitorMovements, todaysSchedule } from "@/components/visitors/visitorData";
import { Visitor } from "@/components/visitors/types";

const Visitors = () => {
  const { toast } = useToast();
  const [selectedVisitor, setSelectedVisitor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [qrScanActive, setQrScanActive] = useState(false);
  const [visitors, setVisitors] = useState(mockVisitors);
  const [showRegisterVisitor, setShowRegisterVisitor] = useState(false);

  const handleQrScan = () => {
    setQrScanActive(true);
    
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

  const handleVisitorRegistered = (newVisitor: Visitor) => {
    setVisitors([...visitors, newVisitor]);
    setShowRegisterVisitor(false);
  };

  const handleCheckIn = (visitorId: string) => {
    const now = new Date().toISOString();
    
    setVisitors(visitors.map(visitor => {
      if (visitor.id === visitorId) {
        return {
          ...visitor,
          status: "Active",
          checkIn: now
        };
      }
      return visitor;
    }));
    
    toast({
      title: "Visitor Checked In",
      description: `${visitors.find(v => v.id === visitorId)?.name} has been checked in successfully.`,
    });
  };

  const handleCheckOut = (visitorId: string) => {
    const now = new Date().toISOString();
    
    setVisitors(visitors.map(visitor => {
      if (visitor.id === visitorId) {
        return {
          ...visitor,
          status: "Completed",
          checkOut: now
        };
      }
      return visitor;
    }));
    
    toast({
      title: "Visitor Checked Out",
      description: `${visitors.find(v => v.id === visitorId)?.name} has been checked out successfully.`,
    });
  };

  const selectedVisitorName = selectedVisitor 
    ? visitors.find(v => v.id === selectedVisitor)?.name || null
    : null;

  // Calculate stats for the VisitorStatsCard
  const activeCount = visitors.filter(v => v.status === "Active").length;
  const completedCount = visitors.filter(v => v.status === "Completed").length;
  const scheduledCount = visitors.filter(v => v.status === "Scheduled").length;
  const totalCount = visitors.length;

  const selectedMovements = selectedVisitor && visitorMovements[selectedVisitor] 
    ? visitorMovements[selectedVisitor] 
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Visitor Management System</h2>
          <p className="text-muted-foreground">
            Physical Security & Access Control Module
          </p>
        </div>
        <Button onClick={() => setShowRegisterVisitor(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Register Visitor
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 space-y-4">
          <VisitorsList 
            visitors={visitors}
            selectedVisitor={selectedVisitor}
            onSelectVisitor={setSelectedVisitor}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onQrScan={handleQrScan}
            qrScanActive={qrScanActive}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
          />
          
          {selectedVisitor && (
            <VisitorMovementTimeline 
              selectedVisitor={selectedVisitor}
              visitorName={selectedVisitorName}
              movements={selectedMovements}
            />
          )}
          
          <VisitorAccessMap 
            selectedVisitor={selectedVisitor}
            visitorName={selectedVisitorName}
          />
        </div>
        
        <div className="space-y-4">
          <QuickActionsCard 
            onQrScan={handleQrScan}
            onQuickCheckIn={handleQuickCheckIn}
            qrScanActive={qrScanActive}
          />
          
          <VisitorStatsCard 
            activeCount={activeCount}
            completedCount={completedCount}
            scheduledCount={scheduledCount}
            totalCount={totalCount}
            todaysSchedule={todaysSchedule}
          />
        </div>
      </div>

      <Dialog open={showRegisterVisitor} onOpenChange={setShowRegisterVisitor}>
        <RegisterVisitorDialog onVisitorRegistered={handleVisitorRegistered} />
      </Dialog>
    </div>
  );
};

export default Visitors;
