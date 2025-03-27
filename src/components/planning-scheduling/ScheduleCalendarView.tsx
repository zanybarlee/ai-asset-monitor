
import { Calendar } from "lucide-react";

interface ScheduleCalendarViewProps {
  schedules: any[];
  period: string;
}

const ScheduleCalendarView = ({ schedules, period }: ScheduleCalendarViewProps) => {
  // In a real application, this would be a proper calendar view
  // For this example, we'll show a simple placeholder with sample data
  
  return (
    <div className="border rounded-md p-6 text-center">
      <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">Calendar View</h3>
      <p className="text-muted-foreground">
        This would display a full calendar view for {period} period with {schedules.length} scheduled tasks.
      </p>
      <p className="text-muted-foreground mt-2">
        Integration with a proper calendar component would be implemented in the full version.
      </p>
      
      <div className="mt-6 border rounded-md overflow-hidden">
        <div className="bg-muted p-2 text-sm font-medium border-b">
          Today's Schedule ({new Date().toLocaleDateString()})
        </div>
        
        {schedules.slice(0, 3).map((schedule) => (
          <div key={schedule.id} className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center">
              <div className={`w-2 h-8 rounded-full mr-2 ${
                schedule.priority === "Critical" ? "bg-red-500" : 
                schedule.priority === "High" ? "bg-orange-500" : 
                schedule.priority === "Medium" ? "bg-blue-500" : 
                "bg-green-500"
              }`}></div>
              <div className="text-left">
                <p className="font-medium">{schedule.title}</p>
                <p className="text-xs text-muted-foreground">{schedule.location} • {schedule.team}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`px-2 py-1 rounded-full text-xs ${
                schedule.type === "PM" ? "bg-blue-100 text-blue-800" : 
                schedule.type === "CM" ? "bg-orange-100 text-orange-800" : 
                "bg-purple-100 text-purple-800"
              }`}>
                {schedule.type}
              </div>
              <div className="text-sm">{schedule.startTime} - {schedule.endTime}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleCalendarView;
