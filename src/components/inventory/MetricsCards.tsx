
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Server, HardDrive, Cable, Cpu } from "lucide-react";

const MetricsCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Server Hardware</CardTitle>
          <Server className="h-4 w-4 text-aramco-teal" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">147</div>
          <p className="text-xs text-muted-foreground">
            12 awaiting deployment
          </p>
          <Progress value={72} className="h-2 mt-2" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Storage Systems</CardTitle>
          <HardDrive className="h-4 w-4 text-aramco-teal" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">86</div>
          <p className="text-xs text-muted-foreground">
            4 awaiting deployment
          </p>
          <Progress value={85} className="h-2 mt-2" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Network Devices</CardTitle>
          <Cable className="h-4 w-4 text-aramco-teal" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">328</div>
          <p className="text-xs text-muted-foreground">
            23 awaiting deployment
          </p>
          <Progress value={63} className="h-2 mt-2" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Computing Components</CardTitle>
          <Cpu className="h-4 w-4 text-aramco-teal" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">723</div>
          <p className="text-xs text-muted-foreground">
            56 awaiting deployment
          </p>
          <Progress value={78} className="h-2 mt-2" />
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsCards;
