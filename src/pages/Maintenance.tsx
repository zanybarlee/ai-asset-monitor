
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart } from "@/components/ui/charts";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, FileText, FileDown, Activity } from "lucide-react";

const Maintenance = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Maintenance History</h2>
          <p className="text-muted-foreground">
            View maintenance records and predictive analytics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="history">Maintenance History</TabsTrigger>
          <TabsTrigger value="predictive">Predictive Analytics</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="mt-4 space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Maintenance Activity</CardTitle>
              <CardDescription>Historical maintenance records over time</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart 
                data={[
                  { month: 'Jan', preventative: 12, corrective: 4, emergency: 1 },
                  { month: 'Feb', preventative: 15, corrective: 3, emergency: 0 },
                  { month: 'Mar', preventative: 14, corrective: 5, emergency: 2 },
                  { month: 'Apr', preventative: 18, corrective: 2, emergency: 0 },
                  { month: 'May', preventative: 16, corrective: 7, emergency: 1 },
                  { month: 'Jun', preventative: 19, corrective: 4, emergency: 0 },
                  { month: 'Jul', preventative: 21, corrective: 3, emergency: 1 },
                ]}
                categories={["preventative", "corrective", "emergency"]}
                index="month"
                colors={["#06b6d4", "#f59e0b", "#ef4444"]}
                valueFormatter={(value) => `${value} tasks`}
                className="h-[400px]"
              />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Maintenance by System Type</CardTitle>
                <CardDescription>Distribution of maintenance activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-8 text-muted-foreground">
                  System would display pie chart of maintenance distribution by system type
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardHeader>
                <CardTitle>Recent Maintenance Activities</CardTitle>
                <CardDescription>Last 5 completed maintenance tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium">Cooling System Inspection</p>
                      <p className="text-sm text-muted-foreground">Server Room A</p>
                    </div>
                    <p className="text-sm">July 12, 2023</p>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium">UPS Battery Replacement</p>
                      <p className="text-sm text-muted-foreground">Power Room</p>
                    </div>
                    <p className="text-sm">July 5, 2023</p>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium">Fire Suppression Test</p>
                      <p className="text-sm text-muted-foreground">Server Room B</p>
                    </div>
                    <p className="text-sm">June 28, 2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="predictive" className="mt-4 space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Failure Probability Forecast</CardTitle>
              <CardDescription>AI-driven predictive maintenance forecast</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart 
                data={[
                  { date: 'Aug', hvac: 0.05, electrical: 0.12, fire: 0.03 },
                  { date: 'Sep', hvac: 0.07, electrical: 0.15, fire: 0.04 },
                  { date: 'Oct', hvac: 0.09, electrical: 0.22, fire: 0.04 },
                  { date: 'Nov', hvac: 0.12, electrical: 0.38, fire: 0.05 },
                  { date: 'Dec', hvac: 0.15, electrical: 0.45, fire: 0.06 },
                  { date: 'Jan', hvac: 0.18, electrical: 0.35, fire: 0.07 },
                ]}
                categories={["hvac", "electrical", "fire"]}
                index="date"
                colors={["#06b6d4", "#f59e0b", "#ef4444"]}
                valueFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                className="h-[400px]"
              />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glass">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>Critical Alerts</CardTitle>
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <CardDescription>Upcoming critical maintenance needs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-3 border border-destructive/30 bg-destructive/10 rounded-md text-sm space-y-1">
                  <p className="font-medium">UPS System Rack 3</p>
                  <p className="text-muted-foreground">85% probability of failure within 30 days</p>
                  <p className="font-medium text-destructive mt-2">Recommended Action:</p>
                  <p className="text-muted-foreground">Schedule immediate inspection and battery replacement</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>Efficiency Insights</CardTitle>
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                </div>
                <CardDescription>Optimization opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-3 border border-emerald-500/30 bg-emerald-500/10 rounded-md text-sm space-y-1">
                  <p className="font-medium">HVAC System Optimization</p>
                  <p className="text-muted-foreground">Potential 12% energy savings through recalibration</p>
                  <p className="font-medium text-emerald-500 mt-2">Recommended Action:</p>
                  <p className="text-muted-foreground">Schedule HVAC recalibration during low-usage hours</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>Maintenance Forecast</CardTitle>
                  <Activity className="h-5 w-5 text-blue-500" />
                </div>
                <CardDescription>Upcoming maintenance needs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-3 border rounded-md text-sm">
                  <p className="font-medium">Next 30 Days:</p>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>3 preventative maintenance tasks</li>
                    <li>1 critical inspection</li>
                    <li>2 routine replacements</li>
                  </ul>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="insights" className="mt-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle>AI-Generated Insights</CardTitle>
              <CardDescription>Machine learning based recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border p-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">System Performance Analysis</h3>
                  <p className="text-muted-foreground">
                    Based on historical data and current trends, the AI system has identified several key insights:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>The UPS System in Rack 3 is showing signs of battery degradation at an accelerated rate</li>
                    <li>HVAC systems are operating at 15% above optimal power consumption for current workloads</li>
                    <li>Current maintenance schedule for cooling systems can be optimized to reduce costs by ~8%</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Recommended Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-4">
                      <p className="font-medium">High Priority</p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        <li>Schedule UPS battery replacement within 2 weeks</li>
                        <li>Investigate power fluctuations in Server Room A</li>
                      </ul>
                    </div>
                    <div className="border rounded-md p-4">
                      <p className="font-medium">Medium Priority</p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        <li>Recalibrate HVAC temperature settings</li>
                        <li>Review fire suppression system test procedures</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold">Maintenance Schedule Optimization</h3>
                  <p className="text-muted-foreground mb-4">
                    The AI system has generated an optimized maintenance schedule based on equipment usage patterns, failure probabilities, and operational impact:
                  </p>
                  <Button>View Optimized Schedule</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Maintenance;
