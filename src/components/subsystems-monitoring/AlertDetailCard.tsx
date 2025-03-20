
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

type AlertDetailProps = {
  handleAcknowledge: (alertId: string) => void;
};

const AlertDetailCard = ({ handleAcknowledge }: AlertDetailProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Alert Detail</CardTitle>
        <AlertTriangle className="h-4 w-4 text-red-500" />
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <AlertTitle>UPS 2 load exceeding 85% capacity</AlertTitle>
          <AlertDescription>
            <p className="mb-2">The UPS 2 in Data Hall A has been operating at above 85% capacity for more than 15 minutes. This may indicate increased load or potential issues with load balancing.</p>
            <p className="text-sm font-semibold">Recommendations:</p>
            <ul className="text-sm list-disc list-inside">
              <li>Check for recent changes in equipment deployment</li>
              <li>Verify UPS load balancing configuration</li>
              <li>Consider redistributing load if possible</li>
            </ul>
          </AlertDescription>
        </Alert>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Alert ID:</p>
            <p className="font-medium">ALT-1234</p>
          </div>
          <div>
            <p className="text-muted-foreground">First Detected:</p>
            <p className="font-medium">2023-09-02 14:32:15</p>
          </div>
          <div>
            <p className="text-muted-foreground">Source:</p>
            <p className="font-medium">UPS 2 / Data Hall A</p>
          </div>
          <div>
            <p className="text-muted-foreground">Current Value:</p>
            <p className="font-medium">87.2% load</p>
          </div>
          <div>
            <p className="text-muted-foreground">Threshold:</p>
            <p className="font-medium">85% for &gt;15 minutes</p>
          </div>
          <div>
            <p className="text-muted-foreground">Assigned To:</p>
            <p className="font-medium">Facilities Team</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex space-x-2 w-full">
          <Button className="flex-1" variant="default" onClick={() => handleAcknowledge("ALT-1234")}>Acknowledge</Button>
          <Button className="flex-1" variant="outline">Create Ticket</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AlertDetailCard;
