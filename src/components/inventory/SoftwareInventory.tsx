
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Search, PlusCircle, Copy, Download, Key, Tag, Calendar } from "lucide-react";

export interface SoftwareItem {
  id: string;
  name: string;
  type: string;
  version: string;
  licenseType: string;
  expiryDate: string;
  assignedTo: string;
  status: 'Active' | 'Expired' | 'Pending';
}

const SoftwareInventory = () => {
  const [softwareItems, setSoftwareItems] = useState<SoftwareItem[]>([
    { 
      id: 'SW-001', 
      name: 'Windows Server', 
      type: 'Operating System', 
      version: '2022 Datacenter', 
      licenseType: 'Volume License', 
      expiryDate: '2025-12-31', 
      assignedTo: 'Server Farm A', 
      status: 'Active' 
    },
    { 
      id: 'SW-002', 
      name: 'SQL Server', 
      type: 'Database', 
      version: '2022 Enterprise', 
      licenseType: 'Core-based', 
      expiryDate: '2024-12-31', 
      assignedTo: 'Database Cluster', 
      status: 'Active' 
    },
    { 
      id: 'SW-003', 
      name: 'VMware vSphere', 
      type: 'Virtualization', 
      version: '7.0', 
      licenseType: 'Per-CPU', 
      expiryDate: '2025-06-30', 
      assignedTo: 'Virtualization Hosts', 
      status: 'Active' 
    },
    { 
      id: 'SW-004', 
      name: 'Red Hat Enterprise Linux', 
      type: 'Operating System', 
      version: '9.0', 
      licenseType: 'Subscription', 
      expiryDate: '2024-09-15', 
      assignedTo: 'Web Servers', 
      status: 'Active' 
    },
    { 
      id: 'SW-005', 
      name: 'Adobe Creative Cloud', 
      type: 'Creative Suite', 
      version: '2023', 
      licenseType: 'Subscription', 
      expiryDate: '2023-11-20', 
      assignedTo: 'Design Team', 
      status: 'Expired' 
    },
  ]);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Software Inventory</CardTitle>
            <CardDescription>Manage software licenses and deployments</CardDescription>
          </div>
          <div className="flex gap-2">
            <Input className="w-64" placeholder="Search software..." />
            <Button variant="outline" size="icon">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
            <Button size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Software
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-12 p-4 text-sm font-medium text-muted-foreground bg-muted">
            <div className="col-span-1">ID</div>
            <div className="col-span-2">Name</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-1">Version</div>
            <div className="col-span-2">License Type</div>
            <div className="col-span-1">Expiry</div>
            <div className="col-span-2">Assigned To</div>
            <div className="col-span-1">Status</div>
          </div>
          {softwareItems.map((item, i) => (
            <div key={i} className="grid grid-cols-12 p-4 text-sm border-t hover:bg-muted/50">
              <div className="col-span-1 font-medium">{item.id}</div>
              <div className="col-span-2">{item.name}</div>
              <div className="col-span-2">{item.type}</div>
              <div className="col-span-1">{item.version}</div>
              <div className="col-span-2 flex items-center">
                <Key className="mr-1 h-3 w-3 text-muted-foreground" />
                {item.licenseType}
              </div>
              <div className="col-span-1 flex items-center">
                <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                {new Date(item.expiryDate).toLocaleDateString()}
              </div>
              <div className="col-span-2">{item.assignedTo}</div>
              <div className="col-span-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item.status === 'Active' ? 'bg-green-100 text-green-800' : 
                  item.status === 'Expired' ? 'bg-red-100 text-red-800' : 
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">Showing {softwareItems.length} of 150 items</div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SoftwareInventory;
