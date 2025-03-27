
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WarrantyClaim } from "./types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface RecentClaimsCardProps {
  claims: WarrantyClaim[];
  onViewClaim: (claimId: string) => void;
}

const RecentClaimsCard = ({ claims, onViewClaim }: RecentClaimsCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'Submitted':
        return <Badge className="bg-blue-500">Submitted</Badge>;
      case 'Under Review':
        return <Badge className="bg-amber-500">Under Review</Badge>;
      case 'Approved':
        return <Badge className="bg-emerald-500">Approved</Badge>;
      case 'Denied':
        return <Badge variant="destructive">Denied</Badge>;
      case 'Closed':
        return <Badge variant="secondary">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Sort claims by date, most recent first
  const recentClaims = [...claims]
    .sort((a, b) => {
      return new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime();
    })
    .slice(0, 4);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2 text-blue-500" />
          Recent Claims
        </CardTitle>
        <CardDescription>Latest warranty claims activity</CardDescription>
      </CardHeader>
      <CardContent>
        {recentClaims.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No claims submitted recently
          </div>
        ) : (
          <div className="space-y-4">
            {recentClaims.map((claim) => (
              <div key={claim.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div className="space-y-1">
                  <div className="font-medium flex items-center gap-2">
                    {claim.id} {getStatusBadge(claim.status)}
                  </div>
                  <div className="text-sm">{claim.assetName}</div>
                  <div className="text-sm text-muted-foreground">
                    Submitted {formatDate(claim.dateSubmitted)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">
                    {formatCurrency(claim.estimatedValue)}
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => onViewClaim(claim.id)}
                    className="mt-1"
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentClaimsCard;
