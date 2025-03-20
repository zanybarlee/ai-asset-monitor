
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Header = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    // Update page title based on location
    const path = location.pathname;
    if (path === "/") {
      setPageTitle("Dashboard");
    } else {
      const title = path.substring(1);
      setPageTitle(title.charAt(0).toUpperCase() + title.slice(1));
    }

    // Update time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, [location]);

  const formattedTime = currentTime.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  });
  
  const formattedDate = currentTime.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-sm z-10 sticky top-0 shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="md:hidden" />
          <div className="hidden md:block">
            <h1 className="text-2xl font-semibold tracking-tight">{pageTitle}</h1>
            <p className="text-sm text-muted-foreground">{formattedDate} | {formattedTime}</p>
          </div>
        </div>
        
        <div className="md:hidden">
          <h1 className="text-lg font-semibold tracking-tight">{pageTitle}</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="pl-8 bg-accent/50"
            />
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary animate-pulse-slow" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-2">
                <h3 className="font-medium">Notifications</h3>
                <div className="text-sm text-muted-foreground border rounded-md p-3">
                  No new notifications
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-3">
                <h3 className="font-medium">User Profile</h3>
                <div className="border rounded-md p-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full w-10 h-10 bg-primary text-white grid place-items-center">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Admin User</p>
                      <p className="text-sm text-muted-foreground">admin@example.com</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">Sign out</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;
