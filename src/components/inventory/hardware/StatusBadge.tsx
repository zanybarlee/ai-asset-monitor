
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case 'Available':
      return <Badge className="bg-emerald-500">{status}</Badge>;
    case 'Low Stock':
      return <Badge className="bg-amber-500">{status}</Badge>;
    case 'Out of Stock':
      return <Badge className="bg-red-500">{status}</Badge>;
    case 'Reordered':
      return <Badge className="bg-blue-500">{status}</Badge>;
    case 'Discontinued':
      return <Badge className="bg-gray-500">{status}</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export default StatusBadge;
