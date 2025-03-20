
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

export type AlertType = {
  id: string;
  timestamp: string;
  source: string;
  severity: "High" | "Medium" | "Low";
  message: string;
  status: "Active" | "Resolved";
};

type ActiveAlertsProps = {
  alerts: AlertType[];
  handleAcknowledge: (alertId: string) => void;
};

const ActiveAlertsCard = ({ alerts, handleAcknowledge }: ActiveAlertsProps) => {
  const activeAlerts = alerts.filter(alert => alert.status === "Active");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Alerts</CardTitle>
        <CardDescription>Real-time subsystem alerts requiring attention</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Alert ID</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeAlerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell className="font-medium">{alert.id}</TableCell>
                <TableCell>{alert.source}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    alert.severity === "High" ? "bg-red-100 text-red-800" :
                    alert.severity === "Medium" ? "bg-yellow-100 text-yellow-800" :
                    "bg-blue-100 text-blue-800"
                  }`}>
                    {alert.severity}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                    {alert.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAcknowledge(alert.id)}
                  >
                    Acknowledge
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ActiveAlertsCard;
