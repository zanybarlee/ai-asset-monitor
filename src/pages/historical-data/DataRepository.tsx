
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart } from "@/components/ui/charts";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Database, Server, Search, TrendingUp, Zap } from "lucide-react";

// Sample data for charts
const upsPerformanceData = [
  { month: "Jan", load: 78, efficiency: 92, temperature: 28 },
  { month: "Feb", load: 82, efficiency: 91, temperature: 29 },
  { month: "Mar", load: 85, efficiency: 89, temperature: 30 },
  { month: "Apr", load: 79, efficiency: 90, temperature: 27 },
  { month: "May", load: 83, efficiency: 93, temperature: 26 },
  { month: "Jun", load: 86, efficiency: 94, temperature: 25 },
  { month: "Jul", load: 90, efficiency: 91, temperature: 30 },
  { month: "Aug", load: 88, efficiency: 89, temperature: 32 },
  { month: "Sep", load: 82, efficiency: 90, temperature: 29 },
  { month: "Oct", load: 76, efficiency: 92, temperature: 25 },
  { month: "Nov", load: 81, efficiency: 94, temperature: 24 },
  { month: "Dec", load: 84, efficiency: 93, temperature: 26 },
];

// Sample maintenance records
const maintenanceRecords = [
  { id: "M001", date: "2023-11-10", type: "Preventive", component: "UPS Battery", status: "Completed" },
  { id: "M002", date: "2023-11-15", type: "Corrective", component: "Power Distribution Unit", status: "Completed" },
  { id: "M003", date: "2023-11-22", type: "Scheduled", component: "Diesel Generator", status: "Pending" },
  { id: "M004", date: "2023-11-30", type: "Emergency", component: "Cooling System", status: "Completed" },
  { id: "M005", date: "2023-12-05", type: "Preventive", component: "Transfer Switch", status: "Scheduled" },
];

// Sample incident records
const incidents = [
  { id: "INC001", date: "2023-10-15", severity: "High", type: "Power Outage", duration: "45 mins", impact: "Critical Systems" },
  { id: "INC002", date: "2023-10-28", severity: "Medium", type: "Voltage Fluctuation", duration: "30 mins", impact: "Selected Racks" },
  { id: "INC003", date: "2023-11-03", severity: "Low", type: "Cooling Issue", duration: "15 mins", impact: "Zone B Servers" },
  { id: "INC004", date: "2023-11-17", severity: "Medium", type: "Generator Test Failure", duration: "N/A", impact: "None (Detected in Test)" },
  { id: "INC005", date: "2023-11-25", severity: "High", type: "UPS Failure", duration: "20 mins", impact: "Database Cluster" },
];

const DataRepository = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Secure Data Repository & Analytics</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">AI Analytics</span>
          <Switch id="ai-analytics" defaultChecked />
          <span className="text-sm text-muted-foreground">Prediction Confidence</span>
          <Slider defaultValue={[75]} max={100} step={1} className="w-40" />
        </div>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Zap size={16} />
            <span>UPS Performance</span>
          </TabsTrigger>
          <TabsTrigger value="incidents" className="flex items-center gap-2">
            <TrendingUp size={16} />
            <span>Incident Records</span>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center gap-2">
            <Server size={16} />
            <span>Maintenance Cycles</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>UPS Performance Trends</span>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Database size={14} />
                  <span>12 Months Data</span>
                </Badge>
              </CardTitle>
              <CardDescription>Performance metrics with AI-driven predictive insights</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80">
                <LineChart 
                  data={upsPerformanceData} 
                  index="month"
                  categories={["load", "efficiency", "temperature"]}
                  colors={["#10b981", "#3b82f6", "#ef4444"]}
                  showLegend={true}
                  showAnimation={true}
                  valueFormatter={(value: number) => `${value}${value === 'efficiency' ? "%" : ""}`}
                />
              </div>
              <div className="mt-4 p-3 bg-muted/50 rounded-md border">
                <div className="flex items-center gap-2 mb-2">
                  <Search size={16} className="text-primary" />
                  <h4 className="font-medium">AI Analysis Insights</h4>
                </div>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 p-1 rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
                    <span>UPS load pattern shows 15% increase during summer months (Jun-Aug)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-amber-100 text-amber-800 p-1 rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
                    <span>Efficiency decreases when temperature exceeds 30°C - consider cooling optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-800 p-1 rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
                    <span>Predicted maintenance need for UPS #3 within 45 days based on load pattern analysis</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="incidents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Incident Records</CardTitle>
              <CardDescription>Complete history of power-related incidents with root cause analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>AI Analysis</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incidents.map(incident => (
                    <TableRow key={incident.id}>
                      <TableCell className="font-medium">{incident.id}</TableCell>
                      <TableCell>{incident.date}</TableCell>
                      <TableCell>
                        <Badge variant={incident.severity === "High" ? "destructive" : incident.severity === "Medium" ? "default" : "outline"}>
                          {incident.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>{incident.type}</TableCell>
                      <TableCell>{incident.duration}</TableCell>
                      <TableCell>{incident.impact}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">View Analysis</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Cycles</CardTitle>
              <CardDescription>Scheduled and completed maintenance activities with performance impact</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Component</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenanceRecords.map(record => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        <Badge variant={
                          record.type === "Emergency" ? "destructive" : 
                          record.type === "Corrective" ? "default" : 
                          "outline"
                        }>
                          {record.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.component}</TableCell>
                      <TableCell>
                        <Badge variant={
                          record.status === "Completed" ? "default" : 
                          record.status === "Pending" ? "secondary" : 
                          "outline"
                        } 
                        className={record.status === "Completed" ? "bg-green-500 hover:bg-green-600" : 
                                   record.status === "Pending" ? "bg-yellow-500 hover:bg-yellow-600" : ""}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">View Details</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataRepository;
