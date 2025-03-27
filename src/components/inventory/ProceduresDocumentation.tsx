
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle, Download, Clock, Calendar, FileText, CheckCircle2, Users, Tag } from "lucide-react";

interface Procedure {
  id: string;
  title: string;
  category: string;
  lastUpdated: string;
  reviewDate: string;
  status: 'Active' | 'Draft' | 'Under Review';
  owner: string;
  tags: string[];
}

const ProceduresDocumentation = () => {
  const procedures: Procedure[] = [
    {
      id: "PRO-001",
      title: "Server Hardware Installation",
      category: "Hardware",
      lastUpdated: "2023-09-15",
      reviewDate: "2024-09-15",
      status: "Active",
      owner: "IT Operations",
      tags: ["Server", "Installation", "Hardware"]
    },
    {
      id: "PRO-002",
      title: "Software Deployment Protocol",
      category: "Software",
      lastUpdated: "2023-10-22",
      reviewDate: "2024-10-22",
      status: "Active",
      owner: "Application Team",
      tags: ["Software", "Deployment", "Protocol"]
    },
    {
      id: "PRO-003",
      title: "Network Equipment Configuration",
      category: "Network",
      lastUpdated: "2023-11-05",
      reviewDate: "2024-11-05",
      status: "Active",
      owner: "Network Team",
      tags: ["Network", "Configuration", "Router"]
    },
    {
      id: "PRO-004",
      title: "Disaster Recovery Plan",
      category: "Security",
      lastUpdated: "2023-12-01",
      reviewDate: "2024-12-01",
      status: "Under Review",
      owner: "Security Team",
      tags: ["DR", "Security", "Recovery"]
    },
    {
      id: "PRO-005",
      title: "Data Backup Procedures",
      category: "Data Management",
      lastUpdated: "2024-01-10",
      reviewDate: "2025-01-10",
      status: "Draft",
      owner: "Data Management",
      tags: ["Backup", "Data", "Storage"]
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Procedures Documentation</CardTitle>
            <CardDescription>Standard procedures and protocols for hardware and software</CardDescription>
          </div>
          <div className="flex gap-2">
            <Input className="w-64" placeholder="Search procedures..." />
            <Button size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Procedure
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {procedures.map((procedure) => (
            <div key={procedure.id} className="border rounded-md p-4 hover:bg-muted/50">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-aramco-teal" />
                    <h4 className="font-medium text-lg">{procedure.title}</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      procedure.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      procedure.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {procedure.status}
                    </span>
                  </div>
                  
                  <div className="mt-2 grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Tag className="h-3.5 w-3.5" />
                      <span>Category: {procedure.category}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      <span>Owner: {procedure.owner}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Last Updated: {new Date(procedure.lastUpdated).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Review Date: {new Date(procedure.reviewDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-1">
                    {procedure.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-muted rounded-md text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-1 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">Showing {procedures.length} of 32 procedures</div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProceduresDocumentation;
