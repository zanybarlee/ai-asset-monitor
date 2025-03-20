
import { useLocation, NavLink } from "react-router-dom";
import { LayoutDashboard, Box, Clipboard, History, Users, Clock, Settings, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sidebar as ShadcnSidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";

const Sidebar = () => {
  const location = useLocation();
  
  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Assets", href: "/assets", icon: Box },
    { name: "Work Orders", href: "/workorders", icon: Clipboard },
    { name: "Maintenance", href: "/maintenance", icon: History },
    { name: "Users", href: "/users", icon: Users },
    { name: "Visitors", href: "/visitors", icon: Clock },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <ShadcnSidebar className="bg-aramco-black border-r border-aramco-darkGray">
      <SidebarHeader className="flex h-16 items-center px-4 border-b border-aramco-darkGray">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/0abd7d98-e706-4129-890b-45430c3eeb00.png" 
            alt="Aramco Logo" 
            className="h-8 w-8"
          />
          <span className="text-xl font-semibold tracking-tight text-white">ARAMCO CMMS</span>
        </div>
      </SidebarHeader>
      <div className="aramco-gradient-line"></div>
      <SidebarContent className="py-4">
        <nav className="space-y-1 px-3">
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
                      : "text-gray-300 hover:bg-aramco-darkGray hover:text-white"
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
                {isActive && (
                  <ChevronRight className="ml-auto h-4 w-4" />
                )}
              </NavLink>
            );
          })}
        </nav>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-aramco-darkGray">
        <div className="p-3 text-xs text-center rounded-md bg-aramco-darkGray text-gray-300">
          <p className="font-medium">CMMS System v1.0</p>
          <p className="mt-1 text-gray-400">© 2023 Aramco</p>
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  );
};

export default Sidebar;
