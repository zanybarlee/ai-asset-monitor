
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart } from "@/components/ui/charts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, TrendingUp, Activity, BarChart3, History, Database } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Risk score thresholds
const RISK_LOW = 0.3;
const RISK_MEDIUM = 0.6;

const PredictiveAnalytics = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("predictions");

  const getRiskColor = (riskScore: number) => {
    if (riskScore < RISK_LOW) return "text-emerald-500";
    if (riskScore < RISK_MEDIUM) return "text-amber-500";
    return "text-red-500";
  };

  const getRiskBgColor = (riskScore: number) => {
    if (riskScore < RISK_LOW) return "bg-emerald-500/10 border-emerald-500/30";
    if (riskScore < RISK_MEDIUM) return "bg-amber-500/10 border-amber-500/30";
    return "bg-red-500/10 border-red-500/30";
  };

  const handleUpdateSchedule = (assetId: string) => {
    toast({
      title: "Maintenance Schedule Updated",
      description: `The maintenance schedule for ${assetId} has been optimized based on risk analysis.`,
    });
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="predictions">Failure Predictions</TabsTrigger>
          <TabsTrigger value="root-cause">Root Cause Analysis</TabsTrigger>
          <TabsTrigger value="dynamic-scheduling">Dynamic Scheduling</TabsTrigger>
        </TabsList>

        {/* Failure Predictions Tab */}
        <TabsContent value="predictions" className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Failure Probability Forecast</CardTitle>
              <CardDescription>ML-driven predictive maintenance forecast</CardDescription>
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

        {/* Root Cause Analysis Tab */}
        <TabsContent value="root-cause" className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Failure Root Cause Analysis</CardTitle>
              <CardDescription>AI-powered analysis of historical failures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <BarChart
                  data={[
                    { cause: 'Power Surges', count: 14, impact: 78 },
                    { cause: 'Component Wear', count: 32, impact: 65 },
                    { cause: 'Overheating', count: 28, impact: 72 },
                    { cause: 'Configuration', count: 8, impact: 45 },
                    { cause: 'External Damage', count: 6, impact: 82 },
                  ]}
                  categories={["count", "impact"]}
                  index="cause"
                  colors={["#3b82f6", "#f43f5e"]}
                  valueFormatter={(value) => `${value}`}
                  className="h-[300px]"
                />
              </div>
              
              <div className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Primary Failure Patterns</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="bg-blue-500 rounded-full w-2 h-2 mt-2 mr-2 flex-shrink-0"></span>
                      <div>
                        <p className="font-medium">Battery Degradation (UPS Systems)</p>
                        <p className="text-sm text-muted-foreground">Accelerated by high ambient temperature and inconsistent charging cycles</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-amber-500 rounded-full w-2 h-2 mt-2 mr-2 flex-shrink-0"></span>
                      <div>
                        <p className="font-medium">CRAC Compressor Failures</p>
                        <p className="text-sm text-muted-foreground">Correlated with refrigerant pressure fluctuations and filter status</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-red-500 rounded-full w-2 h-2 mt-2 mr-2 flex-shrink-0"></span>
                      <div>
                        <p className="font-medium">Electrical System Issues</p>
                        <p className="text-sm text-muted-foreground">Power quality anomalies preceding 68% of electrical failures</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    <span>Download Full Analysis</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <History className="h-4 w-4" />
                    <span>View Historical Data</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dynamic Scheduling Tab */}
        <TabsContent value="dynamic-scheduling" className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Risk-Based Maintenance Scheduling</CardTitle>
              <CardDescription>Automated schedule optimization based on ML risk analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Asset</th>
                      <th className="text-left py-3 px-4 font-medium">Standard Interval</th>
                      <th className="text-left py-3 px-4 font-medium">Risk Score</th>
                      <th className="text-left py-3 px-4 font-medium">Optimized Schedule</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-3 px-4">UPS System Rack 3</td>
                      <td className="py-3 px-4">Quarterly</td>
                      <td className="py-3 px-4">
                        <span className="text-red-500 font-medium">0.85</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${getRiskBgColor(0.85)}`}>
                          Immediate
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button size="sm" onClick={() => handleUpdateSchedule('UPS-R3')}>
                          Update
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">CRAC Unit 2</td>
                      <td className="py-3 px-4">Monthly</td>
                      <td className="py-3 px-4">
                        <span className="text-amber-500 font-medium">0.42</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${getRiskBgColor(0.42)}`}>
                          2 Weeks
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button size="sm" onClick={() => handleUpdateSchedule('CRAC-02')}>
                          Update
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Fire Suppression System</td>
                      <td className="py-3 px-4">Semi-Annual</td>
                      <td className="py-3 px-4">
                        <span className="text-emerald-500 font-medium">0.12</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${getRiskBgColor(0.12)}`}>
                          As Scheduled
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button size="sm" variant="outline" onClick={() => handleUpdateSchedule('FIRE-01')}>
                          No Change
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">HVAC Primary</td>
                      <td className="py-3 px-4">Monthly</td>
                      <td className="py-3 px-4">
                        <span className="text-amber-500 font-medium">0.38</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${getRiskBgColor(0.38)}`}>
                          3 Weeks
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button size="sm" onClick={() => handleUpdateSchedule('HVAC-P1')}>
                          Update
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Electrical Panel A</td>
                      <td className="py-3 px-4">Quarterly</td>
                      <td className="py-3 px-4">
                        <span className="text-emerald-500 font-medium">0.21</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${getRiskBgColor(0.21)}`}>
                          Quarterly
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button size="sm" variant="outline" onClick={() => handleUpdateSchedule('EL-PANEL-A')}>
                          No Change
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-end">
                <Button variant="outline" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>View All Assets</span>
                </Button>
                <Button>Update All Schedules</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PredictiveAnalytics;
