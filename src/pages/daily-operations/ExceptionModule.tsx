
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MessageSquare, Ticket, AlertCircle, HelpCircle, Clock, User } from "lucide-react";
import { CreateTicketDialog } from "@/components/exception-module/CreateTicketDialog";

const ExceptionModule = () => {
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);

  // Mock data for tickets
  const tickets = [
    {
      id: "TICK-1001",
      title: "Server overheating in Room 103",
      priority: "high",
      status: "open",
      created: "2023-06-15",
      assignee: "Sarah Johnson",
      category: "Hardware",
    },
    {
      id: "TICK-1002",
      title: "Network connectivity issue in Building B",
      priority: "medium",
      status: "in-progress",
      created: "2023-06-14",
      assignee: "Mike Chen",
      category: "Network",
    },
    {
      id: "TICK-1003",
      title: "Database error in production environment",
      priority: "critical",
      status: "open",
      created: "2023-06-13",
      assignee: "Unassigned",
      category: "Software",
    },
    {
      id: "TICK-1004",
      title: "UPS failure in control room",
      priority: "high",
      status: "resolved",
      created: "2023-06-10",
      assignee: "David Smith",
      category: "Power",
    },
    {
      id: "TICK-1005",
      title: "HVAC maintenance required in server room",
      priority: "medium",
      status: "in-progress",
      created: "2023-06-09",
      assignee: "Lisa Rodriguez",
      category: "HVAC",
    }
  ];

  const renderPriorityBadge = (priority) => {
    const colors = {
      critical: "bg-red-500 hover:bg-red-600",
      high: "bg-orange-500 hover:bg-orange-600",
      medium: "bg-yellow-500 hover:bg-yellow-600",
      low: "bg-blue-500 hover:bg-blue-600",
    };
    
    return (
      <Badge className={colors[priority]}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  const renderStatusBadge = (status) => {
    const colors = {
      open: "bg-blue-500 hover:bg-blue-600", 
      "in-progress": "bg-yellow-500 hover:bg-yellow-600",
      resolved: "bg-green-500 hover:bg-green-600",
      closed: "bg-gray-500 hover:bg-gray-600",
    };
    
    const label = status === "in-progress" ? "In Progress" : 
                status.charAt(0).toUpperCase() + status.slice(1);
    
    return (
      <Badge className={colors[status]}>
        {label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Exception Management & Issue Resolution</h3>
        <Button 
          size="sm" 
          className="gap-1" 
          onClick={() => setIsTicketDialogOpen(true)}
        >
          <Ticket className="h-4 w-4" />
          Create Ticket
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Active Issues
            </CardTitle>
            <CardDescription>Current unresolved exceptions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7</div>
            <div className="text-xs text-muted-foreground mt-1">2 critical, 3 high, 2 medium</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Average Response Time
            </CardTitle>
            <CardDescription>Time to first response</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1.8h</div>
            <div className="text-xs text-muted-foreground mt-1">5% improvement from last week</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-green-500" />
              Available Technicians
            </CardTitle>
            <CardDescription>Ready to assign</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <div className="text-xs text-muted-foreground mt-1">2 specialists, 3 general</div>
          </CardContent>
        </Card>
      </div>

      <Alert className="bg-amber-50 border-amber-200">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-800">Critical Alert</AlertTitle>
        <AlertDescription className="text-amber-700">
          HVAC system failure detected in Building A Server Room. Automatic ticket TICK-1003 has been created.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Tickets</TabsTrigger>
          <TabsTrigger value="resolved">Resolved Tickets</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Assignee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets
                .filter(ticket => ticket.status !== "resolved")
                .map(ticket => (
                  <TableRow key={ticket.id} className="cursor-pointer hover:bg-muted">
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>{ticket.title}</TableCell>
                    <TableCell>{ticket.category}</TableCell>
                    <TableCell>{renderPriorityBadge(ticket.priority)}</TableCell>
                    <TableCell>{renderStatusBadge(ticket.status)}</TableCell>
                    <TableCell>{ticket.created}</TableCell>
                    <TableCell>{ticket.assignee}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="resolved" className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Assignee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets
                .filter(ticket => ticket.status === "resolved")
                .map(ticket => (
                  <TableRow key={ticket.id} className="cursor-pointer hover:bg-muted">
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>{ticket.title}</TableCell>
                    <TableCell>{ticket.category}</TableCell>
                    <TableCell>{renderPriorityBadge(ticket.priority)}</TableCell>
                    <TableCell>{renderStatusBadge(ticket.status)}</TableCell>
                    <TableCell>{ticket.created}</TableCell>
                    <TableCell>{ticket.assignee}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="knowledge" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Common Troubleshooting
                </CardTitle>
                <CardDescription>Frequently resolved issues</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-blue-500" />
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      Network connectivity troubleshooting
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-blue-500" />
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      Server restart procedures
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-blue-500" />
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      HVAC emergency response
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-blue-500" />
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      Power failure protocols
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Recent Solutions
                </CardTitle>
                <CardDescription>Recently documented resolutions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-green-500" />
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      UPS failure resolution in Building C
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-green-500" />
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      Database connectivity issues fixed
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-green-500" />
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      HVAC filter replacement guide
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-green-500" />
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      Network switch configuration update
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Dialog for creating new tickets */}
      {isTicketDialogOpen && (
        <CreateTicketDialog
          open={isTicketDialogOpen}
          onClose={() => setIsTicketDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default ExceptionModule;
