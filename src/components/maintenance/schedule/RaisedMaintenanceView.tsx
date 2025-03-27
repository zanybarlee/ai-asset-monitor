
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Filter, 
  Search, 
  Building, 
  LocateFixed, 
  Clock, 
  AlertCircle, 
  ClipboardList, 
  ListChecks, 
  CheckCircle,
  MessageCircle 
} from "lucide-react";
import { MaintenanceTask } from "./maintenance-data";

interface RaisedMaintenanceViewProps {
  pendingTasks: MaintenanceTask[];
  involvedTasks: MaintenanceTask[];
  onViewChecklist: (task: MaintenanceTask) => void;
  onRespondToTask: (task: MaintenanceTask) => void;
}

const RaisedMaintenanceView = ({ 
  pendingTasks, 
  involvedTasks, 
  onViewChecklist,
  onRespondToTask
}: RaisedMaintenanceViewProps) => {
  const [raisedSmTab, setRaisedSmTab] = useState("pending");

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
    <Tabs defaultValue="pending" value={raisedSmTab} onValueChange={setRaisedSmTab} className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="pending">Pending Tasks</TabsTrigger>
        <TabsTrigger value="involved">Involved Tasks</TabsTrigger>
      </TabsList>
      
      <TabsContent value="pending" className="space-y-4 mt-4">
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
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {pendingTasks.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="h-1 bg-amber-500" />
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
                      <div className="flex items-center">
                        <AlertCircle className="mr-1 h-4 w-4 text-amber-500" />
                        Action Required
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onViewChecklist(item)}
                    >
                      <ListChecks className="mr-2 h-4 w-4" />
                      View Checklist
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => onRespondToTask(item)}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Respond
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {pendingTasks.length === 0 && (
            <div className="flex items-center justify-center p-8 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">No pending tasks available.</p>
            </div>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="involved" className="space-y-4 mt-4">
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
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {involvedTasks.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="h-1 bg-emerald-500" />
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
                        <CheckCircle className="mr-1 h-4 w-4 text-emerald-500" />
                        Completed
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <Button variant="outline" size="sm" onClick={() => onViewChecklist(item)}>
                      <ClipboardList className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {involvedTasks.length === 0 && (
            <div className="flex items-center justify-center p-8 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">No involved tasks available.</p>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default RaisedMaintenanceView;
