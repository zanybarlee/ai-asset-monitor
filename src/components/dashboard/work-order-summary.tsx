
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const WorkOrderSummary = () => {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="text-2xl">Work Order Summary</CardTitle>
        <CardDescription>Status of current maintenance tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-md border p-4 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-primary">12</div>
            <div className="text-sm font-medium text-muted-foreground">Open Tasks</div>
          </div>
          <div className="rounded-md border p-4 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-amber-500">7</div>
            <div className="text-sm font-medium text-muted-foreground">In Progress</div>
          </div>
          <div className="rounded-md border p-4 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-emerald-500">24</div>
            <div className="text-sm font-medium text-muted-foreground">Completed</div>
          </div>
          <div className="rounded-md border p-4 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-destructive">3</div>
            <div className="text-sm font-medium text-muted-foreground">Delayed</div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View All Work Orders</Button>
      </CardFooter>
    </Card>
  );
};

export default WorkOrderSummary;
