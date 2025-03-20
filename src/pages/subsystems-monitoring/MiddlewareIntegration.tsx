
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle2, 
  XCircle, 
  Settings, 
  ArrowUpDown, 
  RefreshCw, 
  CreditCard, 
  TicketCheck,
  AlertTriangle,
  Database
} from "lucide-react";

const MiddlewareIntegration = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Sample middleware connection data
  const connections = [
    { 
      id: 1, 
      name: "SAP Ticketing System", 
      status: "Connected", 
      lastSync: "2023-09-02 15:30:12",
      transactions: 1247,
      icon: TicketCheck
    },
    { 
      id: 2, 
      name: "Payment Processing Gateway", 
      status: "Connected", 
      lastSync: "2023-09-02 15:28:45",
      transactions: 892,
      icon: CreditCard
    },
    { 
      id: 3, 
      name: "Maintenance Management System", 
      status: "Connected", 
      lastSync: "2023-09-02 15:15:22",
      transactions: 1823,
      icon: Settings
    },
    { 
      id: 4, 
      name: "Legacy Inventory System", 
      status: "Error", 
      lastSync: "2023-09-02 10:42:16",
      transactions: 0,
      icon: Database
    }
  ];

  // Sample recent transactions data
  const transactions = [
    { 
      id: "TRX-58742", 
      timestamp: "2023-09-02 15:30:12", 
      source: "UPS Alert ALT-1234", 
      destination: "SAP Ticketing", 
      status: "Success",
      details: "Maintenance ticket #SAP-89723 created for UPS 2 inspection" 
    },
    { 
      id: "TRX-58741", 
      timestamp: "2023-09-02 15:28:45", 
      source: "Work Order #WO-2318", 
      destination: "Payment Processing", 
      status: "Success",
      details: "Invoice #INV-72345 processed for parts replacement" 
    },
    { 
      id: "TRX-58740", 
      timestamp: "2023-09-02 15:15:22", 
      source: "Preventive Maintenance", 
      destination: "Maintenance System", 
      status: "Success",
      details: "Scheduled maintenance WO-2319 for CRAC units 1-4" 
    },
    { 
      id: "TRX-58739", 
      timestamp: "2023-09-02 14:52:18", 
      source: "Parts Request #PR-673", 
      destination: "Legacy Inventory", 
      status: "Failed",
      details: "Connection timeout - unable to verify inventory" 
    },
  ];

  // Sample integration settings data
  const integrationSettings = [
    { name: "Auto-create tickets for critical alerts", enabled: true },
    { name: "Sync maintenance schedule hourly", enabled: true },
    { name: "Process payments automatically", enabled: true },
    { name: "Update inventory on part usage", enabled: false },
    { name: "Auto-assign work orders", enabled: true },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Connections Refreshed",
        description: "All middleware connections have been refreshed.",
      });
    }, 1500);
  };

  const handleTestConnection = (connectionId: number) => {
    toast({
      title: "Testing Connection",
      description: `Testing connection to ${connections.find(c => c.id === connectionId)?.name}...`,
    });
    
    // Simulate connection test
    setTimeout(() => {
      toast({
        title: "Connection Test Complete",
        description: connectionId !== 4 
          ? "Connection test successful! All systems operational." 
          : "Connection test failed. Check credentials and network.",
        variant: connectionId !== 4 ? "default" : "destructive",
      });
    }, 1500);
  };

  const handleToggleSetting = (setting: string) => {
    toast({
      title: "Setting Updated",
      description: `${setting} has been updated.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Middleware Connectors Status</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "Refreshing..." : "Refresh Connections"}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {connections.map((connection) => (
          <Card key={connection.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{connection.name}</CardTitle>
              <connection.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-2">
                {connection.status === "Connected" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span 
                  className={`text-sm font-medium ${
                    connection.status === "Connected" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {connection.status}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">Last synchronized: {connection.lastSync}</div>
              <div className="text-xs text-muted-foreground">Transactions today: {connection.transactions}</div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleTestConnection(connection.id)}
              >
                Test Connection
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Middleware data exchange activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Source/Destination</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell className="text-xs">
                      <div className="font-medium">{transaction.source}</div>
                      <div className="text-muted-foreground flex items-center">
                        <ArrowUpDown className="h-3 w-3 mr-1" />
                        {transaction.destination}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === "Success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {transaction.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs">{transaction.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">View All Transactions</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integration Settings</CardTitle>
            <CardDescription>Configure middleware automation rules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-endpoint">SAP Ticketing API Endpoint</Label>
                <Input id="api-endpoint" value="https://sap-api.example.com/ticketing/v2" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key (Last 4: XXXX)</Label>
                <div className="flex">
                  <Input id="api-key" type="password" value="••••••••••••" className="flex-1" />
                  <Button variant="outline" className="ml-2">Reveal</Button>
                </div>
              </div>
              
              <div className="pt-4 space-y-3">
                {integrationSettings.map((setting, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <Label htmlFor={`setting-${index}`} className="flex-1">{setting.name}</Label>
                    <Switch 
                      id={`setting-${index}`} 
                      checked={setting.enabled} 
                      onCheckedChange={() => handleToggleSetting(setting.name)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Reset to Defaults</Button>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="bg-amber-50 border-b border-amber-100">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <CardTitle>Connection Issue Detected</CardTitle>
              <CardDescription>Legacy Inventory System connection is failing</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <p className="text-sm">The connection to the Legacy Inventory System is currently failing with a timeout error. This may impact parts inventory checks and automated ordering.</p>
            
            <div className="rounded-md bg-muted p-3 text-sm">
              <div className="font-mono text-xs">ERROR: Connection timeout after 30000ms. Server at inventory.legacy.local:8080 is not responding.</div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Recommended Actions:</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Verify network connectivity to inventory.legacy.local server</li>
                <li>Check credentials and permissions</li>
                <li>Verify the inventory service is running on port 8080</li>
                <li>Contact IT support if the issue persists</li>
              </ul>
            </div>
            
            <div className="text-sm">
              <span className="font-medium">Impact:</span> Inventory checks will be performed manually until the connection is restored.
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/50">
          <div className="flex space-x-2 w-full">
            <Button variant="outline" className="flex-1" onClick={() => handleTestConnection(4)}>
              Test Connection
            </Button>
            <Button className="flex-1">
              Create IT Ticket
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MiddlewareIntegration;
