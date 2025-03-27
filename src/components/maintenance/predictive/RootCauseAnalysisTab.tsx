
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/ui/charts";
import { Button } from "@/components/ui/button";
import { Database, History } from "lucide-react";

const RootCauseAnalysisTab = () => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default RootCauseAnalysisTab;
