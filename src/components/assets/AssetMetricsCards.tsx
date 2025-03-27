
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AssetMetricsCardsProps {
  assetCount: number;
  mtbf?: string | number;
  mttr?: string | number;
  availability?: string;
}

const AssetMetricsCards = ({ assetCount, mtbf = 4344, mttr = 24, availability = "99.45%" }: AssetMetricsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="glass">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Assets Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">{assetCount}</span>
            <span className="text-sm text-muted-foreground">Registered Devices</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">MTBF</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">{mtbf}</span>
            <span className="text-sm text-muted-foreground">Hours</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">MTTR</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">{mttr}</span>
            <span className="text-sm text-muted-foreground">Hours</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">{availability}</span>
            <span className="text-sm text-muted-foreground">Uptime</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetMetricsCards;
