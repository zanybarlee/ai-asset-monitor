
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, UserPlus } from "lucide-react";

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Administrator",
    department: "IT Operations",
    lastActive: "2023-08-12T09:45:00",
    status: "Active"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Technician",
    department: "Maintenance",
    lastActive: "2023-08-12T10:30:00",
    status: "Active"
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    email: "michael.r@example.com",
    role: "Manager",
    department: "Facilities Management",
    lastActive: "2023-08-11T16:20:00",
    status: "Active"
  },
  {
    id: 4,
    name: "Emily Chen",
    email: "emily.chen@example.com",
    role: "Security Officer",
    department: "Security",
    lastActive: "2023-08-12T08:15:00",
    status: "Active"
  },
  {
    id: 5,
    name: "Alex Thompson",
    email: "alex.t@example.com",
    role: "Technician",
    department: "Electrical",
    lastActive: "2023-08-10T14:45:00",
    status: "Inactive"
  }
];

const Users = () => {
  const getStatusBadge = (status: string) => {
    return status === "Active" ? 
      <Badge className="bg-emerald-500">{status}</Badge> : 
      <Badge variant="outline">{status}</Badge>;
  };
  
  const formatLastActive = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">
            Manage users and access permissions
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass md:col-span-3">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>User Directory</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search users..." className="pl-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <div className="grid grid-cols-6 bg-muted/50 p-3 text-sm font-medium">
                <div className="col-span-2">User</div>
                <div>Role</div>
                <div>Department</div>
                <div>Last Active</div>
                <div>Status</div>
              </div>
              
              <div className="divide-y">
                {mockUsers.map((user) => (
                  <div key={user.id} className="grid grid-cols-6 p-3 text-sm items-center">
                    <div className="col-span-2">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                    <div>{user.role}</div>
                    <div>{user.department}</div>
                    <div>{formatLastActive(user.lastActive)}</div>
                    <div>{getStatusBadge(user.status)}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle>User Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-3 flex flex-col items-center">
                <span className="text-3xl font-bold text-primary">5</span>
                <span className="text-sm text-muted-foreground">Total Users</span>
              </div>
              
              <div className="border rounded-md p-3 flex flex-col items-center">
                <span className="text-3xl font-bold text-emerald-500">4</span>
                <span className="text-sm text-muted-foreground">Active</span>
              </div>
              
              <div className="border rounded-md p-3 flex flex-col items-center">
                <span className="text-3xl font-bold text-muted-foreground">1</span>
                <span className="text-sm text-muted-foreground">Inactive</span>
              </div>
              
              <div className="pt-4">
                <h3 className="font-medium mb-2">User Roles</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Administrators</span>
                    <span>1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Managers</span>
                    <span>1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Technicians</span>
                    <span>2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Security Officers</span>
                    <span>1</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Users;
