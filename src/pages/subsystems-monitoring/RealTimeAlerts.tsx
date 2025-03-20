
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Bell, Shield, Zap, Thermometer, Settings, BellRing } from "lucide-react";

const RealTimeAlerts = () => {
  const { toast } = useToast();
  const [customThreshold, setCustomThreshold] = useState("82");
  
  // Sample alerts data
  const alerts = [
    { 
      id: "ALT-1234", 
      timestamp: "2023-09-02 14:32:15", 
      source: "Electrical", 
      severity: "High", 
      message: "UPS 2 load exceeding 85% capacity for >15 minutes", 
      status: "Active" 
    },
    { 
      id: "ALT-1233", 
      timestamp: "2023-09-02 13:18:44", 
      source: "HVAC", 
      severity: "Medium", 
      message: "CRAC 3 temperature deviation 2.5°C above setpoint", 
      status: "Active" 
    },
    { 
      id: "ALT-1232", 
      timestamp: "2023-09-02 11:05:22", 
      source: "Safety", 
      severity: "Low", 
      message: "Security camera 12 in generator room connectivity issues", 
      status: "Active" 
    },
    { 
      id: "ALT-1231", 
      timestamp: "2023-09-02 09:47:38", 
      source: "Electrical", 
      severity: "Medium", 
      message: "Generator 1 fuel level below 85%", 
      status: "Resolved" 
    },
    { 
      id: "ALT-1230", 
      timestamp: "2023-09-02 08:12:55", 
      source: "HVAC", 
      severity: "High", 
      message: "Primary chiller pump pressure drop detected", 
      status: "Resolved" 
    },
  ];

  // Alert notification settings
  const alertSettings = [
    { name: "Electrical Alerts", enabled: true, icon: Zap },
    { name: "HVAC Alerts", enabled: true, icon: Thermometer },
    { name: "Safety System Alerts", enabled: true, icon: Shield },
    { name: "Email Notifications", enabled: true, icon: BellRing },
    { name: "SMS Notifications", enabled: false, icon: Bell },
  ];

  const handleAcknowledge = (alertId: string) => {
    toast({
      title: "Alert Acknowledged",
      description: `Alert ${alertId} has been acknowledged and teams notified.`,
    });
  };

  const handleSaveThreshold = () => {
    toast({
      title: "Threshold Updated",
      description: `UPS load capacity threshold updated to ${customThreshold}%.`,
    });
  };

  const handleSettingChange = (setting: string) => {
    toast({
      title: "Setting Updated",
      description: `${setting} has been updated.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
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
                {alerts.filter(alert => alert.status === "Active").map((alert) => (
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
                {alerts.filter(alert => alert.status === "Resolved").map((alert) => (
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
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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
              <Button className="flex-1" variant="default">Acknowledge</Button>
              <Button className="flex-1" variant="outline">Create Ticket</Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Alert Configuration
            </CardTitle>
            <CardDescription>Customize alert thresholds and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ups-threshold">UPS Load Capacity Threshold (%)</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="ups-threshold" 
                    value={customThreshold} 
                    onChange={(e) => setCustomThreshold(e.target.value)} 
                  />
                  <Button onClick={handleSaveThreshold}>Save</Button>
                </div>
              </div>
              
              <div className="space-y-3 pt-3">
                {alertSettings.map((setting, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <setting.icon className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor={`setting-${index}`}>{setting.name}</Label>
                    </div>
                    <Switch 
                      id={`setting-${index}`} 
                      checked={setting.enabled} 
                      onCheckedChange={() => handleSettingChange(setting.name)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealTimeAlerts;
