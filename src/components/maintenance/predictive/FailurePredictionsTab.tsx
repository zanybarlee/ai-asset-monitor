
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "@/components/ui/charts";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, Activity } from "lucide-react";

const FailurePredictionsTab = () => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default FailurePredictionsTab;
