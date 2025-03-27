
import { Progress } from "@/components/ui/progress";

interface AssetHealthIndicatorProps {
  health: number;
}

const AssetHealthIndicator = ({ health }: AssetHealthIndicatorProps) => {
  const getHealthColor = (health: number) => {
    if (health >= 85) return "text-emerald-500";
    if (health >= 60) return "text-amber-500";
    return "text-destructive";
  };

  return (
    <div className="flex items-center gap-2">
      <span className={getHealthColor(health)}>{health}%</span>
      <Progress 
        value={health} 
        className="h-2 w-20"
        style={{
          background: health >= 85 ? 'rgba(16, 185, 129, 0.2)' :
                    health >= 60 ? 'rgba(245, 158, 11, 0.2)' : 
                    'rgba(239, 68, 68, 0.2)',
          color: health >= 85 ? 'rgb(16, 185, 129)' :
                  health >= 60 ? 'rgb(245, 158, 11)' : 
                  'rgb(239, 68, 68)'
        }}
      />
    </div>
  );
};

export default AssetHealthIndicator;
