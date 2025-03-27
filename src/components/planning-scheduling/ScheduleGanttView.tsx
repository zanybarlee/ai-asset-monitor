
import { BarChart3, Calendar } from "lucide-react";

interface ScheduleGanttViewProps {
  schedules: any[];
  period: string;
}

const ScheduleGanttView = ({ schedules, period }: ScheduleGanttViewProps) => {
  // In a real application, this would be a proper Gantt chart implementation
  // For this example, we'll show a placeholder with sample data
  
  const getDaysInView = () => {
    switch (period) {
      case 'day':
        return 1;
      case 'week':
        return 7;
      case 'month':
        return 30;
      default:
        return 7;
    }
  };
  
  return (
    <div className="border rounded-md p-6">
      <div className="text-center mb-8">
        <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">Gantt Chart View</h3>
        <p className="text-muted-foreground">
          {schedules.length} maintenance tasks scheduled over {getDaysInView()} {period === 'day' ? 'day' : period === 'week' ? 'days' : 'days'}.
        </p>
        <p className="text-muted-foreground mt-2">
          A full interactive Gantt chart would be implemented here in the complete version.
        </p>
      </div>
      
      <div className="mt-6 border rounded-md overflow-hidden">
        <div className="bg-muted p-2 grid grid-cols-8 gap-2 text-sm font-medium border-b">
          <div className="col-span-2">Task</div>
          <div className="col-span-6 flex">
            {Array.from({ length: getDaysInView() > 7 ? 7 : getDaysInView() }).map((_, i) => (
              <div key={i} className="flex-1 text-center">
                {new Date(Date.now() + i * 86400000).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
              </div>
            ))}
            {getDaysInView() > 7 && <div className="flex-1 text-center">...</div>}
          </div>
        </div>
        
        {schedules.slice(0, 5).map((schedule, index) => (
          <div key={schedule.id} className={`grid grid-cols-8 gap-2 p-2 text-sm ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}>
            <div className="col-span-2 flex items-center">
              <div className={`w-2 h-full rounded-full mr-2 ${
                schedule.priority === "Critical" ? "bg-red-500" : 
                schedule.priority === "High" ? "bg-orange-500" : 
                schedule.priority === "Medium" ? "bg-blue-500" : 
                "bg-green-500"
              }`}></div>
              <div>
                <p className="font-medium">{schedule.title}</p>
                <p className="text-xs text-muted-foreground">{schedule.team}</p>
              </div>
            </div>
            <div className="col-span-6 flex items-center">
              <div 
                className={`h-6 rounded-full px-2 flex items-center justify-center text-xs text-white ${
                  schedule.type === "PM" ? "bg-blue-500" : 
                  schedule.type === "CM" ? "bg-orange-500" : 
                  "bg-purple-500"
                }`}
                style={{ 
                  width: `${Math.min(100, schedule.duration / (getDaysInView() > 7 ? 7 : getDaysInView()) * 100)}%`,
                  marginLeft: `${Math.min(100, schedule.dayOffset / (getDaysInView() > 7 ? 7 : getDaysInView()) * 100)}%` 
                }}
              >
                {schedule.duration} day{schedule.duration > 1 ? 's' : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleGanttView;
