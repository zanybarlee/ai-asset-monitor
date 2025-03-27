
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
import LocationManagement from "@/pages/LocationManagement";
import SiteManagement from "@/pages/SiteManagement";
import MEPEvaluation from "@/pages/site-management/MEPEvaluation";
import DigitalTwin from "@/pages/site-management/DigitalTwin";
import InventoryManagement from "@/pages/InventoryManagement"; // Updated import path
import ProvisioningWorkflows from "@/pages/site-management/ProvisioningWorkflows";
import PowerManagement from "@/pages/PowerManagement";
import RealTimeMonitoring from "@/pages/power-management/RealTimeMonitoring";
import AutomatedReporting from "@/pages/power-management/AutomatedReporting";
import InfrastructureManagement from "@/pages/power-management/InfrastructureManagement";
import DailyOperations from "@/pages/DailyOperations";
import TaskWorkflow from "@/pages/daily-operations/TaskWorkflow";
import Compliance from "@/pages/daily-operations/Compliance";
import ScheduledReporting from "@/pages/daily-operations/ScheduledReporting";
import HistoricalData from "@/pages/HistoricalData";
import DataRepository from "@/pages/historical-data/DataRepository";
import AuditTrails from "@/pages/historical-data/AuditTrails";
import Workflows from "@/pages/Workflows";
import PeopleManagement from "@/pages/PeopleManagement";
import Directory from "@/pages/people-management/Directory";
import Training from "@/pages/people-management/Training";
import Scheduling from "@/pages/people-management/Scheduling";
import Safety from "@/pages/people-management/Safety";
import PlanningScheduling from "@/pages/PlanningScheduling";
import PlanningDashboard from "@/pages/planning-scheduling/Dashboard";
import Scheduler from "@/pages/planning-scheduling/Scheduler";
import BacklogManagement from "@/pages/planning-scheduling/BacklogManagement";
import ResourceOptimization from "@/pages/planning-scheduling/ResourceOptimization";
import ReportsAnalytics from "@/pages/planning-scheduling/ReportsAnalytics";
import ProjectManagement from "@/pages/ProjectManagement";
import ProjectDashboard from "@/pages/project-management/Dashboard";
import ProjectGantt from "@/pages/project-management/ProjectGantt";
import BudgetTracking from "@/pages/project-management/BudgetTracking";
import ShutdownManagement from "@/pages/project-management/ShutdownManagement";
import ProjectReports from "@/pages/project-management/ProjectReports";
import WarrantyManagement from "@/pages/WarrantyManagement";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <SidebarProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="assets" element={<Assets />} />
              <Route path="workorders" element={<WorkOrders />} />
              <Route path="maintenance" element={<Maintenance />} />
              <Route path="warranty" element={<WarrantyManagement />} />
              <Route path="workflows" element={<Workflows />} />
              <Route path="users" element={<Users />} />
              <Route path="visitors" element={<Visitors />} />
              <Route path="settings" element={<Settings />} />
              <Route path="locations" element={<LocationManagement />} />
              <Route path="inventory" element={<InventoryManagement />} /> {/* New top-level route */}
              <Route path="sitemanagement" element={<SiteManagement />}>
                <Route path="mep" element={<MEPEvaluation />} />
                <Route path="digitaltwin" element={<DigitalTwin />} />
                <Route path="provisioning" element={<ProvisioningWorkflows />} />
              </Route>
              <Route path="power" element={<PowerManagement />}>
                <Route path="monitoring" element={<RealTimeMonitoring />} />
                <Route path="reporting" element={<AutomatedReporting />} />
                <Route path="infrastructure" element={<InfrastructureManagement />} />
              </Route>
              <Route path="operations" element={<DailyOperations />}>
                <Route path="tasks" element={<TaskWorkflow />} />
                <Route path="compliance" element={<Compliance />} />
                <Route path="reporting" element={<ScheduledReporting />} />
              </Route>
              <Route path="historical" element={<HistoricalData />}>
                <Route path="repository" element={<DataRepository />} />
                <Route path="audit" element={<AuditTrails />} />
              </Route>
              <Route path="people" element={<PeopleManagement />}>
                <Route path="directory" element={<Directory />} />
                <Route path="training" element={<Training />} />
                <Route path="scheduling" element={<Scheduling />} />
                <Route path="safety" element={<Safety />} />
              </Route>
              <Route path="planning" element={<PlanningScheduling />}>
                <Route path="dashboard" element={<PlanningDashboard />} />
                <Route path="scheduler" element={<Scheduler />} />
                <Route path="backlog" element={<BacklogManagement />} />
                <Route path="resources" element={<ResourceOptimization />} />
                <Route path="reports" element={<ReportsAnalytics />} />
              </Route>
              <Route path="projects" element={<ProjectManagement />}>
                <Route path="dashboard" element={<ProjectDashboard />} />
                <Route path="gantt" element={<ProjectGantt />} />
                <Route path="budget" element={<BudgetTracking />} />
                <Route path="shutdown" element={<ShutdownManagement />} />
                <Route path="reports" element={<ProjectReports />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </SidebarProvider>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
