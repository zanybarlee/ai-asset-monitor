
import { useState } from "react";
import { Calendar, CheckCircle2, Clock, Filter, MoreHorizontal, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart } from "@/components/ui/charts";

interface MaintenanceRecord {
  id: string;
  type: "preventive" | "corrective" | "condition-based";
  title: string;
  date: string;
  status: "completed" | "scheduled" | "in-progress";
  technician: string;
  duration: string;
  cost: number;
  details: string;
}

interface AssetMaintenanceHistoryProps {
  assetId: string;
}

const AssetMaintenanceHistory = ({ assetId }: AssetMaintenanceHistoryProps) => {
  const [activeTab, setActiveTab] = useState("history");
  
  // Mock maintenance records
  const maintenanceRecords: MaintenanceRecord[] = [
    {
      id: "WO-2023-056",
      type: "preventive",
      title: "Quarterly Preventive Maintenance",
      date: "2023-06-15",
      status: "completed",
      technician: "John Doe",
      duration: "2h 15m",
      cost: 450,
      details: "Filter replacement, coil cleaning, and general inspection"
    },
    {
      id: "WO-2023-078",
      type: "corrective",
      title: "Condenser Pump Repair",
      date: "2023-08-02",
      status: "completed",
      technician: "Sarah Johnson",
      duration: "4h 30m",
      cost: 1250,
      details: "Replaced failed bearing in condenser pump"
    },
    {
      id: "WO-2023-112",
      type: "condition-based",
      title: "Temperature Sensor Replacement",
      date: "2023-09-18",
      status: "completed",
      technician: "Mike Davis",
      duration: "1h 10m",
      cost: 320,
      details: "Replaced faulty temperature sensor that was reporting inaccurate readings"
    },
    {
      id: "WO-2023-134",
      type: "preventive",
      title: "Semi-Annual Maintenance",
      date: "2023-12-05",
      status: "completed",
      technician: "John Doe",
      duration: "3h 45m",
      cost: 675,
      details: "Complete system inspection, filter replacement, and performance testing"
    },
    {
      id: "WO-2024-021",
      type: "condition-based",
      title: "Vibration Alert Response",
      date: "2024-02-10",
      status: "completed",
      technician: "Emily Chen",
      duration: "2h 30m",
      cost: 580,
      details: "Investigated high vibration alert, tightened mounting bolts and realigned fan assembly"
    },
    {
      id: "WO-2024-045",
      type: "preventive",
      title: "Quarterly Preventive Maintenance",
      date: "2024-03-22",
      status: "scheduled",
      technician: "John Doe",
      duration: "2h 00m",
      cost: 450,
      details: "Regular quarterly maintenance including filter replacement"
    }
  ];
  
  // Calculate PM/CM ratio for analytics
  const totalPM = maintenanceRecords.filter(r => r.type === "preventive").length;
  const totalCM = maintenanceRecords.filter(r => r.type === "corrective").length;
  const totalCBM = maintenanceRecords.filter(r => r.type === "condition-based").length;
  const totalMaintenance = maintenanceRecords.length;
  
  const pmCmRatio = totalMaintenance > 0 ? Math.round((totalPM / totalMaintenance) * 100) : 0;
  
  // Data for maintenance type chart
  const typeChartData = [
    { type: "Preventive", count: totalPM },
    { type: "Corrective", count: totalCM },
    { type: "Condition-Based", count: totalCBM }
  ];
  
  // Data for cost trend chart
  const costChartData = [
    { month: "Jan", cost: 0 },
    { month: "Feb", cost: 580 },
    { month: "Mar", cost: 450 },
    { month: "Apr", cost: 0 },
    { month: "May", cost: 0 },
    { month: "Jun", cost: 0 }
  ];
  
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-emerald-500">Completed</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      case "in-progress":
        return <Badge className="bg-amber-500">In Progress</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const renderTypeBadge = (type: string) => {
    switch (type) {
      case "preventive":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Preventive</Badge>;
      case "corrective":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800">Corrective</Badge>;
      case "condition-based":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800">Condition-Based</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <Tabs defaultValue="history" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="history">Maintenance History</TabsTrigger>
          <TabsTrigger value="analytics">Maintenance Analytics</TabsTrigger>
          <TabsTrigger value="schedule">Maintenance Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Maintenance Records</h3>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
          
          <div className="space-y-4">
            {maintenanceRecords.map((record) => (
              <Card key={record.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50 p-4 pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-md flex items-center gap-2">
                        {record.id}
                        <span className="text-sm font-normal">-</span>
                        <span className="font-normal">{record.title}</span>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {record.date}
                        <Clock className="h-3.5 w-3.5 ml-2" />
                        {record.duration}
                        <Wrench className="h-3.5 w-3.5 ml-2" />
                        {record.technician}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {renderTypeBadge(record.type)}
                      {renderStatusBadge(record.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-3">
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div className="text-sm text-muted-foreground mb-2 sm:mb-0">{record.details}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">${record.cost.toFixed(2)}</span>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Type Distribution</CardTitle>
                <CardDescription>Breakdown of maintenance activities by type</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <BarChart 
                  data={typeChartData}
                  index="type"
                  categories={["count"]}
                  colors={["#3b82f6"]}
                  valueFormatter={(value) => `${value} WOs`}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Cost Trend</CardTitle>
                <CardDescription>Monthly maintenance costs for 2024</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <BarChart 
                  data={costChartData}
                  index="month"
                  categories={["cost"]}
                  colors={["#10b981"]}
                  valueFormatter={(value) => `$${value}`}
                />
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Maintenance Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-blue-600">{pmCmRatio}%</span>
                    <span className="text-sm text-muted-foreground text-center">PM vs CM Ratio</span>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-emerald-600">$3,275</span>
                    <span className="text-sm text-muted-foreground text-center">Total Maintenance Cost</span>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-amber-600">2.8h</span>
                    <span className="text-sm text-muted-foreground text-center">Average Duration</span>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-purple-600">95%</span>
                    <span className="text-sm text-muted-foreground text-center">SLA Compliance</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="schedule" className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Upcoming Maintenance</h3>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Calendar View
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center p-3 border rounded-md">
                  <div className="flex-1">
                    <div className="font-medium">Quarterly Preventive Maintenance</div>
                    <div className="text-sm text-muted-foreground">Scheduled for March 22, 2024</div>
                  </div>
                  <Badge className="bg-blue-500">Scheduled</Badge>
                </div>
                
                <div className="flex items-center p-3 border rounded-md">
                  <div className="flex-1">
                    <div className="font-medium">Annual Comprehensive Inspection</div>
                    <div className="text-sm text-muted-foreground">Scheduled for June 15, 2024</div>
                  </div>
                  <Badge className="bg-blue-500">Scheduled</Badge>
                </div>
                
                <div className="flex justify-center mt-6">
                  <Button variant="outline" className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    Schedule New Maintenance
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssetMaintenanceHistory;
