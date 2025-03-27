
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Filter, FolderSymlink, Clock, BarChart4, DollarSign } from "lucide-react";
import ProjectsList from "@/components/project-management/ProjectsList";
import ProjectStatusCards from "@/components/project-management/ProjectStatusCards";
import { mockProjects } from "@/components/project-management/mock-data";

const ProjectDashboard = () => {
  const [filterTab, setFilterTab] = useState("all");
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-semibold">Projects Dashboard</h3>
          <p className="text-muted-foreground">Overview of all ongoing and upcoming projects</p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>
      
      <ProjectStatusCards />
      
      <Tabs defaultValue="all" value={filterTab} onValueChange={setFilterTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <ProjectsList projects={mockProjects} />
        </TabsContent>
        
        <TabsContent value="active" className="mt-6">
          <ProjectsList projects={mockProjects.filter(p => p.status === "Active")} />
        </TabsContent>
        
        <TabsContent value="planning" className="mt-6">
          <ProjectsList projects={mockProjects.filter(p => p.status === "Planning")} />
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <ProjectsList projects={mockProjects.filter(p => p.status === "Completed")} />
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
              Upcoming Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {mockProjects
                .flatMap(p => p.milestones)
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 5)
                .map((milestone, idx) => (
                  <li key={idx} className="flex justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{milestone.name}</p>
                      <p className="text-sm text-muted-foreground">{milestone.project}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{new Date(milestone.date).toLocaleDateString()}</p>
                      <p className={`text-xs ${milestone.status === "At Risk" ? "text-destructive" : "text-muted-foreground"}`}>
                        {milestone.status}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart4 className="mr-2 h-5 w-5 text-muted-foreground" />
              Budget Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {mockProjects
                .filter(p => p.status === "Active")
                .slice(0, 5)
                .map((project, idx) => (
                  <li key={idx} className="space-y-2 border-b pb-2">
                    <div className="flex justify-between">
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm font-medium">{Math.round((project.budget.used / project.budget.total) * 100)}%</p>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          (project.budget.used / project.budget.total) > 0.9 
                            ? "bg-destructive" 
                            : (project.budget.used / project.budget.total) > 0.7 
                              ? "bg-amber-500" 
                              : "bg-emerald-500"
                        }`}
                        style={{ width: `${Math.round((project.budget.used / project.budget.total) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>${project.budget.used.toLocaleString()}</span>
                      <span>${project.budget.total.toLocaleString()}</span>
                    </div>
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDashboard;
