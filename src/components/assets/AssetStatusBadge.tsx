
import { Badge } from "@/components/ui/badge";

interface AssetStatusBadgeProps {
  status: string;
}

const AssetStatusBadge = ({ status }: AssetStatusBadgeProps) => {
  switch (status) {
    case "Operational":
      return <Badge className="bg-emerald-500">{status}</Badge>;
    case "Warning":
      return <Badge className="bg-amber-500">{status}</Badge>;
    case "Critical":
      return <Badge variant="destructive">{status}</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export default AssetStatusBadge;
