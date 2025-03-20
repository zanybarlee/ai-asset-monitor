
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PowerManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to monitoring by default if we're on the root path
    if (location.pathname === "/power") {
      navigate("/power/monitoring", { replace: true });
    }
  }, [location.pathname, navigate]);

  // Determine which tab should be active based on the URL path
  const getActiveTab = () => {
    if (location.pathname.includes('/monitoring')) return 'monitoring';
    if (location.pathname.includes('/reporting')) return 'reporting';
    if (location.pathname.includes('/infrastructure')) return 'infrastructure';
    return 'monitoring'; // Default to monitoring tab
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Power Management Module</h2>
        <p className="text-muted-foreground">
          Real-time monitoring, analytics and infrastructure management for data center power systems
        </p>
      </div>

      <Tabs defaultValue="monitoring" value={getActiveTab()} className="space-y-4">
        <TabsList>
          <TabsTrigger value="monitoring" asChild>
            <Link to="/power/monitoring">Real-Time Monitoring</Link>
          </TabsTrigger>
          <TabsTrigger value="reporting" asChild>
            <Link to="/power/reporting">Automated Reporting</Link>
          </TabsTrigger>
          <TabsTrigger value="infrastructure" asChild>
            <Link to="/power/infrastructure">Infrastructure Integration</Link>
          </TabsTrigger>
        </TabsList>
        <div className="pt-4">
          <Outlet />
        </div>
      </Tabs>
    </div>
  );
};

export default PowerManagement;
