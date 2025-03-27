
import { Outlet } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const ProjectManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine the active tab based on the current path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes("/projects/gantt")) return "gantt";
    if (path.includes("/projects/budget")) return "budget";
    if (path.includes("/projects/shutdown")) return "shutdown";
    if (path.includes("/projects/reports")) return "reports";
    return "dashboard";
  };
  
  // If just /projects is visited, redirect to the dashboard subpage
  useEffect(() => {
    if (location.pathname === "/projects") {
      navigate("/projects/dashboard");
    }
  }, [location.pathname, navigate]);

  // Handle tab changes
  const handleTabChange = (value: string) => {
    navigate(`/projects/${value === "dashboard" ? "dashboard" : value}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Project Management</h2>
        <p className="text-muted-foreground">
          Manage complex, multi-phase projects, track budgets, and monitor work orders
        </p>
      </div>
      
      <Card>
        <Tabs
          defaultValue="dashboard"
          value={getActiveTab()}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
            <TabsTrigger value="budget">Budget Tracking</TabsTrigger>
            <TabsTrigger value="shutdown">Shutdown Mgmt</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
        </Tabs>
      </Card>
      
      <Outlet />
    </div>
  );
};

export default ProjectManagement;
