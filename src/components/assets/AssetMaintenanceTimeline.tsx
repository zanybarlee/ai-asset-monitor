
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart } from "@/components/ui/charts";
import { Button } from "@/components/ui/button";
import { Wrench, Calendar, Clock, FileText, Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const AssetMaintenanceTimeline = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("12m");
  
  // Data for maintenance count by type
  const maintenanceCountData = [
    { month: "Jan", preventive: 12, corrective: 3, condition: 2 },
    { month: "Feb", preventive: 10, corrective: 5, condition: 1 },
    { month: "Mar", preventive: 13, corrective: 2, condition: 3 },
    { month: "Apr", preventive: 11, corrective: 4, condition: 2 },
    { month: "May", preventive: 14, corrective: 3, condition: 1 },
    { month: "Jun", preventive: 12, corrective: 2, condition: 3 },
    { month: "Jul", preventive: 11, corrective: 6, condition: 2 },
    { month: "Aug", preventive: 13, corrective: 3, condition: 2 },
    { month: "Sep", preventive: 12, corrective: 2, condition: 1 },
    { month: "Oct", preventive: 14, corrective: 3, condition: 3 },
    { month: "Nov", preventive: 12, corrective: 4, condition: 2 },
    { month: "Dec", preventive: 11, corrective: 3, condition: 2 }
  ];
  
  // Data for MTBF and MTTR trends
  const reliabilityTrendsData = [
    { month: "Jan", mtbf: 720, mttr: 5.2 },
    { month: "Feb", mtbf: 680, mttr: 6.1 },
    { month: "Mar", mtbf: 740, mttr: 4.8 },
    { month: "Apr", mtbf: 710, mttr: 5.5 },
    { month: "May", mtbf: 760, mttr: 4.2 },
    { month: "Jun", mtbf: 790, mttr: 3.8 },
    { month: "Jul", mtbf: 720, mttr: 5.6 },
    { month: "Aug", mtbf: 750, mttr: 4.5 },
    { month: "Sep", mtbf: 780, mttr: 4.0 },
    { month: "Oct", mtbf: 810, mttr: 3.5 },
    { month: "Nov", mtbf: 790, mttr: 3.9 },
    { month: "Dec", mtbf: 830, mttr: 3.2 }
  ];
  
  // Data for asset uptime
  const uptimeData = [
    { month: "Jan", uptime: 98.2 },
    { month: "Feb", uptime: 97.5 },
    { month: "Mar", uptime: 99.1 },
    { month: "Apr", uptime: 98.4 },
    { month: "May", uptime: 99.3 },
    { month: "Jun", uptime: 99.5 },
    { month: "Jul", uptime: 98.1 },
    { month: "Aug", uptime: 98.8 },
    { month: "Sep", uptime: 99.2 },
    { month: "Oct", uptime: 99.6 },
    { month: "Nov", uptime: 99.4 },
    { month: "Dec", uptime: 99.7 }
  ];
  
  // Sample maintenance events for the timeline
  const timelineEvents = [
    {
      id: "ME-1242",
      date: "2024-03-15",
      type: "preventive",
      title: "Quarterly Preventive Maintenance",
      technician: "John Doe",
      duration: "3.5 hours",
      findings: "All systems operating normally. Replaced air filters."
    },
    {
      id: "ME-1198",
      date: "2024-02-03",
      type: "corrective",
      title: "Condenser Fan Replacement",
      technician: "Sarah Johnson",
      duration: "4.2 hours",
      findings: "Fan motor bearings failed. Replaced fan motor assembly."
    },
    {
      id: "ME-1156",
      date: "2023-12-18",
      type: "preventive",
      title: "Semi-Annual Inspection",
      technician: "John Doe",
      duration: "4.0 hours",
      findings: "Performed comprehensive inspection and testing. All parameters within specifications."
    },
    {
      id: "ME-1102",
      date: "2023-10-21",
      type: "condition",
      title: "High Temperature Alert Response",
      technician: "Mike Davis",
      duration: "2.5 hours",
      findings: "Detected refrigerant leak. Repaired and recharged system."
    },
    {
      id: "ME-1067",
      date: "2023-09-12",
      type: "preventive",
      title: "Quarterly Preventive Maintenance",
      technician: "John Doe",
      duration: "3.0 hours",
      findings: "All systems operating normally. Cleaned condenser coils."
    },
    {
      id: "ME-1021",
      date: "2023-07-18",
      type: "corrective",
      title: "Pressure Switch Replacement",
      technician: "Sarah Johnson",
      duration: "1.5 hours",
      findings: "Low pressure switch faulty. Replaced with new component."
    }
  ];
  
  // Handler for time range selection
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
  };
  
  // Render type badge
  const renderTypeBadge = (type: string) => {
    switch (type) {
      case "preventive":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Preventive</Badge>;
      case "corrective":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800">Corrective</Badge>;
      case "condition":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800">Condition-Based</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };
  
  return (
    <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Asset Maintenance Timeline</DialogTitle>
        <DialogDescription>
          Historical maintenance performance and reliability metrics
        </DialogDescription>
      </DialogHeader>
      
      <div className="flex items-center justify-between my-2">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Maintenance Timeline</TabsTrigger>
            <TabsTrigger value="reliability">Reliability Metrics</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Select value={timeRange} onValueChange={handleTimeRangeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="12m">Last 12 Months</SelectItem>
            <SelectItem value="24m">Last 24 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md flex items-center gap-2">
                <Wrench className="h-5 w-5 text-blue-600" />
                Maintenance Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Maintenance Events:</span>
                  <span className="font-medium">145</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Preventive Maintenance:</span>
                  <span className="font-medium">76%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Corrective Maintenance:</span>
                  <span className="font-medium">16%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Condition-Based:</span>
                  <span className="font-medium">8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Avg. Monthly Events:</span>
                  <span className="font-medium">12.1</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-600" />
                Reliability Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Average MTBF:</span>
                  <span className="font-medium">756 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Average MTTR:</span>
                  <span className="font-medium">4.6 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Average Uptime:</span>
                  <span className="font-medium text-emerald-600">99.4%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Trend:</span>
                  <span className="font-medium text-emerald-600">Improving</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Reliability Rating:</span>
                  <span className="font-medium">A (Excellent)</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md flex items-center gap-2">
                <Calendar className="h-5 w-5 text-amber-600" />
                Upcoming Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="font-medium">Quarterly PM</div>
                  <div className="text-sm text-muted-foreground">Scheduled in 14 days</div>
                </div>
                <div>
                  <div className="font-medium">Filter Replacement</div>
                  <div className="text-sm text-muted-foreground">Scheduled in 26 days</div>
                </div>
                <div>
                  <div className="font-medium">Annual Inspection</div>
                  <div className="text-sm text-muted-foreground">Scheduled in 68 days</div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View Full Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Events by Type</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <BarChart 
              data={maintenanceCountData}
              index="month"
              categories={["preventive", "corrective", "condition"]}
              colors={["#3b82f6", "#f59e0b", "#8b5cf6"]}
              valueFormatter={(value) => `${value}`}
              showLegend={true}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Uptime</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <LineChart 
              data={uptimeData}
              index="month"
              categories={["uptime"]}
              colors={["#10b981"]}
              valueFormatter={(value) => `${value}%`}
              showLegend={false}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="timeline" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Event Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pb-4">
              <div className="absolute top-0 left-8 bottom-0 w-0.5 bg-border" />
              
              {timelineEvents.map((event, index) => (
                <div key={event.id} className="relative mb-8 last:mb-0">
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full border bg-background z-10 mr-4">
                      {renderTypeBadge(event.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm">{event.id}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{event.date} • {event.duration} • {event.technician}</div>
                      <div className="text-sm mt-1">{event.findings}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-6">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                View Full Maintenance History
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="reliability" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>MTBF and MTTR Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <LineChart 
              data={reliabilityTrendsData}
              index="month"
              categories={["mtbf", "mttr"]}
              colors={["#3b82f6", "#f43f5e"]}
              valueFormatter={(value) => `${value}`}
              showLegend={true}
            />
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">MTBF (Mean Time Between Failures)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">756</div>
                <div className="text-sm text-muted-foreground">hours</div>
              </div>
              <div className="text-xs text-emerald-600 mt-1">↑ 12.4% from previous period</div>
              <div className="text-xs text-muted-foreground mt-3">
                Average time between failures indicates reliability.
                Higher is better.
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">MTTR (Mean Time To Repair)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">4.6</div>
                <div className="text-sm text-muted-foreground">hours</div>
              </div>
              <div className="text-xs text-emerald-600 mt-1">↓ 8.3% from previous period</div>
              <div className="text-xs text-muted-foreground mt-3">
                Average time to repair after failure.
                Lower is better.
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Availability Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">99.4</div>
                <div className="text-sm text-muted-foreground">%</div>
              </div>
              <div className="text-xs text-emerald-600 mt-1">↑ 0.6% from previous period</div>
              <div className="text-xs text-muted-foreground mt-3">
                Percentage of time system is operational.
                Higher is better.
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-end">
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4 mr-1" />
            Export Reliability Report
          </Button>
        </div>
      </TabsContent>
    </DialogContent>
  );
};

export default AssetMaintenanceTimeline;
