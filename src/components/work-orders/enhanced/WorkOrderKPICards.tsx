
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, AlertTriangle, CheckCircle2, BarChart2, Calendar, Wrench } from "lucide-react";

const WorkOrderKPICards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            Avg Time to Close
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3.2 days</div>
          <p className="text-xs text-muted-foreground">4% improvement this month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Emergency SLA Met
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">92%</div>
          <p className="text-xs text-muted-foreground">2% below target</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Wrench className="h-4 w-4 text-emerald-500" />
            MTBF (days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">42</div>
          <p className="text-xs text-muted-foreground">Up from 38 days last quarter</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4 text-destructive" />
            Downtime (hours)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">86</div>
          <p className="text-xs text-muted-foreground">24% less than previous month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4 text-purple-500" />
            Shift Transfers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">18</div>
          <p className="text-xs text-muted-foreground">4 critical tasks transferred</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-blue-600" />
            PM vs CM Ratio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">72%</div>
          <p className="text-xs text-muted-foreground">Target is 80% preventive</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkOrderKPICards;
