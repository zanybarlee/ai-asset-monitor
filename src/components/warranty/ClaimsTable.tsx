
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal } from "lucide-react";
import { WarrantyClaim } from "./types";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface ClaimsTableProps {
  claims: WarrantyClaim[];
  onViewClaim: (claimId: string) => void;
}

const ClaimsTable = ({ claims, onViewClaim }: ClaimsTableProps) => {
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

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Claim ID</TableHead>
            <TableHead>Asset</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {claims.map((claim) => (
            <TableRow key={claim.id}>
              <TableCell className="font-medium">
                {claim.id}
              </TableCell>
              <TableCell>
                <div className="font-medium">{claim.assetName}</div>
                <div className="text-xs text-muted-foreground">{claim.assetId}</div>
              </TableCell>
              <TableCell>
                {formatDate(claim.dateSubmitted)}
              </TableCell>
              <TableCell>{claim.vendor}</TableCell>
              <TableCell>
                <div className="font-medium">{formatCurrency(claim.estimatedValue)}</div>
                {claim.actualValue !== undefined && (
                  <div className="text-xs text-muted-foreground">
                    Actual: {formatCurrency(claim.actualValue)}
                  </div>
                )}
              </TableCell>
              <TableCell>
                {getStatusBadge(claim.status)}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewClaim(claim.id)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClaimsTable;
