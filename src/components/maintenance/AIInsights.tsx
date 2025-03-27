
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AIInsights = () => {
  return (
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
  );
};

export default AIInsights;
