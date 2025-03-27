
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CalendarDays, ExternalLink, FileText, MoreHorizontal, ShieldCheck } from "lucide-react";
import { Warranty } from "./types";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface WarrantiesTableProps {
  warranties: Warranty[];
  onViewDetails: (warrantyId: string) => void;
  onCreateClaim: (warrantyId: string) => void;
  onViewDocuments: (warrantyId: string) => void;
}

const WarrantiesTable = ({ 
  warranties, 
  onViewDetails, 
  onCreateClaim, 
  onViewDocuments 
}: WarrantiesTableProps) => {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-emerald-500">{status}</Badge>;
      case 'Expiring Soon':
        return <Badge className="bg-amber-500">{status}</Badge>;
      case 'Expired':
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead>Warranty Period</TableHead>
            <TableHead>Coverage</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {warranties.map((warranty) => {
            const daysRemaining = getDaysRemaining(warranty.expirationDate);
            
            return (
              <TableRow key={warranty.id}>
                <TableCell className="font-medium">
                  <div className="font-semibold">{warranty.assetName}</div>
                  <div className="text-xs text-muted-foreground">{warranty.assetId} · {warranty.assetType}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <CalendarDays className="mr-1 h-3 w-3 text-muted-foreground" />
                    <span>{formatDate(warranty.startDate)} - {formatDate(warranty.expirationDate)}</span>
                  </div>
                  {warranty.status !== 'Expired' && (
                    <div className="text-xs mt-1">
                      {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Expired'}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{warranty.coverageType}</Badge>
                </TableCell>
                <TableCell>
                  <div>{warranty.provider}</div>
                  <div className="text-xs text-muted-foreground">{warranty.providerContact}</div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(warranty.status)}
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
                      <DropdownMenuItem onClick={() => onViewDetails(warranty.id)}>
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onViewDocuments(warranty.id)}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Documents
                      </DropdownMenuItem>
                      {warranty.status !== 'Expired' && (
                        <DropdownMenuItem onClick={() => onCreateClaim(warranty.id)}>
                          <FileText className="mr-2 h-4 w-4" />
                          Create Claim
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default WarrantiesTable;
