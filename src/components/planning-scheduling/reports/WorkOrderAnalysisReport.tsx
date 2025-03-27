
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { mockWorkOrderData } from "@/components/planning-scheduling/mock-data";

interface WorkOrderLocationDataType {
  name: string;
  pm: number;
  cm: number;
  other: number;
}

interface WorkOrderAnalysisReportProps {
  workOrderLocationData: WorkOrderLocationDataType[];
}

const WorkOrderAnalysisReport = ({ workOrderLocationData }: WorkOrderAnalysisReportProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Order Analysis</CardTitle>
        <CardDescription>Analysis of work order types and distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Work Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">327</div>
              <p className="text-xs text-muted-foreground">+8% from previous month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">PM vs CM Ratio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">70:30</div>
              <p className="text-xs text-muted-foreground">+5% PM from previous month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Completion Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2 days</div>
              <p className="text-xs text-muted-foreground">-0.5 days from previous month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockWorkOrderData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {mockWorkOrderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value} WOs`, name]}
                contentStyle={{ background: '#1f2937', border: 'none', borderRadius: '4px', color: 'white' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={workOrderLocationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [`${value} WOs`, name]}
                contentStyle={{ background: '#1f2937', border: 'none', borderRadius: '4px', color: 'white' }}
              />
              <Legend />
              <Bar dataKey="pm" name="Preventive" stackId="a" fill="#8884d8" />
              <Bar dataKey="cm" name="Corrective" stackId="a" fill="#82ca9d" />
              <Bar dataKey="other" name="Other" stackId="a" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkOrderAnalysisReport;
