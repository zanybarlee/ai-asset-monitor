
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { mockProjects } from "@/components/project-management/mock-data";
import { BarChart4, Download, FileDown, Filter, LineChart, PieChart, Printer } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProjectReports = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold">Project Reports</h3>
          <p className="text-muted-foreground">Analyze project performance and generate reports</p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button size="sm">
            <FileDown className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-64">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-1">Report Type</p>
              <Select defaultValue="summary">
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Project Summary</SelectItem>
                  <SelectItem value="budget">Budget Analysis</SelectItem>
                  <SelectItem value="progress">Progress Report</SelectItem>
                  <SelectItem value="workload">Team Workload</SelectItem>
                  <SelectItem value="variance">Variance Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">Project</p>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {mockProjects.map(project => (
                    <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">Time Period</p>
              <Select defaultValue="quarter">
                <SelectTrigger>
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Include in Report</p>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="budget" className="rounded" defaultChecked />
                <label htmlFor="budget" className="text-sm">Budget Analysis</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="schedule" className="rounded" defaultChecked />
                <label htmlFor="schedule" className="text-sm">Schedule Tracking</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="resources" className="rounded" defaultChecked />
                <label htmlFor="resources" className="text-sm">Resource Allocation</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="risks" className="rounded" defaultChecked />
                <label htmlFor="risks" className="text-sm">Risk Analysis</label>
              </div>
            </div>
            
            <Button className="w-full">Generate Report</Button>
          </div>
        </div>
        
        <div className="flex-1 space-y-6">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="budget">Budget</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart4 className="mr-2 h-5 w-5 text-muted-foreground" />
                    Project Status Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center p-12 border-2 border-dashed rounded-md">
                    <div className="text-center">
                      <p className="text-muted-foreground">Status overview chart would render here</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Showing distribution of projects by status, type, and progress
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="mr-2 h-5 w-5 text-muted-foreground" />
                      Project Types
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-md">
                      <div className="text-center">
                        <p className="text-muted-foreground">Project type distribution chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <LineChart className="mr-2 h-5 w-5 text-muted-foreground" />
                      Progress Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-md">
                      <div className="text-center">
                        <p className="text-muted-foreground">Progress tracking chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="budget" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Budget Allocation and Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center p-12 border-2 border-dashed rounded-md">
                    <div className="text-center">
                      <p className="text-muted-foreground">Budget reports and charts would render here</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Showing planned vs. actual spending, variances, and forecasts
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="timeline" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Timeline and Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center p-12 border-2 border-dashed rounded-md">
                    <div className="text-center">
                      <p className="text-muted-foreground">Timeline visualizations would render here</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Showing project schedules, milestones, and completion status
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="teams" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Performance and Workload</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center p-12 border-2 border-dashed rounded-md">
                    <div className="text-center">
                      <p className="text-muted-foreground">Team reports would render here</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Showing team allocation, performance metrics, and workload distribution
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProjectReports;
