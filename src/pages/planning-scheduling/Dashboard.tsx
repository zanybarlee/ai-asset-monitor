
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockWorkOrderData, mockComplianceData, mockResourceData } from "@/components/planning-scheduling/mock-data";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PM Completion Rate</CardTitle>
            <Badge className="bg-green-500">85%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">122/143 Tasks</div>
            <p className="text-xs text-muted-foreground">
              +5.2% from previous period
            </p>
            <div className="h-[60px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockComplianceData.slice(0, 7)}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Schedule Adherence</CardTitle>
            <Badge className="bg-blue-500">78%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78% Compliance</div>
            <p className="text-xs text-muted-foreground">
              -2.1% from previous period
            </p>
            <div className="h-[60px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockComplianceData.slice(7, 14)}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Work Order Backlog</CardTitle>
            <Badge className="bg-orange-500">32 Tasks</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11.2 Days Avg. Age</div>
            <p className="text-xs text-muted-foreground">
              +3.5 days from previous period
            </p>
            <div className="h-[60px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockComplianceData.slice(14, 21)}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#f97316"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Work Order Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
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
                    formatter={(value, name) => [`${value} Tasks`, name]}
                    contentStyle={{ background: '#1f2937', border: 'none', borderRadius: '4px', color: 'white' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Resource Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockResourceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Utilization']}
                    contentStyle={{ background: '#1f2937', border: 'none', borderRadius: '4px', color: 'white' }}
                  />
                  <Legend />
                  <Bar dataKey="utilization" fill="#8884d8" />
                  <Bar dataKey="capacity" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Critical Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "WO-1234", title: "UPS Battery Replacement", priority: "Critical", dueDate: "2023-10-15", location: "Data Hall 3", assignee: "John Smith" },
                { id: "WO-1235", title: "CRAC Filter Replacement", priority: "High", dueDate: "2023-10-16", location: "Data Hall 1", assignee: "Sarah Johnson" },
                { id: "WO-1236", title: "Generator Fuel Check", priority: "Medium", dueDate: "2023-10-17", location: "External", assignee: "Mike Brown" },
                { id: "WO-1237", title: "PDU Maintenance", priority: "Critical", dueDate: "2023-10-18", location: "Data Hall 2", assignee: "Alex Davis" },
              ].map((task) => (
                <div key={task.id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-8 rounded-full ${task.priority === "Critical" ? "bg-red-500" : task.priority === "High" ? "bg-orange-500" : "bg-blue-500"}`}></div>
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground">{task.id} • {task.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={task.priority === "Critical" ? "bg-red-500" : task.priority === "High" ? "bg-orange-500" : "bg-blue-500"}>
                      {task.priority}
                    </Badge>
                    <div className="text-sm">Due: {new Date(task.dueDate).toLocaleDateString()}</div>
                    <div className="text-sm">{task.assignee}</div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">View All Tasks</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
