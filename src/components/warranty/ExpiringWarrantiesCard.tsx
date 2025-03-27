
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Warranty } from "./types";
import { Button } from "@/components/ui/button";
import { CalendarDays, Timer } from "lucide-react";

interface ExpiringWarrantiesCardProps {
  warranties: Warranty[];
  onViewDetails: (warrantyId: string) => void;
}

const ExpiringWarrantiesCard = ({ warranties, onViewDetails }: ExpiringWarrantiesCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (expirationDate: string) => {
    const expDate = new Date(expirationDate);
    const today = new Date();
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Filter for warranties that are expiring soon and sort by expiration date
  const expiringWarranties = warranties
    .filter(w => w.status === 'Expiring Soon')
    .sort((a, b) => {
      const daysA = getDaysRemaining(a.expirationDate);
      const daysB = getDaysRemaining(b.expirationDate);
      return daysA - daysB;
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Timer className="h-5 w-5 mr-2 text-amber-500" />
          Expiring Warranties
        </CardTitle>
        <CardDescription>Warranties that require attention soon</CardDescription>
      </CardHeader>
      <CardContent>
        {expiringWarranties.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No warranties expiring soon
          </div>
        ) : (
          <div className="space-y-4">
            {expiringWarranties.map((warranty) => {
              const daysRemaining = getDaysRemaining(warranty.expirationDate);
              
              return (
                <div key={warranty.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div className="space-y-1">
                    <div className="font-medium">{warranty.assetName}</div>
                    <div className="text-sm text-muted-foreground">{warranty.coverageType} Coverage</div>
                    <div className="flex items-center text-sm">
                      <CalendarDays className="h-3 w-3 mr-1" />
                      <span>Expires {formatDate(warranty.expirationDate)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-amber-500">
                      {daysRemaining} days left
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => onViewDetails(warranty.id)}
                      className="mt-1"
                    >
                      View
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpiringWarrantiesCard;
