
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Calendar, CalendarDays, CheckCircle2 } from "lucide-react";

interface MaintenanceItem {
  id: string;
  title: string;
  date: string;
  status: string;
  location: string;
}

interface MaintenanceScheduleTableProps {
  items: MaintenanceItem[];
}

const MaintenanceScheduleTable = ({ items }: MaintenanceScheduleTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Task</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.location}</TableCell>
            <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
            <TableCell>
              <div className={`px-2 py-1 text-xs rounded-full inline-flex items-center ${
                item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                item.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                'bg-amber-100 text-amber-800'
              }`}>
                {item.status === 'Completed' ? 
                  <CheckCircle2 className="h-3 w-3 mr-1" /> : 
                  item.status === 'Upcoming' ? 
                  <Calendar className="h-3 w-3 mr-1" /> :
                  <CalendarDays className="h-3 w-3 mr-1" />
                }
                {item.status}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">View</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MaintenanceScheduleTable;
