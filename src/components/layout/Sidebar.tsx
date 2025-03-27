
import { useLocation, NavLink } from "react-router-dom";
import { LayoutDashboard, Box, Clipboard, History, Users, Clock, Settings, ChevronLeft, ChevronRight, Server, Zap, CalendarCheck, Database, MapPin, ListChecks, UserCheck, CalendarRange, FolderSymlink, ShieldCheck, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sidebar as ShadcnSidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Planning & Scheduling", href: "/planning", icon: CalendarRange },
    { name: "Project Management", href: "/projects", icon: FolderSymlink },
    { name: "Assets", href: "/assets", icon: Box },
    { name: "Work Orders", href: "/workorders", icon: Clipboard },
    { name: "Maintenance", href: "/maintenance", icon: History },
    { name: "Inventory Management", href: "/sitemanagement/inventory", icon: Package },
    { name: "Warranty Management", href: "/warranty", icon: ShieldCheck },
    { name: "Workflows", href: "/workflows", icon: ListChecks },
    { name: "Daily Operations", href: "/operations", icon: CalendarCheck },
    { name: "Historical Data", href: "/historical", icon: Database },
    { name: "Location Management", href: "/locations", icon: MapPin },
    { name: "Site Management", href: "/sitemanagement", icon: Server },
    { name: "Power Management", href: "/power", icon: Zap },
    { name: "People Management", href: "/people", icon: UserCheck },
    { name: "Visitors", href: "/visitors", icon: Clock },
    { name: "Users", href: "/users", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <ShadcnSidebar className={cn(
      "bg-aramco-black border-r border-aramco-darkGray transition-all duration-300 ease-in-out",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <SidebarHeader className="flex h-16 items-center px-4 border-b border-aramco-darkGray relative">
        <div className={cn(
          "flex items-center gap-2 transition-opacity duration-300",
          isCollapsed ? "opacity-0" : "opacity-100"
        )}>
          <img 
            src="/lovable-uploads/0abd7d98-e706-4129-890b-45430c3eeb00.png" 
            alt="Aramco Logo" 
            className="h-8 w-8"
          />
          <span className="text-xl font-semibold tracking-tight text-white">ARAMCO CMMS</span>
        </div>
        
        <div className={cn(
          "absolute",
          isCollapsed ? "left-1/2 -translate-x-1/2" : "right-3"
        )}>
          <button 
            onClick={toggleSidebar} 
            className="text-white hover:bg-aramco-darkGray p-1.5 rounded-full transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </SidebarHeader>
      <div className="aramco-gradient-line"></div>
      
      <SidebarContent className="py-4">
        <nav className={cn("space-y-1", isCollapsed ? "px-2" : "px-3")}>
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== "/" && location.pathname.startsWith(item.href));
              
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
                    isActive 
                      ? "bg-aramco-teal text-white" 
                      : "text-gray-300 hover:bg-aramco-darkGray hover:text-white",
                    isCollapsed && "justify-center px-2"
                  )
                }
                title={item.name}
              >
                <item.icon className={cn("h-5 w-5", isCollapsed && "mx-auto")} />
                {!isCollapsed && (
                  <>
                    <span>{item.name}</span>
                    {isActive && (
                      <ChevronRight className="ml-auto h-4 w-4" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </SidebarContent>
      
      <SidebarFooter className={cn("p-4 border-t border-aramco-darkGray", isCollapsed && "p-2")}>
        <div className={cn(
          "p-3 text-xs text-center rounded-md bg-aramco-darkGray text-gray-300",
          isCollapsed && "p-2"
        )}>
          {!isCollapsed ? (
            <>
              <p className="font-medium">CMMS System v1.0</p>
              <p className="mt-1 text-gray-400">© 2023 Aramco</p>
            </>
          ) : (
            <p className="font-medium">v1.0</p>
          )}
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  );
};

export default Sidebar;
