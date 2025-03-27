
import { getUpcomingTasks } from "../mock-data/schedule-data";
import { Badge } from "@/components/ui/badge";

interface UpcomingTasksProps {
  schedules: any[];
}

const UpcomingTasks = ({ schedules }: UpcomingTasksProps) => {
  // Get upcoming tasks - either from props or from our utility function
  const upcomingTasks = schedules.length > 0 ? schedules : getUpcomingTasks();
  
  // Function to format dates in a readable way
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="border rounded-md p-4">
      <h3 className="font-medium mb-4">Upcoming Tasks</h3>
      <div className="space-y-3">
        {upcomingTasks.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No upcoming tasks scheduled
          </div>
        ) : (
          upcomingTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-full min-h-[40px] rounded-full ${
                  task.team === "electrical" ? "bg-red-500" : 
                  task.team === "hvac" ? "bg-blue-500" : 
                  task.team === "mechanical" ? "bg-orange-500" : 
                  "bg-green-500"
                }`}></div>
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-muted-foreground">{task.id} • {task.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <Badge variant="outline" className={
                    task.priority === "Critical" ? "bg-red-100 text-red-800 hover:bg-red-100" : 
                    task.priority === "High" ? "bg-orange-100 text-orange-800 hover:bg-orange-100" : 
                    task.priority === "Medium" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" : 
                    "bg-green-100 text-green-800 hover:bg-green-100"
                  }>
                    {task.priority}
                  </Badge>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Team:</span> {task.team}
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Due:</span> {formatDate(task.startDate)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingTasks;
