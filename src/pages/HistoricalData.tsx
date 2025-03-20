
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HistoricalData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to repository by default if we're on the root path
    if (location.pathname === "/historical") {
      navigate("/historical/repository", { replace: true });
    }
  }, [location.pathname, navigate]);

  // Determine which tab should be active based on the URL path
  const getActiveTab = () => {
    if (location.pathname.includes('/repository')) return 'repository';
    if (location.pathname.includes('/audit')) return 'audit';
    return 'repository'; // Default to repository tab
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Historical Data & Analytics Module</h2>
        <p className="text-muted-foreground">
          Data repository, AI-driven analytics, and comprehensive audit trails for operational insights
        </p>
      </div>

      <Tabs defaultValue="repository" value={getActiveTab()} className="space-y-4">
        <TabsList>
          <TabsTrigger value="repository" asChild>
            <Link to="/historical/repository">Data Repository</Link>
          </TabsTrigger>
          <TabsTrigger value="audit" asChild>
            <Link to="/historical/audit">Audit Trails</Link>
          </TabsTrigger>
        </TabsList>
        <div className="pt-4">
          <Outlet />
        </div>
      </Tabs>
    </div>
  );
};

export default HistoricalData;
