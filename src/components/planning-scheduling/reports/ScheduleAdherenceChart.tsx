
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import { mockComplianceData } from "@/components/planning-scheduling/mock-data";

const ScheduleAdherenceChart = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Schedule Adherence Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockComplianceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Adherence']}
                contentStyle={{ background: '#1f2937', border: 'none', borderRadius: '4px', color: 'white' }}
              />
              <Legend />
              <Line type="monotone" dataKey="value" name="Adherence %" stroke="#8884d8" />
              <Line type="monotone" dataKey="target" name="Target" stroke="#82ca9d" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleAdherenceChart;
