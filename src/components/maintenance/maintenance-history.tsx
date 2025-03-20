
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/ui/charts";

const MaintenanceHistory = () => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default MaintenanceHistory;
