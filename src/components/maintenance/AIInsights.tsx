
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart } from "@/components/ui/charts";
import { AlertTriangle, CheckCircle, TrendingUp, ArrowRight } from "lucide-react";
import { useState } from "react";

const AIInsights = () => {
  const [activeTab, setActiveTab] = useState("insights");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
        </TabsList>

        {/* AI Insights Tab */}
        <TabsContent value="insights">
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

        {/* Recommendations Tab */}
        <TabsContent value="recommendations">
          <Card className="glass">
            <CardHeader>
              <CardTitle>ML-Based Recommendations</CardTitle>
              <CardDescription>Data-driven maintenance recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 dark:bg-orange-950/20 dark:border-orange-800/50">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0 dark:text-orange-400" />
                  <div>
                    <h3 className="font-medium text-orange-800 dark:text-orange-300">Critical Component Alert</h3>
                    <p className="text-sm text-orange-700 dark:text-orange-400">UPS System Battery Pack shows early signs of failure</p>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      <div className="bg-white dark:bg-black rounded border border-orange-200 dark:border-orange-800/50 px-3 py-1 text-xs">
                        <span className="font-medium">Probability:</span> 84%
                      </div>
                      <div className="bg-white dark:bg-black rounded border border-orange-200 dark:border-orange-800/50 px-3 py-1 text-xs">
                        <span className="font-medium">Time to Failure:</span> 22-30 days
                      </div>
                      <div className="bg-white dark:bg-black rounded border border-orange-200 dark:border-orange-800/50 px-3 py-1 text-xs">
                        <span className="font-medium">Impact:</span> High
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        Schedule Replacement
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-950/20 dark:border-blue-800/50">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0 dark:text-blue-400" />
                  <div>
                    <h3 className="font-medium text-blue-800 dark:text-blue-300">Efficiency Opportunity</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-400">HVAC cooling cycles can be optimized for energy savings</p>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      <div className="bg-white dark:bg-black rounded border border-blue-200 dark:border-blue-800/50 px-3 py-1 text-xs">
                        <span className="font-medium">Potential Savings:</span> 12%
                      </div>
                      <div className="bg-white dark:bg-black rounded border border-blue-200 dark:border-blue-800/50 px-3 py-1 text-xs">
                        <span className="font-medium">Implementation:</span> Low effort
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/30">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 dark:bg-green-950/20 dark:border-green-800/50">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0 dark:text-green-400" />
                  <div>
                    <h3 className="font-medium text-green-800 dark:text-green-300">Preventative Maintenance Confirmed</h3>
                    <p className="text-sm text-green-700 dark:text-green-400">Fire suppression system maintenance interval is optimal</p>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      <div className="bg-white dark:bg-black rounded border border-green-200 dark:border-green-800/50 px-3 py-1 text-xs">
                        <span className="font-medium">Current Schedule:</span> Semi-annual
                      </div>
                      <div className="bg-white dark:bg-black rounded border border-green-200 dark:border-green-800/50 px-3 py-1 text-xs">
                        <span className="font-medium">Reliability:</span> 99.8%
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <Button size="sm" variant="outline" className="border-green-300 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-900/30">
                        Maintain Schedule
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Anomaly Detection Tab */}
        <TabsContent value="anomalies">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Anomaly Detection</CardTitle>
              <CardDescription>ML-detected abnormal patterns in system behavior</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <BarChart
                  data={[
                    { system: 'UPS', anomalies: 7, normal: 734 },
                    { system: 'HVAC', anomalies: 12, normal: 598 },
                    { system: 'Power', anomalies: 5, normal: 456 },
                    { system: 'Fire', anomalies: 2, normal: 342 },
                    { system: 'Security', anomalies: 3, normal: 289 },
                  ]}
                  categories={["anomalies"]}
                  index="system"
                  colors={["#ef4444"]}
                  valueFormatter={(value) => `${value} events`}
                  className="h-[300px]"
                />
              </div>
              
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 dark:bg-amber-950/20 dark:border-amber-800/50">
                  <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Recent Anomalies</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-amber-200 dark:border-amber-800/50 pb-2">
                      <div>
                        <p className="font-medium">HVAC Temperature Fluctuation</p>
                        <p className="text-xs text-amber-700 dark:text-amber-400">Detected 2 hours ago</p>
                      </div>
                      <Button size="sm" variant="outline" className="h-8">
                        <span>Details</span>
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between border-b border-amber-200 dark:border-amber-800/50 pb-2">
                      <div>
                        <p className="font-medium">UPS Power Draw Pattern</p>
                        <p className="text-xs text-amber-700 dark:text-amber-400">Detected 6 hours ago</p>
                      </div>
                      <Button size="sm" variant="outline" className="h-8">
                        <span>Details</span>
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between pb-2">
                      <div>
                        <p className="font-medium">Security System Access Pattern</p>
                        <p className="text-xs text-amber-700 dark:text-amber-400">Detected 1 day ago</p>
                      </div>
                      <Button size="sm" variant="outline" className="h-8">
                        <span>Details</span>
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>View All Anomalies</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIInsights;
