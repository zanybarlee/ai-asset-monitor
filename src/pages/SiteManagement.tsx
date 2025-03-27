
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SiteManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to provisioning by default if we're on the root path
    if (location.pathname === "/sitemanagement") {
      navigate("/sitemanagement/provisioning", { replace: true });
    }
  }, [location.pathname, navigate]);

  // Determine which tab should be active based on the URL path
  const getActiveTab = () => {
    if (location.pathname.includes('/provisioning')) return 'provisioning';
    if (location.pathname.includes('/mep')) return 'mep';
    if (location.pathname.includes('/digitaltwin')) return 'digitaltwin';
    return 'provisioning'; // Default to Provisioning tab
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Site Management & Server Provisioning</h2>
        <p className="text-muted-foreground">
          Comprehensive tools for site management, digital twin integration, and server provisioning
        </p>
      </div>

      <Tabs defaultValue="provisioning" value={getActiveTab()} className="space-y-4">
        <TabsList>
          <TabsTrigger value="provisioning" asChild>
            <Link to="/sitemanagement/provisioning">Provisioning Workflows</Link>
          </TabsTrigger>
          <TabsTrigger value="mep" asChild>
            <Link to="/sitemanagement/mep">MEP Evaluation</Link>
          </TabsTrigger>
          <TabsTrigger value="digitaltwin" asChild>
            <Link to="/sitemanagement/digitaltwin">Digital Twin</Link>
          </TabsTrigger>
        </TabsList>
        <div className="pt-4">
          <Outlet />
        </div>
      </Tabs>
    </div>
  );
};

export default SiteManagement;
