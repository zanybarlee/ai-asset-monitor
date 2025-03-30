
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Eye, BarChart, FileText } from "lucide-react";

export function ReportHistory() {
  // Mock data for report history
  const reportHistory = [
    {
      id: 1,
      title: "Daily Operations Summary",
      type: "Daily Report",
      audience: "Field Engineer",
      created: "June 15, 2023 - 17:30",
      status: "completed",
      format: "PDF"
    },
    {
      id: 2,
      title: "Weekly Maintenance Status",
      type: "Weekly Report",
      audience: "Site Engineer",
      created: "June 12, 2023 - 09:15",
      status: "completed",
      format: "DOCX"
    },
    {
      id: 3,
      title: "Executive Dashboard - May",
      type: "Monthly Report",
      audience: "Management",
      created: "June 1, 2023 - 10:00",
      status: "completed",
      format: "PPTX"
    },
    {
      id: 4,
      title: "Q2 Compliance Overview",
      type: "Executive Summary",
      audience: "Management",
      created: "May 31, 2023 - 14:45",
      status: "completed",
      format: "PDF"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="bg-green-500">Completed</Badge>;
      case "processing":
        return <Badge variant="default" className="bg-yellow-500">Processing</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportHistory.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{report.title}</span>
                    <span className="text-xs text-muted-foreground">For: {report.audience}</span>
                  </div>
                </TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.created}</TableCell>
                <TableCell>{getStatusBadge(report.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      {report.format}
                    </Button>
                    {report.audience === "Management" && (
                      <Button size="sm" variant="outline">
                        <BarChart className="h-4 w-4 mr-1" />
                        Dashboard
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
