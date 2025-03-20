
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Gauge } from "lucide-react";

const MEPEvaluation = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mechanical Health</CardTitle>
            <Gauge className="h-4 w-4 text-aramco-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <Progress value={87} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Last evaluated 2 days ago
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Electrical Systems</CardTitle>
            <Gauge className="h-4 w-4 text-aramco-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <Progress value={94} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Last evaluated 1 day ago
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plumbing Health</CardTitle>
            <Gauge className="h-4 w-4 text-aramco-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <Progress value={78} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Last evaluated 3 days ago
            </p>
          </CardContent>
        </Card>
      </div>
      
      <h3 className="text-xl font-bold mt-8">Detailed Evaluation Metrics</h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Mechanical Systems</CardTitle>
            <CardDescription>HVAC, Cooling and Power Systems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">HVAC Efficiency</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-1.5" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cooling System Performance</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-1.5" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Power Generation</span>
                  <span className="text-sm font-medium">81%</span>
                </div>
                <Progress value={81} className="h-1.5" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Maintenance Status</span>
                  <span className="text-sm font-medium">89%</span>
                </div>
                <Progress value={89} className="h-1.5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Electrical Systems</CardTitle>
            <CardDescription>Power Distribution, Backup and Monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Power Distribution</span>
                  <span className="text-sm font-medium">95%</span>
                </div>
                <Progress value={95} className="h-1.5" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Backup Systems</span>
                  <span className="text-sm font-medium">97%</span>
                </div>
                <Progress value={97} className="h-1.5" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Monitoring & Alerts</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-1.5" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Energy Efficiency</span>
                  <span className="text-sm font-medium">88%</span>
                </div>
                <Progress value={88} className="h-1.5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Plumbing Systems</CardTitle>
            <CardDescription>Water, Waste and Cooling Infrastructure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Water Distribution</span>
                  <span className="text-sm font-medium">76%</span>
                </div>
                <Progress value={76} className="h-1.5" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Waste Management</span>
                  <span className="text-sm font-medium">83%</span>
                </div>
                <Progress value={83} className="h-1.5" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cooling Infrastructure</span>
                  <span className="text-sm font-medium">79%</span>
                </div>
                <Progress value={79} className="h-1.5" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Leak Detection</span>
                  <span className="text-sm font-medium">74%</span>
                </div>
                <Progress value={74} className="h-1.5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>Actionable insights for improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium mb-1">Plumbing Maintenance Required</h4>
                <p className="text-sm text-muted-foreground">Schedule maintenance for leak detection system in Sector B.</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium mb-1">HVAC Filter Replacement</h4>
                <p className="text-sm text-muted-foreground">Replace HVAC filters in Building C, efficiency dropping below threshold.</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium mb-1">Cooling System Optimization</h4>
                <p className="text-sm text-muted-foreground">Adjust cooling tower parameters for improved efficiency.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MEPEvaluation;
