
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface VisitorStatsCardProps {
  activeCount: number;
  completedCount: number;
  scheduledCount: number;
  totalCount: number;
  todaysSchedule: {
    name: string;
    time: string;
  }[];
}

const VisitorStatsCard = ({ 
  activeCount, 
  completedCount, 
  scheduledCount, 
  totalCount,
  todaysSchedule
}: VisitorStatsCardProps) => {
  return (
    <Card className="glass">
      <CardHeader className="pb-2">
        <CardTitle>Visitor Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="border rounded-md p-3 flex flex-col items-center">
            <span className="text-3xl font-bold text-emerald-500">{activeCount}</span>
            <span className="text-sm text-muted-foreground">Active</span>
          </div>
          <div className="border rounded-md p-3 flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-500">{completedCount}</span>
            <span className="text-sm text-muted-foreground">Completed</span>
          </div>
          <div className="border rounded-md p-3 flex flex-col items-center">
            <span className="text-3xl font-bold text-primary">{scheduledCount}</span>
            <span className="text-sm text-muted-foreground">Scheduled</span>
          </div>
          <div className="border rounded-md p-3 flex flex-col items-center">
            <span className="text-3xl font-bold">{totalCount}</span>
            <span className="text-sm text-muted-foreground">Total</span>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Today's Schedule</h3>
          <div className="space-y-2">
            {todaysSchedule.map((schedule, index) => (
              <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <p className="font-medium">{schedule.name}</p>
                  <p className="text-xs text-muted-foreground">{schedule.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitorStatsCard;
