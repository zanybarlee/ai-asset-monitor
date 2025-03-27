
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { mockTeamData } from "@/components/planning-scheduling/mock-data";

const ResourceUtilizationReport = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Utilization</CardTitle>
        <CardDescription>Analysis of team and staff utilization</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">+5% from previous month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overtime Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42 hrs</div>
              <p className="text-xs text-muted-foreground">-12% from previous month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Skill Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">+3% from previous month</p>
            </CardContent>
          </Card>
        </div>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockTeamData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Utilization']}
                contentStyle={{ background: '#1f2937', border: 'none', borderRadius: '4px', color: 'white' }}
              />
              <Legend />
              <Bar dataKey="current" name="Current Utilization" fill="#8884d8" />
              <Bar dataKey="optimal" name="Optimal Range" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceUtilizationReport;
