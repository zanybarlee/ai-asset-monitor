
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface VisitorAccessMapProps {
  selectedVisitor: string | null;
  visitorName: string | null;
}

const VisitorAccessMap = ({ selectedVisitor, visitorName }: VisitorAccessMapProps) => {
  return (
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
                `Showing current location for ${visitorName}` : 
                "Select a visitor to view their location on the facility map"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitorAccessMap;
