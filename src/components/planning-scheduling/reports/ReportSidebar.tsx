
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

const ReportSidebar = () => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Available Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { id: 1, name: "Monthly PM Compliance", type: "Excel", date: "Oct 1, 2023" },
            { id: 2, name: "Backlog Aging Analysis", type: "PDF", date: "Sep 15, 2023" },
            { id: 3, name: "Resource Utilization Q3", type: "Excel", date: "Oct 5, 2023" },
            { id: 4, name: "Critical Asset Health", type: "PDF", date: "Sep 28, 2023" },
          ].map((report) => (
            <div key={report.id} className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{report.name}</p>
                  <p className="text-xs text-muted-foreground">Generated: {report.date}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-3 w-3 mr-2" />
                {report.type}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportSidebar;
