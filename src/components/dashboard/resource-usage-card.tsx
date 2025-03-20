
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Cpu, Activity, Thermometer, Droplets, Zap } from "lucide-react";

interface ResourceUsageCardProps {
  cpuUsage: number;
  memoryUsage: number;
  temperature: number;
  humidity: number;
  powerConsumption: number;
}

const ResourceUsageCard = ({ 
  cpuUsage, 
  memoryUsage, 
  temperature, 
  humidity, 
  powerConsumption 
}: ResourceUsageCardProps) => {
  return (
    <Card className="col-span-1 glass">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl">Resource Usage</CardTitle>
        <CardDescription>Current utilization of system resources</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <Cpu className="h-4 w-4" /> CPU Usage
            </span>
            <span className="text-sm font-medium">{cpuUsage}%</span>
          </div>
          <Progress value={cpuUsage} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" /> Memory Usage
            </span>
            <span className="text-sm font-medium">{memoryUsage}%</span>
          </div>
          <Progress value={memoryUsage} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <Thermometer className="h-4 w-4" /> Temperature
            </span>
            <span className="text-sm font-medium">{temperature}°C</span>
          </div>
          <Progress 
            value={((temperature - 20) / 15) * 100} 
            className="h-2" 
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <Droplets className="h-4 w-4" /> Humidity
            </span>
            <span className="text-sm font-medium">{humidity}%</span>
          </div>
          <Progress value={humidity} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4" /> Power Consumption
            </span>
            <span className="text-sm font-medium">{powerConsumption} kW</span>
          </div>
          <Progress 
            value={(powerConsumption / 600) * 100} 
            className="h-2" 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceUsageCard;
