
import { useLocation, NavLink } from "react-router-dom";
import { LayoutDashboard, Box, Clipboard, History, Users, Clock, Settings } from "lucide-react";
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
    <ShadcnSidebar>
      <SidebarHeader className="flex h-16 items-center px-4 border-b">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-primary p-1.5">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 22V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 6L12 10L4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 14L12 18L20 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 10V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-xl font-semibold tracking-tight">ARAMCO CMMS</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="py-4">
        <nav className="space-y-1.5 px-3">
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
                      ? "bg-primary text-primary-foreground" 
                      : "text-foreground hover:bg-muted"
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                )}
              </NavLink>
            );
          })}
        </nav>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="p-3 text-xs text-center rounded-md bg-secondary text-secondary-foreground">
          <p className="font-medium">CMMS System v1.0</p>
          <p className="mt-1 text-muted-foreground">© 2023 Aramco</p>
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  );
};

export default Sidebar;
