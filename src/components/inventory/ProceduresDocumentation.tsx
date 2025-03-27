
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDown, FileText, FileCheck, Clock, Upload, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProceduresDocumentation = () => {
  const documents = [
    {
      id: "DOC-001",
      title: "Hardware Receiving Procedure",
      description: "Standard procedure for receiving and verifying new hardware",
      updated: "2025-02-15",
      type: "Procedure",
      author: "Mohammed Al-Farsi"
    },
    {
      id: "DOC-002",
      title: "Server Provisioning Workflow",
      description: "Step-by-step guide for provisioning new servers in data center",
      updated: "2025-03-01",
      type: "Workflow",
      author: "Sarah Johnson"
    },
    {
      id: "DOC-003",
      title: "Emergency Parts Requisition",
      description: "Process for urgent parts ordering and expedited delivery",
      updated: "2025-01-10",
      type: "Form",
      author: "Ahmed Al-Sulaiman"
    },
    {
      id: "DOC-004",
      title: "Network Equipment Installation Checklist",
      description: "Verification steps for new network equipment installation",
      updated: "2025-02-28",
      type: "Checklist",
      author: "John Perkins"
    },
    {
      id: "DOC-005",
      title: "Annual Inventory Audit Procedure",
      description: "Guidelines for conducting annual physical inventory count",
      updated: "2025-01-22",
      type: "Procedure",
      author: "Fatima Al-Zahrani"
    }
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-8 w-full"
          />
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <Card key={doc.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base">{doc.title}</CardTitle>
                  <CardDescription>{doc.description}</CardDescription>
                </div>
                {doc.type === "Procedure" && <FileText className="h-5 w-5 text-blue-500" />}
                {doc.type === "Workflow" && <FileCheck className="h-5 w-5 text-emerald-500" />}
                {doc.type === "Form" && <FileDown className="h-5 w-5 text-amber-500" />}
                {doc.type === "Checklist" && <FileCheck className="h-5 w-5 text-purple-500" />}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="mr-1 h-3.5 w-3.5" />
                Updated: {doc.updated}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Author: {doc.author}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <Badge type={doc.type} />
              <Button variant="outline" size="sm">
                <FileDown className="mr-2 h-4 w-4" />
                Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Badge component for document types
const Badge = ({ type }: { type: string }) => {
  const getColors = () => {
    switch (type) {
      case "Procedure":
        return "bg-blue-100 text-blue-800";
      case "Workflow":
        return "bg-emerald-100 text-emerald-800";
      case "Form":
        return "bg-amber-100 text-amber-800";
      case "Checklist":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getColors()}`}>
      {type}
    </span>
  );
};

export default ProceduresDocumentation;
