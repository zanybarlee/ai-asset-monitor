
import { useState, useEffect } from "react";
import {
  DashboardHeader,
  SystemHealthCard,
  ResourceUsageCard,
  SubsystemStatusCard,
  WorkOrderSummary
} from "@/components/dashboard";
import ChartTabs from "@/components/dashboard/chart-tabs";

// Placeholder data for charts and stats
const mockData = {
  systemHealth: 92,
  criticalAlerts: 2,
  warnings: 5,
  normal: 143,
  cpuUsage: 68,
  memoryUsage: 72,
  diskUsage: 45,
  temperature: 23.5,
  humidity: 42,
  powerConsumption: 456,
  temperatureHistory: [
    { time: '00:00', value: 22.4 },
    { time: '04:00', value: 21.8 },
    { time: '08:00', value: 22.7 },
    { time: '12:00', value: 24.5 },
    { time: '16:00', value: 23.2 },
    { time: '20:00', value: 22.8 },
    { time: '24:00', value: 23.5 },
  ],
  resourceUtilization: [
    { name: 'CPU', value: 68 },
    { name: 'Memory', value: 72 },
    { name: 'Disk', value: 45 },
    { name: 'Network', value: 37 },
  ],
  subsystemStatus: [
    { name: 'HVAC', status: 'Normal' },
    { name: 'Electrical', status: 'Warning' },
    { name: 'Fire Safety', status: 'Normal' },
    { name: 'Security', status: 'Normal' },
    { name: 'Cooling', status: 'Critical' },
  ]
};

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    // Update time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <DashboardHeader refreshing={refreshing} onRefresh={handleRefresh} />

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SystemHealthCard 
          systemHealth={mockData.systemHealth}
          criticalAlerts={mockData.criticalAlerts}
          warnings={mockData.warnings}
          normal={mockData.normal}
        />
        
        <ResourceUsageCard 
          cpuUsage={mockData.cpuUsage}
          memoryUsage={mockData.memoryUsage}
          temperature={mockData.temperature}
          humidity={mockData.humidity}
          powerConsumption={mockData.powerConsumption}
        />
        
        <SubsystemStatusCard subsystems={mockData.subsystemStatus} />
      </div>

      {/* Charts & Analytics */}
      <ChartTabs 
        temperatureData={mockData.temperatureHistory}
        resourceData={mockData.resourceUtilization}
      />
      
      {/* Work Order Summary */}
      <WorkOrderSummary />
    </div>
  );
};

export default Dashboard;
