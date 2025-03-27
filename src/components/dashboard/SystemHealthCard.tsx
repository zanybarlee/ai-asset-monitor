
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, AlertTriangle, CheckCircle2, Download } from "lucide-react";

interface SystemHealthCardProps {
  systemHealth: number;
  criticalAlerts: number;
  warnings: number;
  normal: number;
  onExport: (type: string) => void;
}

const SystemHealthCard = ({
  systemHealth,
  criticalAlerts,
  warnings,
  normal,
  onExport
}: SystemHealthCardProps) => {
  return (
    <Card className="glass col-span-1">
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-2xl">System Health</CardTitle>
          <CardDescription>Overall health score based on all systems</CardDescription>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onExport("systemStats")}
          className="h-8 w-8"
        >
          <Download className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-4">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle 
                className="text-muted stroke-current" 
                strokeWidth="10" 
                cx="50" 
                cy="50" 
                r="40" 
                fill="none"
              />
              <circle 
                className="text-primary stroke-current" 
                strokeWidth="10" 
                cx="50" 
                cy="50" 
                r="40" 
                fill="none" 
                strokeLinecap="round" 
                strokeDasharray={`${2 * Math.PI * 40 * systemHealth / 100} ${2 * Math.PI * 40 * (1 - systemHealth / 100)}`}
                strokeDashoffset={2 * Math.PI * 40 * 0.25}
                style={{ transition: "stroke-dasharray 0.5s ease" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-bold">{systemHealth}%</span>
              <span className="text-sm text-muted-foreground">Health Score</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col items-center p-2 rounded-md bg-red-500/10">
            <AlertCircle className="h-5 w-5 text-destructive mb-1" />
            <span className="text-xs font-medium">Critical</span>
            <span className="text-lg font-bold">{criticalAlerts}</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-md bg-amber-500/10">
            <AlertTriangle className="h-5 w-5 text-amber-500 mb-1" />
            <span className="text-xs font-medium">Warnings</span>
            <span className="text-lg font-bold">{warnings}</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-md bg-emerald-500/10">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 mb-1" />
            <span className="text-xs font-medium">Normal</span>
            <span className="text-lg font-bold">{normal}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SystemHealthCard;
