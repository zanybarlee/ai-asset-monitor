
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Search, Users, UserCheck, Filter, Calendar, Download } from "lucide-react";
import { mockStaffData, mockTeamData } from "@/components/planning-scheduling/mock-data";

const ResourceOptimization = () => {
  const [currentView, setCurrentView] = useState("staff");
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  // Filter staff data based on department and search
  const filteredStaff = mockStaffData.filter((staff) => {
    const matchesDepartment = departmentFilter === "all" || staff.department === departmentFilter;
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          staff.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesDepartment && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+5% from previous month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 / 32</div>
            <p className="text-xs text-muted-foreground">5 on time off</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skill Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Missing: HVAC Level 3</p>
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
      </div>

      <Tabs defaultValue="staff" value={currentView} onValueChange={setCurrentView}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="staff">
              <Users className="mr-2 h-4 w-4" />
              Staff
            </TabsTrigger>
            <TabsTrigger value="teams">
              <UserCheck className="mr-2 h-4 w-4" />
              Teams
            </TabsTrigger>
            <TabsTrigger value="workload">
              <Calendar className="mr-2 h-4 w-4" />
              Workload Distribution
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 md:w-[200px]"
            />
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="h-9 w-[160px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="mechanical">Mechanical</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="hvac">HVAC</SelectItem>
                <SelectItem value="it">IT Support</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
        
        <TabsContent value="staff">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Staff Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead>Workload</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                            {staff.name.charAt(0)}
                          </div>
                          {staff.name}
                        </div>
                      </TableCell>
                      <TableCell>{staff.role}</TableCell>
                      <TableCell>{staff.department}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {staff.skills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="bg-gray-100">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={staff.available ? "bg-green-500" : "bg-red-500"}>
                          {staff.available ? "Available" : "Unavailable"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Progress value={staff.workload} className="h-2" />
                          <div className="text-xs text-right">{staff.workload}%</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Assign</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="teams">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Team Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockTeamData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Utilization']}
                      contentStyle={{ background: '#1f2937', border: 'none', borderRadius: '4px', color: 'white' }}
                    />
                    <Bar dataKey="current" name="Current Utilization" fill="#8884d8" />
                    <Bar dataKey="optimal" name="Optimal Range" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4 mt-6">
                {mockTeamData.map((team) => (
                  <div key={team.name} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{team.name}</p>
                      <p className="text-sm text-muted-foreground">{team.memberCount} members</p>
                    </div>
                    <div className="flex items-center gap-8">
                      <div>
                        <p className="text-sm text-muted-foreground">Utilization</p>
                        <Progress value={team.current} className="h-2 w-24" />
                        <p className="text-xs text-right">{team.current}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Capacity</p>
                        <Progress value={team.capacity} className="h-2 w-24" />
                        <p className="text-xs text-right">{team.capacity}%</p>
                      </div>
                      <Button variant="outline" size="sm">Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="workload">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Workload Distribution</CardTitle>
                <Button variant="outline" size="sm" className="h-9">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Mechanical Team</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {mockStaffData.filter(s => s.department === "mechanical").slice(0, 4).map((staff) => (
                      <Card key={staff.id} className="overflow-hidden">
                        <CardHeader className="p-4 pb-0">
                          <CardTitle className="text-base">{staff.name}</CardTitle>
                          <p className="text-xs text-muted-foreground">{staff.role}</p>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm">
                                <span>Workload</span>
                                <span className={staff.workload > 90 ? "text-red-500" : staff.workload > 70 ? "text-orange-500" : "text-green-500"}>{staff.workload}%</span>
                              </div>
                              <Progress value={staff.workload} className="h-2 mt-1" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm">
                                <span>Assigned Tasks</span>
                                <span>{staff.assignedTasks}</span>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm">
                                <span>Completed</span>
                                <span>{staff.completedTasks}</span>
                              </div>
                            </div>
                            <div className="pt-2">
                              <Button variant="outline" size="sm" className="w-full">View Details</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Electrical Team</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {mockStaffData.filter(s => s.department === "electrical").slice(0, 4).map((staff) => (
                      <Card key={staff.id} className="overflow-hidden">
                        <CardHeader className="p-4 pb-0">
                          <CardTitle className="text-base">{staff.name}</CardTitle>
                          <p className="text-xs text-muted-foreground">{staff.role}</p>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm">
                                <span>Workload</span>
                                <span className={staff.workload > 90 ? "text-red-500" : staff.workload > 70 ? "text-orange-500" : "text-green-500"}>{staff.workload}%</span>
                              </div>
                              <Progress value={staff.workload} className="h-2 mt-1" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm">
                                <span>Assigned Tasks</span>
                                <span>{staff.assignedTasks}</span>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm">
                                <span>Completed</span>
                                <span>{staff.completedTasks}</span>
                              </div>
                            </div>
                            <div className="pt-2">
                              <Button variant="outline" size="sm" className="w-full">View Details</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResourceOptimization;
