
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";

interface SubsystemStatus {
  name: string;
  status: string;
}

interface SubsystemStatusCardProps {
  subsystems: SubsystemStatus[];
}

const SubsystemStatusCard = ({ subsystems }: SubsystemStatusCardProps) => {
  const renderStatusIndicator = (status: string) => {
    switch (status) {
      case 'Critical':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case 'Warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'Normal':
        return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="col-span-1 glass">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl">Subsystem Status</CardTitle>
        <CardDescription>Current status of all subsystems</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 pt-2">
          {subsystems.map((system, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between p-3 rounded-md ${
                system.status === 'Critical' ? 'bg-red-500/10' : 
                system.status === 'Warning' ? 'bg-amber-500/10' : 
                'bg-emerald-500/10'
              }`}
            >
              <span className="font-medium">{system.name}</span>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${
                  system.status === 'Critical' ? 'text-destructive' : 
                  system.status === 'Warning' ? 'text-amber-500' : 
                  'text-emerald-500'
                }`}>
                  {system.status}
                </span>
                {renderStatusIndicator(system.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubsystemStatusCard;
