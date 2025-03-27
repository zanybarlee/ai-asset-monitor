
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Activity, AlertTriangle, CheckCircle2, ClipboardList, Zap } from "lucide-react";

interface WorkOrderStatsCardsProps {
  open: number;
  inProgress: number;
  completed: number;
  delayed: number;
  totalCost: number;
}

const WorkOrderStatsCards = ({
  open,
  inProgress,
  completed,
  delayed,
  totalCost
}: WorkOrderStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-blue-500" />
            Open
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{open}</div>
          <Link to="/workorders" className="text-xs text-blue-500 hover:underline">View all open work orders</Link>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Activity className="h-4 w-4 text-amber-500" />
            In Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{inProgress}</div>
          <Link to="/workorders" className="text-xs text-blue-500 hover:underline">View in-progress work orders</Link>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Completed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{completed}</div>
          <Link to="/workorders" className="text-xs text-blue-500 hover:underline">View completed work orders</Link>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            Delayed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{delayed}</div>
          <Link to="/workorders" className="text-xs text-blue-500 hover:underline">View delayed work orders</Link>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Zap className="h-4 w-4 text-purple-500" />
            Total Cost
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">${totalCost.toLocaleString()}</div>
          <span className="text-xs text-muted-foreground">Year to date</span>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkOrderStatsCards;
