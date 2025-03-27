
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowDown, ArrowUp, DollarSign, FileDown, Filter, PieChart } from "lucide-react";
import { mockProjects } from "@/components/project-management/mock-data";
import { Progress } from "@/components/ui/progress";

const BudgetTracking = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold">Budget Tracking</h3>
          <p className="text-muted-foreground">Monitor and analyze project finances and expenditures</p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                <p className="text-3xl font-bold">
                  ${mockProjects.reduce((total, project) => total + project.budget.total, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-full">
                <DollarSign className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Spent to Date</p>
                <p className="text-3xl font-bold">
                  ${mockProjects.reduce((total, project) => total + project.budget.used, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-emerald-500/10 rounded-full">
                <ArrowDown className="h-5 w-5 text-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Remaining</p>
                <p className="text-3xl font-bold">
                  ${mockProjects.reduce((total, project) => total + project.budget.total - project.budget.used, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-amber-500/10 rounded-full">
                <ArrowUp className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Budget Utilization</p>
                <p className="text-3xl font-bold">
                  {Math.round(mockProjects.reduce((total, project) => total + project.budget.used, 0) / 
                   mockProjects.reduce((total, project) => total + project.budget.total, 0) * 100)}%
                </p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <PieChart className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="projects">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="teams">By Team</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Budget by Project</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-6">
                {mockProjects.map(project => (
                  <li key={project.id} className="space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-muted-foreground">{project.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${project.budget.used.toLocaleString()} / ${project.budget.total.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          {Math.round((project.budget.used / project.budget.total) * 100)}% used
                        </p>
                      </div>
                    </div>
                    <Progress 
                      value={(project.budget.used / project.budget.total) * 100} 
                      className="h-2"
                    />
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Labor</p>
                        <p>${Math.round(project.budget.used * 0.6).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Materials</p>
                        <p>${Math.round(project.budget.used * 0.3).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Other</p>
                        <p>${Math.round(project.budget.used * 0.1).toLocaleString()}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Budget by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-12 border-2 border-dashed rounded-md">
                <div className="text-center">
                  <p className="text-muted-foreground">Budget breakdown by category visualization would render here</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Showing proportions for labor, materials, equipment, and other expenses
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="teams" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Budget by Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-12 border-2 border-dashed rounded-md">
                <div className="text-center">
                  <p className="text-muted-foreground">Budget allocation by team visualization would render here</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Showing budget distribution across different teams and departments
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetTracking;
