
import { Card, CardContent } from "@/components/ui/card";
import { FolderSymlink, Activity, Clock, CheckCircle2, AlertTriangle, Zap } from "lucide-react";
import { projectStats } from "./mock-data";

const ProjectStatusCards = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
              <p className="text-3xl font-bold">{projectStats.all}</p>
            </div>
            <div className="p-2 bg-primary/10 rounded-full">
              <FolderSymlink className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            <span className="font-medium text-emerald-500">{projectStats.completed}</span> completed
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
              <p className="text-3xl font-bold">{projectStats.active}</p>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-full">
              <Activity className="h-5 w-5 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            <span className="font-medium text-blue-500">{projectStats.planning}</span> in planning
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">On Track</p>
              <p className="text-3xl font-bold">{projectStats.onTrack}</p>
            </div>
            <div className="p-2 bg-emerald-500/10 rounded-full">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            <span className="font-medium text-emerald-500">{Math.round(projectStats.onTrack / projectStats.active * 100)}%</span> of active projects
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">At Risk</p>
              <p className="text-3xl font-bold">{projectStats.atRisk}</p>
            </div>
            <div className="p-2 bg-destructive/10 rounded-full">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            <span className="font-medium text-destructive">{Math.round(projectStats.atRisk / projectStats.active * 100)}%</span> of active projects
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectStatusCards;
