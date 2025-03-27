
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const SoftwareInventory = () => {
  // Mock software inventory data
  const softwareItems = [
    {
      id: "SW-001",
      name: "VMware vSphere",
      version: "7.0.3",
      licenseType: "Enterprise Plus",
      licenseCount: 48,
      used: 42,
      assignedTo: "Production Cluster",
      expiryDate: "2025-12-31",
      status: "Active"
    },
    {
      id: "SW-002",
      name: "Microsoft Windows Server",
      version: "2022",
      licenseType: "Datacenter",
      licenseCount: 16,
      used: 16,
      assignedTo: "Various Servers",
      expiryDate: "2026-06-30",
      status: "Active"
    },
    {
      id: "SW-003",
      name: "Red Hat Enterprise Linux",
      version: "9.0",
      licenseType: "Premium",
      licenseCount: 24,
      used: 18,
      assignedTo: "Application Servers",
      expiryDate: "2025-09-15",
      status: "Active"
    },
    {
      id: "SW-004",
      name: "Oracle Database",
      version: "19c",
      licenseType: "Enterprise",
      licenseCount: 8,
      used: 6,
      assignedTo: "Database Cluster",
      expiryDate: "2025-03-31",
      status: "Active"
    },
    {
      id: "SW-005",
      name: "Veeam Backup & Replication",
      version: "12",
      licenseType: "Enterprise",
      licenseCount: 10,
      used: 8,
      assignedTo: "Backup Infrastructure",
      expiryDate: "2024-12-15",
      status: "Expiring Soon"
    }
  ];

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-4 flex justify-between items-center">
        <h3 className="text-lg font-medium">Software License Inventory</h3>
        <Button>Add Software License</Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>License ID</TableHead>
              <TableHead>Software Name</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>License Type</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {softwareItems.map((item) => {
              const usagePercentage = (item.used / item.licenseCount) * 100;
              const isExpiringSoon = item.status === "Expiring Soon";
              const expiryDate = new Date(item.expiryDate);
              const today = new Date();
              const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.version}</TableCell>
                  <TableCell>{item.licenseType}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <div className="text-xs">
                        {item.used} of {item.licenseCount} licenses used
                      </div>
                      <Progress 
                        value={usagePercentage} 
                        className={`h-2 ${usagePercentage > 90 ? 'bg-red-100' : usagePercentage > 75 ? 'bg-amber-100' : 'bg-blue-100'}`}
                      />
                    </div>
                  </TableCell>
                  <TableCell>{item.assignedTo}</TableCell>
                  <TableCell>
                    {isExpiringSoon ? (
                      <span className="text-amber-500">{daysUntilExpiry} days left</span>
                    ) : (
                      item.expiryDate
                    )}
                  </TableCell>
                  <TableCell>
                    {item.status === "Active" && <Badge className="bg-emerald-500">Active</Badge>}
                    {item.status === "Expiring Soon" && <Badge className="bg-amber-500">Expiring Soon</Badge>}
                    {item.status === "Expired" && <Badge className="bg-red-500">Expired</Badge>}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SoftwareInventory;
