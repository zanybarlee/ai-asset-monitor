
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export interface TemplateWorkflowProps {
  id: string;
  name: string;
  type: string;
  description: string;
  steps: number;
  estimatedDuration: string;
}

const TemplateWorkflowItem = ({ template }: { template: TemplateWorkflowProps }) => {
  return (
    <Card key={template.id}>
      <CardHeader>
        <CardTitle className="text-base">{template.name}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Type:</span>
          <span>{template.type}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-muted-foreground">Steps:</span>
          <span>{template.steps}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-muted-foreground">Est. Duration:</span>
          <span>{template.estimatedDuration}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button className="w-full">
          Start New Workflow
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateWorkflowItem;
