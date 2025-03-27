
import { useState } from "react";
import { Search, Filter, CalendarClock, ClipboardList, ListChecks, Building, LocateFixed, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface MaintenanceTask {
  id: string;
  title: string;
  location: string;
  asset: string;
  assignee: string;
  dueDate: string;
  status: string;
  priority: string;
}

interface MaintenanceListViewProps {
  maintenanceList: MaintenanceTask[];
  onScheduleNew: () => void;
  onViewChecklist: (task: MaintenanceTask) => void;
  onRespondToTask: (task: MaintenanceTask) => void;
}

const MaintenanceListView = ({ 
  maintenanceList, 
  onScheduleNew, 
  onViewChecklist,
  onRespondToTask
}: MaintenanceListViewProps) => {
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Critical":
        return <Badge className="bg-red-500 hover:bg-red-600">{priority}</Badge>;
      case "High":
        return <Badge className="bg-orange-500 hover:bg-orange-600">{priority}</Badge>;
      case "Medium":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{priority}</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by ID/Name..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={onScheduleNew}>
          <CalendarClock className="mr-2 h-4 w-4" />
          Schedule
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {maintenanceList.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className={`h-1 ${item.status === 'Completed' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">{item.id}</span>
                    {getPriorityBadge(item.priority)}
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Building className="mr-1 h-4 w-4" />
                      {item.location}
                    </div>
                    <div className="flex items-center">
                      <LocateFixed className="mr-1 h-4 w-4" />
                      {item.asset}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      Due: {item.dueDate}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <Button variant="outline" size="sm" onClick={() => onViewChecklist(item)}>
                    <ListChecks className="mr-2 h-4 w-4" />
                    View Checklist
                  </Button>
                  <Button size="sm" onClick={() => onRespondToTask(item)}>
                    <ClipboardList className="mr-2 h-4 w-4" />
                    Respond
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceListView;
