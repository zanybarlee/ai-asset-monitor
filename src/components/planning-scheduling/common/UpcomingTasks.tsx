
interface UpcomingTasksProps {
  schedules: any[];
}

const UpcomingTasks = ({ schedules }: UpcomingTasksProps) => {
  return (
    <div className="border rounded-md p-4">
      <h3 className="font-medium mb-4">Upcoming Tasks</h3>
      <div className="space-y-3">
        {schedules.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No upcoming tasks scheduled
          </div>
        ) : (
          schedules.map((task) => (
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
                  <span className="text-muted-foreground">Type:</span> {task.type}
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Team:</span> {task.team}
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Due:</span> {new Date(task.endDate).toLocaleDateString()}
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
