
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, PlayCircle, Server } from "lucide-react";
import { WorkflowStep } from "../types";

export interface ActiveWorkflowProps {
  id: string;
  name: string;
  type: string;
  status: string;
  progress: number;
  startDate: string;
  estimatedCompletion: string;
  assignedTo: string;
  steps: WorkflowStep[];
}

const ActiveWorkflowItem = ({ workflow }: { workflow: ActiveWorkflowProps }) => {
  return (
    <Card key={workflow.id}>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-lg flex items-center">
              <Server className="h-5 w-5 text-blue-500 mr-2" />
              {workflow.name}
            </CardTitle>
            <CardDescription>
              Started: {workflow.startDate} • Est. Completion: {workflow.estimatedCompletion}
            </CardDescription>
          </div>
          <Badge variant={workflow.status === "In Progress" ? "default" : "outline"}>
            {workflow.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{workflow.progress}%</span>
          </div>
          <Progress value={workflow.progress} className="h-2" />
        </div>
        
        <div className="space-y-2">
          {workflow.steps.map((step, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                {step.status === "Completed" ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2" />
                ) : step.status === "In Progress" ? (
                  <Clock className="h-4 w-4 text-amber-500 mr-2" />
                ) : (
                  <div className="h-4 w-4 border rounded-full mr-2" />
                )}
                <span className={`text-sm ${step.status === "Completed" ? "line-through text-muted-foreground" : ""}`}>
                  {step.name}
                </span>
              </div>
              <Badge variant="outline" className="text-xs">
                {step.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="text-sm text-muted-foreground">
          Assigned to: {workflow.assignedTo}
        </div>
        <Button size="sm">
          <PlayCircle className="mr-2 h-4 w-4" />
          Manage Workflow
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActiveWorkflowItem;
