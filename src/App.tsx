
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Layout from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import Assets from "@/pages/Assets";
import WorkOrders from "@/pages/WorkOrders";
import Maintenance from "@/pages/Maintenance";
import Users from "@/pages/Users";
import Visitors from "@/pages/Visitors";
import Settings from "@/pages/Settings";
import SiteManagement from "@/pages/SiteManagement";
import MEPEvaluation from "@/pages/site-management/MEPEvaluation";
import DigitalTwin from "@/pages/site-management/DigitalTwin";
import InventoryManagement from "@/pages/site-management/InventoryManagement";
import PowerManagement from "@/pages/PowerManagement";
import RealTimeMonitoring from "@/pages/power-management/RealTimeMonitoring";
import AutomatedReporting from "@/pages/power-management/AutomatedReporting";
import InfrastructureManagement from "@/pages/power-management/InfrastructureManagement";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="assets" element={<Assets />} />
              <Route path="workorders" element={<WorkOrders />} />
              <Route path="maintenance" element={<Maintenance />} />
              <Route path="users" element={<Users />} />
              <Route path="visitors" element={<Visitors />} />
              <Route path="settings" element={<Settings />} />
              <Route path="sitemanagement" element={<SiteManagement />}>
                <Route path="mep" element={<MEPEvaluation />} />
                <Route path="digitaltwin" element={<DigitalTwin />} />
                <Route path="inventory" element={<InventoryManagement />} />
              </Route>
              <Route path="power" element={<PowerManagement />}>
                <Route path="monitoring" element={<RealTimeMonitoring />} />
                <Route path="reporting" element={<AutomatedReporting />} />
                <Route path="infrastructure" element={<InfrastructureManagement />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
