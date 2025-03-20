
import { Calendar, User, Activity, LayoutList } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export interface AuditRecord {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  status: string;
  details: string;
}

interface AuditTableProps {
  data: AuditRecord[];
}

const AuditTable = ({ data }: AuditTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="w-[180px]">Timestamp</TableHead>
            <TableHead className="w-[180px]">User</TableHead>
            <TableHead className="w-[150px]">Action</TableHead>
            <TableHead className="w-[150px]">Resource</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-2 text-muted-foreground" />
                    {item.timestamp}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-2 text-muted-foreground" />
                    {item.user}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Activity className="h-3 w-3 mr-2 text-muted-foreground" />
                    {item.action}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <LayoutList className="h-3 w-3 mr-2 text-muted-foreground" />
                    {item.resource}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={item.status === "Success" ? "default" : "destructive"} 
                    className={item.status === "Success" ? "bg-green-500 hover:bg-green-600" : ""}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[300px] truncate" title={item.details}>
                  {item.details}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No audit records found matching your criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AuditTable;
