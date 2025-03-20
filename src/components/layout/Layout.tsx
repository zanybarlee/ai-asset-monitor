
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useEffect, useState } from "react";

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <img 
            src="/lovable-uploads/0abd7d98-e706-4129-890b-45430c3eeb00.png"
            alt="Aramco Logo"
            className="h-16 w-16 animate-pulse"
          />
          <div className="w-12 h-12 rounded-full border-4 border-aramco-teal/30 border-t-aramco-teal animate-spin" />
          <span className="text-sm font-medium text-gray-500 animate-pulse">Loading CMMS...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen transition-all duration-300">
        <Header />
        <main className="flex-1 p-4 md:p-6 overflow-auto animate-fade-in">
          <Outlet />
        </main>
        <footer className="py-4 px-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">© 2023 Saudi Aramco</p>
            <div className="aramco-gradient-line w-32 h-1"></div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
