
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { TrendingUp, PieChart as PieChartIcon, BarChart3 } from "lucide-react";
import { mockTimelineData, mockWorkTypeData, mockTeamData } from "@/components/planning-scheduling/mock-data";

const PMComplianceReport = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preventive Maintenance Compliance</CardTitle>
        <CardDescription>PM task completion rate over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">+5.2% from previous period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed PMs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">122 of 143</div>
              <p className="text-xs text-muted-foreground">85.3% completion rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Assets Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">46 of 50 PMs completed</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="timeline">
          <TabsList>
            <TabsTrigger value="timeline">
              <TrendingUp className="h-4 w-4 mr-2" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="bytype">
              <PieChartIcon className="h-4 w-4 mr-2" />
              By Work Type
            </TabsTrigger>
            <TabsTrigger value="byteam">
              <BarChart3 className="h-4 w-4 mr-2" />
              By Team
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-4">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockTimelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Compliance']}
                    contentStyle={{ background: '#1f2937', border: 'none', borderRadius: '4px', color: 'white' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="compliance" stroke="#8884d8" name="PM Compliance" />
                  <Line type="monotone" dataKey="target" stroke="#82ca9d" name="Target" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="bytype" className="space-y-4">
            <div className="h-96 grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockWorkTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {mockWorkTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value} PMs`, name]}
                    contentStyle={{ background: '#1f2937', border: 'none', borderRadius: '4px', color: 'white' }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Work Type Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {mockWorkTypeData.map((item) => (
                      <li key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: item.color }}></div>
                          <span>{item.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span>{item.value} PMs</span>
                          <span className="text-muted-foreground">{item.compliance}% Complete</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="byteam" className="space-y-4">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockTeamData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === "assigned" ? `${value} PMs` : `${value}%`, 
                      name === "assigned" ? "Assigned" : "Compliance"
                    ]}
                    contentStyle={{ background: '#1f2937', border: 'none', borderRadius: '4px', color: 'white' }}
                  />
                  <Legend />
                  <Bar dataKey="assigned" name="Assigned PMs" fill="#8884d8" />
                  <Bar dataKey="compliance" name="Compliance %" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PMComplianceReport;
