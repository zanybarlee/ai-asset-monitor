
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, QrCode, UserCheck, Calendar, History } from "lucide-react";

interface QuickActionsCardProps {
  onQrScan: () => void;
  onQuickCheckIn: () => void;
  qrScanActive: boolean;
}

const QuickActionsCard = ({ onQrScan, onQuickCheckIn, qrScanActive }: QuickActionsCardProps) => {
  return (
    <Card className="glass">
      <CardHeader className="pb-2">
        <CardTitle>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Quick Actions
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={onQrScan}
          disabled={qrScanActive}
        >
          {qrScanActive ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              Scanning...
            </>
          ) : (
            <>
              <QrCode className="mr-2 h-4 w-4" />
              Scan QR Code
            </>
          )}
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={onQuickCheckIn}>
          <UserCheck className="mr-2 h-4 w-4" />
          Quick Check-In
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Visit
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <History className="mr-2 h-4 w-4" />
          Access Logs
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
