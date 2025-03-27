
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getRiskBgColor } from "./utils/predictiveUtils";

const DynamicSchedulingTab = () => {
  const { toast } = useToast();

  const handleUpdateSchedule = (assetId: string) => {
    toast({
      title: "Maintenance Schedule Updated",
      description: `The maintenance schedule for ${assetId} has been optimized based on risk analysis.`,
    });
  };

  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default DynamicSchedulingTab;
