
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, FileText, ClockCountdown, AlertTriangle } from "lucide-react";
import { WarrantyMetrics } from "./types";

interface MetricsCardsProps {
  metrics: WarrantyMetrics;
}

const MetricsCards = ({ metrics }: MetricsCardsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Warranties</CardTitle>
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.activeWarranties}</div>
          <p className="text-xs text-muted-foreground">
            {metrics.expiringWarranties} expiring soon
          </p>
          <div className="mt-2 h-1 w-full bg-muted overflow-hidden rounded">
            <div 
              className="h-full bg-emerald-500" 
              style={{ width: `${(metrics.activeWarranties / (metrics.activeWarranties + metrics.expiredWarranties)) * 100}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Warranty Claims</CardTitle>
          <FileText className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.pendingClaims}</div>
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <span>{metrics.approvedClaims} approved</span>
            <span>{metrics.deniedClaims} denied</span>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-xs font-medium">Success Rate</span>
            <div className="ml-auto text-xs">{metrics.claimSuccessRate}%</div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
          <AlertTriangle className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(metrics.totalSavings)}</div>
          <p className="text-xs text-muted-foreground">
            Via approved warranty claims
          </p>
          <div className="mt-2 h-1 w-full bg-muted overflow-hidden rounded">
            <div 
              className="h-full bg-amber-500" 
              style={{ width: `${metrics.coverageCompleteness}%` }}
            ></div>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {metrics.coverageCompleteness}% coverage completeness
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Resolution Time</CardTitle>
          <ClockCountdown className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.avgResolutionDays} days</div>
          <p className="text-xs text-muted-foreground">
            Average claim resolution time
          </p>
          <div className="mt-2 flex items-center text-xs">
            <span>{metrics.approvedClaims + metrics.deniedClaims} resolved claims</span>
            <span className="ml-auto">{metrics.pendingClaims} pending</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsCards;
