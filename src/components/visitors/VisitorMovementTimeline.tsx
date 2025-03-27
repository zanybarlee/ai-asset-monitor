
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogIn, LogOut, MapPin } from "lucide-react";

interface Movement {
  timestamp: string;
  zone: string;
  action: string;
}

interface VisitorMovementTimelineProps {
  selectedVisitor: string | null;
  visitorName: string | null;
  movements: Movement[];
}

const VisitorMovementTimeline = ({ 
  selectedVisitor, 
  visitorName,
  movements 
}: VisitorMovementTimelineProps) => {
  if (!selectedVisitor) return null;
  
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Movement Path Timeline</CardTitle>
        <CardDescription>
          Detailed movement tracking for visitor {visitorName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6 border-l">
          {movements.map((movement, index) => (
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
  );
};

export default VisitorMovementTimeline;
