
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

type BacklogDataType = Array<{
  name: string;
  count: number;
  age: number;
}>;

interface BacklogAnalysisReportProps {
  backlogData: BacklogDataType;
}

const BacklogAnalysisReport = ({ backlogData }: BacklogAnalysisReportProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Backlog Analysis</CardTitle>
        <CardDescription>Analysis of maintenance backlog and aging tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Backlog</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42 Tasks</div>
              <p className="text-xs text-muted-foreground">-12% from previous month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Age</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">11.2 Days</div>
              <p className="text-xs text-muted-foreground">+2.3 days from previous month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5 Tasks</div>
              <p className="text-xs text-muted-foreground">-2 from previous month</p>
            </CardContent>
          </Card>
        </div>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={backlogData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip 
                contentStyle={{ background: '#1f2937', border: 'none', borderRadius: '4px', color: 'white' }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="count" name="Task Count" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="age" name="Avg. Age (Days)" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BacklogAnalysisReport;
