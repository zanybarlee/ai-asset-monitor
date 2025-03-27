
import { Outlet } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PeopleManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Redirect to directory if no sub-route is selected
  useEffect(() => {
    if (location.pathname === "/people") {
      navigate("/people/directory");
    }
  }, [location.pathname, navigate]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">People Management</h2>
        <p className="text-muted-foreground">
          Manage your workforce, skills, certifications, and safety compliance
        </p>
      </div>
      
      <NavigationMenu className="max-w-full w-full justify-start">
        <NavigationMenuList className="flex gap-4 border-b w-full">
          <NavigationMenuItem>
            <Link 
              to="/people/directory" 
              className={`px-3 py-2 text-sm font-medium hover:text-primary ${
                location.pathname.includes("/directory") ? "border-b-2 border-primary text-primary" : ""
              }`}
            >
              Directory
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link 
              to="/people/training" 
              className={`px-3 py-2 text-sm font-medium hover:text-primary ${
                location.pathname.includes("/training") ? "border-b-2 border-primary text-primary" : ""
              }`}
            >
              Training & Certifications
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link 
              to="/people/scheduling" 
              className={`px-3 py-2 text-sm font-medium hover:text-primary ${
                location.pathname.includes("/scheduling") ? "border-b-2 border-primary text-primary" : ""
              }`}
            >
              Scheduling
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link 
              to="/people/safety" 
              className={`px-3 py-2 text-sm font-medium hover:text-primary ${
                location.pathname.includes("/safety") ? "border-b-2 border-primary text-primary" : ""
              }`}
            >
              Safety & Compliance
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      <Outlet />
    </div>
  );
};

export default PeopleManagement;
