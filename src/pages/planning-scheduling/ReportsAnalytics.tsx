
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Download, FileText, BarChart3, PieChart as PieChartIcon, TrendingUp } from "lucide-react";
import { mockTimelineData, mockWorkTypeData, mockComplianceData } from "@/components/planning-scheduling/mock-data";

const ReportsAnalytics = () => {
  const [reportType, setReportType] = useState("pm-compliance");
  const [timePeriod, setTimePeriod] = useState("month");
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2 items-center">
          <Select 
            value={reportType} 
            onValueChange={setReportType}
          >
            <SelectTrigger className="w-[260px]">
              <SelectValue placeholder="Report Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pm-compliance">PM Compliance</SelectItem>
              <SelectItem value="backlog-analysis">Backlog Analysis</SelectItem>
              <SelectItem value="resource-utilization">Resource Utilization</SelectItem>
              <SelectItem value="work-order-analysis">Work Order Analysis</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={timePeriod} 
            onValueChange={setTimePeriod}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          {timePeriod === "custom" && (
            <DateRangePicker 
              date={dateRange}
              onDateChange={setDateRange}
            />
          )}
        </div>
        
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {reportType === "pm-compliance" && (
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
      )}

      {reportType === "backlog-analysis" && (
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
                <BarChart data={mockBacklogData}>
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
      )}

      {reportType === "resource-utilization" && (
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
      )}

      {reportType === "work-order-analysis" && (
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
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 1, name: "Monthly PM Compliance", type: "Excel", date: "Oct 1, 2023" },
                { id: 2, name: "Backlog Aging Analysis", type: "PDF", date: "Sep 15, 2023" },
                { id: 3, name: "Resource Utilization Q3", type: "Excel", date: "Oct 5, 2023" },
                { id: 4, name: "Critical Asset Health", type: "PDF", date: "Sep 28, 2023" },
              ].map((report) => (
                <div key={report.id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-xs text-muted-foreground">Generated: {report.date}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3 mr-2" />
                    {report.type}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
      </div>
    </div>
  );
};

// Mock data for the bar chart
const mockTeamData = [
  { name: "Mechanical", current: 75, optimal: 80, capacity: 90 },
  { name: "Electrical", current: 85, optimal: 75, capacity: 95 },
  { name: "HVAC", current: 60, optimal: 70, capacity: 75 },
  { name: "IT Support", current: 90, optimal: 75, capacity: 100 },
];

// Mock data for the backlog analysis chart
const mockBacklogData = [
  { name: "Critical", count: 5, age: 4.5 },
  { name: "High", count: 12, age: 8.2 },
  { name: "Medium", count: 18, age: 14.6 },
  { name: "Low", count: 7, age: 18.5 },
];

// Mock data for work order location distribution
const workOrderLocationData = [
  { name: "Data Hall 1", pm: 45, cm: 12, other: 5 },
  { name: "Data Hall 2", pm: 38, cm: 18, other: 7 },
  { name: "UPS Room", pm: 25, cm: 8, other: 3 },
  { name: "Cooling Plant", pm: 35, cm: 22, other: 8 },
  { name: "Generator", pm: 15, cm: 5, other: 2 },
];

export default ReportsAnalytics;
