
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IdCard, Printer, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Visitor } from "../types";
import { useToast } from "@/hooks/use-toast";

interface VisitorBadgeProps {
  visitor: Visitor;
  photo?: string | null;
  onPrint: () => void;
}

const VisitorBadge = ({ visitor, photo, onPrint }: VisitorBadgeProps) => {
  const { toast } = useToast();
  const badgeRef = useRef<HTMLDivElement>(null);
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  const handlePrint = () => {
    if (!badgeRef.current) return;
    
    onPrint();
    toast({
      title: "Badge Printed",
      description: `Visitor badge for ${visitor.name} has been sent to printer.`,
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 p-4 border border-dashed border-gray-300 rounded-md">
        <div ref={badgeRef} className="w-[340px]">
          <Card className="overflow-hidden border-2 border-gray-200">
            <div className="bg-primary h-12 flex items-center justify-between px-4">
              <h3 className="text-primary-foreground font-bold">VISITOR BADGE</h3>
              <QrCode className="h-6 w-6 text-primary-foreground" />
            </div>
            
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-2 border-gray-200">
                  {photo ? (
                    <AvatarImage src={photo} alt={visitor.name} />
                  ) : (
                    <AvatarFallback className="text-3xl">
                      {visitor.name.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                
                <div className="space-y-1">
                  <h3 className="font-bold text-xl leading-none">{visitor.name}</h3>
                  <p className="text-muted-foreground text-sm">{visitor.company}</p>
                  <div className="flex items-center gap-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full w-fit">
                    <span>Access Level: {visitor.accessLevel || "Standard"}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 space-y-1 text-sm">
                <div className="flex justify-between border-b pb-1">
                  <span className="font-medium">Host:</span>
                  <span>{visitor.host}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="font-medium">Purpose:</span>
                  <span>{visitor.purpose}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="font-medium">Date:</span>
                  <span>{formatDate(visitor.scheduledTime || visitor.checkIn)}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="font-medium">Check In:</span>
                  <span>{visitor.checkIn ? new Date(visitor.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Pending"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Escort Required:</span>
                  <span>{visitor.requiresEscort ? "Yes" : "No"}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-2 border-t text-xs text-center text-muted-foreground">
                <p>This badge must be worn visibly at all times.</p>
                <p>Return to reception upon departure.</p>
                <p className="font-semibold">BADGE ID: {visitor.id}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Button onClick={handlePrint} className="w-full">
        <Printer className="mr-2 h-4 w-4" />
        Print Badge
      </Button>
    </div>
  );
};

export default VisitorBadge;
