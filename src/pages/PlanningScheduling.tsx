
import { Outlet } from "react-router-dom";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PlanningScheduling = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Redirect to dashboard if no sub-route is selected
  useEffect(() => {
    if (location.pathname === "/planning") {
      navigate("/planning/dashboard");
    }
  }, [location.pathname, navigate]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Planning & Scheduling</h2>
        <p className="text-muted-foreground">
          Plan, schedule, and optimize preventive and corrective maintenance work
        </p>
      </div>
      
      <NavigationMenu className="max-w-full w-full justify-start">
        <NavigationMenuList className="flex gap-4 border-b w-full">
          <NavigationMenuItem>
            <Link 
              to="/planning/dashboard" 
              className={`px-3 py-2 text-sm font-medium hover:text-primary ${
                location.pathname.includes("/dashboard") ? "border-b-2 border-primary text-primary" : ""
              }`}
            >
              Dashboard
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link 
              to="/planning/scheduler" 
              className={`px-3 py-2 text-sm font-medium hover:text-primary ${
                location.pathname.includes("/scheduler") ? "border-b-2 border-primary text-primary" : ""
              }`}
            >
              Scheduler
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link 
              to="/planning/backlog" 
              className={`px-3 py-2 text-sm font-medium hover:text-primary ${
                location.pathname.includes("/backlog") ? "border-b-2 border-primary text-primary" : ""
              }`}
            >
              Backlog Management
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link 
              to="/planning/resources" 
              className={`px-3 py-2 text-sm font-medium hover:text-primary ${
                location.pathname.includes("/resources") ? "border-b-2 border-primary text-primary" : ""
              }`}
            >
              Resource Optimization
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link 
              to="/planning/reports" 
              className={`px-3 py-2 text-sm font-medium hover:text-primary ${
                location.pathname.includes("/reports") ? "border-b-2 border-primary text-primary" : ""
              }`}
            >
              Reports & Analytics
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      <Outlet />
    </div>
  );
};

export default PlanningScheduling;
