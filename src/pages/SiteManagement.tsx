
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SiteManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to MEP evaluation by default if we're on the root path
    if (location.pathname === "/sitemanagement") {
      navigate("/sitemanagement/mep", { replace: true });
    }
  }, [location.pathname, navigate]);

  // Determine which tab should be active based on the URL path
  const getActiveTab = () => {
    if (location.pathname.includes('/mep')) return 'mep';
    if (location.pathname.includes('/digitaltwin')) return 'digitaltwin';
    if (location.pathname.includes('/inventory')) return 'inventory';
    return 'mep'; // Default to MEP tab
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Site Management & Server Provisioning</h2>
        <p className="text-muted-foreground">
          Comprehensive tools for site management, digital twin integration, and inventory tracking
        </p>
      </div>

      <Tabs defaultValue="mep" value={getActiveTab()} className="space-y-4">
        <TabsList>
          <TabsTrigger value="mep" asChild>
            <Link to="/sitemanagement/mep">MEP Evaluation</Link>
          </TabsTrigger>
          <TabsTrigger value="digitaltwin" asChild>
            <Link to="/sitemanagement/digitaltwin">Digital Twin</Link>
          </TabsTrigger>
          <TabsTrigger value="inventory" asChild>
            <Link to="/sitemanagement/inventory">Provisioning & Inventory</Link>
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
