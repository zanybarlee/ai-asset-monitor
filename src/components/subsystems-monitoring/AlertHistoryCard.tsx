
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertType } from "./ActiveAlertsCard";

type AlertHistoryProps = {
  alerts: AlertType[];
};

const AlertHistoryCard = ({ alerts }: AlertHistoryProps) => {
  const resolvedAlerts = alerts.filter(alert => alert.status === "Resolved");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alert History</CardTitle>
        <CardDescription>Recently resolved alerts</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Alert ID</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resolvedAlerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell className="font-medium">{alert.id}</TableCell>
                <TableCell>{alert.timestamp}</TableCell>
                <TableCell>{alert.source}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    {alert.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AlertHistoryCard;
