
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DailyOperations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to tasks by default if we're on the root path
    if (location.pathname === "/operations") {
      navigate("/operations/tasks", { replace: true });
    }
  }, [location.pathname, navigate]);

  // Determine which tab should be active based on the URL path
  const getActiveTab = () => {
    if (location.pathname.includes('/tasks')) return 'tasks';
    if (location.pathname.includes('/reporting')) return 'reporting';
    return 'tasks'; // Default to tasks tab
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Daily Operations & Inspection Module</h2>
        <p className="text-muted-foreground">
          Task automation, workflow management, and scheduled reporting for facility operations
        </p>
      </div>

      <Tabs defaultValue="tasks" value={getActiveTab()} className="space-y-4">
        <TabsList>
          <TabsTrigger value="tasks" asChild>
            <Link to="/operations/tasks">Task & Workflow</Link>
          </TabsTrigger>
          <TabsTrigger value="reporting" asChild>
            <Link to="/operations/reporting">Scheduled Reporting</Link>
          </TabsTrigger>
        </TabsList>
        <div className="pt-4">
          <Outlet />
        </div>
      </Tabs>
    </div>
  );
};

export default DailyOperations;
