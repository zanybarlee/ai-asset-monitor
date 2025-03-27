
import { Project } from "./mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, MapPin, AlertTriangle, CheckCircle2, FolderSymlink } from "lucide-react";

interface ProjectsListProps {
  projects: Project[];
}

const ProjectsList = ({ projects }: ProjectsListProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-blue-500">Active</Badge>;
      case "Planning":
        return <Badge variant="outline">Planning</Badge>;
      case "Completed":
        return <Badge className="bg-emerald-500">Completed</Badge>;
      case "On Hold":
        return <Badge className="bg-amber-500">On Hold</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Expansion":
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Expansion</Badge>;
      case "Upgrade":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Upgrade</Badge>;
      case "Shutdown":
        return <Badge variant="outline" className="border-purple-500 text-purple-500">Shutdown</Badge>;
      case "Installation":
        return <Badge variant="outline" className="border-emerald-500 text-emerald-500">Installation</Badge>;
      case "Maintenance":
        return <Badge variant="outline" className="border-slate-500 text-slate-500">Maintenance</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Critical":
        return <Badge className="bg-destructive">Critical</Badge>;
      case "High":
        return <Badge className="bg-amber-500">High</Badge>;
      case "Medium":
        return <Badge className="bg-blue-500">Medium</Badge>;
      case "Low":
        return <Badge className="bg-slate-500">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold flex items-center">
                    {project.name}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <FolderSymlink className="mr-1 h-4 w-4" />
                    <span>{project.id}</span>
                    <span className="mx-2">•</span>
                    <span>Manager: {project.manager}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  {getStatusBadge(project.status)}
                  {getTypeBadge(project.type)}
                  {getPriorityBadge(project.priority)}
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">{project.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Timeline</p>
                    <p className="text-sm">
                      {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm">{project.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Teams</p>
                    <p className="text-sm">{project.teams.join(", ")}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Progress</p>
                  <p className="text-sm text-muted-foreground">{project.progress}%</p>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-xs text-muted-foreground">Budget Used</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">${project.budget.used.toLocaleString()} / ${project.budget.total.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">
                      ({Math.round((project.budget.used / project.budget.total) * 100)}%)
                    </p>
                  </div>
                  <Progress value={(project.budget.used / project.budget.total) * 100} className="h-1 mt-1" />
                </div>
                
                <div>
                  <p className="text-xs text-muted-foreground">Work Orders</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{project.workOrders.completed} / {project.workOrders.total} Completed</p>
                    <p className="text-xs text-muted-foreground">
                      ({Math.round((project.workOrders.completed / project.workOrders.total) * 100)}%)
                    </p>
                  </div>
                  <Progress value={(project.workOrders.completed / project.workOrders.total) * 100} className="h-1 mt-1" />
                </div>
              </div>
            </div>
            
            <div className="border-t bg-muted/30 p-4 flex justify-between items-center">
              <div className="flex space-x-1">
                {project.milestones.some(m => m.status === "At Risk" || m.status === "Delayed") ? (
                  <div className="flex items-center text-xs text-destructive">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    <span>At risk milestone</span>
                  </div>
                ) : (
                  <div className="flex items-center text-xs text-emerald-500">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    <span>On track</span>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Work Orders</Button>
                <Button variant="outline" size="sm">Milestones</Button>
                <Button size="sm">View Details</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectsList;
