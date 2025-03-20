
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Server, HardDrive, Cpu, Cable, PlusCircle, ArrowUpDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const InventoryManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Provisioning & Inventory Management</h3>
          <p className="text-muted-foreground">Track, manage and deploy hardware and software assets</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Server Hardware</CardTitle>
            <Server className="h-4 w-4 text-aramco-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">147</div>
            <p className="text-xs text-muted-foreground">
              12 awaiting deployment
            </p>
            <Progress value={72} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Systems</CardTitle>
            <HardDrive className="h-4 w-4 text-aramco-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86</div>
            <p className="text-xs text-muted-foreground">
              4 awaiting deployment
            </p>
            <Progress value={85} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Devices</CardTitle>
            <Cable className="h-4 w-4 text-aramco-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">328</div>
            <p className="text-xs text-muted-foreground">
              23 awaiting deployment
            </p>
            <Progress value={63} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Computing Components</CardTitle>
            <Cpu className="h-4 w-4 text-aramco-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">723</div>
            <p className="text-xs text-muted-foreground">
              56 awaiting deployment
            </p>
            <Progress value={78} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="hardware" className="space-y-4">
        <TabsList>
          <TabsTrigger value="hardware">Hardware</TabsTrigger>
          <TabsTrigger value="software">Software</TabsTrigger>
          <TabsTrigger value="provisioning">Provisioning</TabsTrigger>
          <TabsTrigger value="procedures">Procedures</TabsTrigger>
        </TabsList>
        <TabsContent value="hardware" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Hardware Inventory</CardTitle>
                  <CardDescription>All hardware assets in the system</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Input className="w-64" placeholder="Search assets..." />
                  <Button variant="outline" size="icon">
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 p-4 text-sm font-medium text-muted-foreground bg-muted">
                  <div className="col-span-1">ID</div>
                  <div className="col-span-3">Name</div>
                  <div className="col-span-2">Category</div>
                  <div className="col-span-2">Location</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Last Updated</div>
                </div>
                {[
                  { id: 'SRV-1042', name: 'Dell PowerEdge R740', category: 'Server', location: 'Server Room A', status: 'Deployed', updated: '2 days ago' },
                  { id: 'STO-789', name: 'NetApp FAS8700', category: 'Storage', location: 'Server Room A', status: 'Deployed', updated: '5 days ago' },
                  { id: 'SRV-1043', name: 'HP ProLiant DL380', category: 'Server', location: 'Inventory', status: 'Available', updated: '1 week ago' },
                  { id: 'NET-442', name: 'Cisco Nexus 9336C', category: 'Network', location: 'Rack B12', status: 'Deployed', updated: '3 days ago' },
                  { id: 'SRV-1044', name: 'Dell PowerEdge R640', category: 'Server', location: 'Server Room B', status: 'Maintenance', updated: '1 day ago' },
                ].map((item, i) => (
                  <div key={i} className="grid grid-cols-12 p-4 text-sm border-t">
                    <div className="col-span-1 font-medium">{item.id}</div>
                    <div className="col-span-3">{item.name}</div>
                    <div className="col-span-2">{item.category}</div>
                    <div className="col-span-2">{item.location}</div>
                    <div className="col-span-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === 'Deployed' ? 'bg-green-100 text-green-800' : 
                        item.status === 'Available' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="col-span-2 text-muted-foreground">{item.updated}</div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Showing 5 of 1284 items</div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="provisioning">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Procedures</CardTitle>
              <CardDescription>Standardized deployment workflows for hardware and software</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <h4 className="font-medium text-lg">Server Provisioning Workflow</h4>
                  <div className="mt-4 flex items-center">
                    <div className="relative">
                      {[
                        "Hardware Setup", 
                        "OS Installation", 
                        "Network Configuration", 
                        "Security Hardening", 
                        "Application Deployment", 
                        "Testing & Validation"
                      ].map((step, i, arr) => (
                        <div key={i} className="flex items-center">
                          <div className="flex flex-col items-center">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${i < 3 ? 'bg-aramco-teal text-white' : 'bg-muted text-muted-foreground'}`}>
                              {i+1}
                            </div>
                            <span className="text-xs mt-1 max-w-24 text-center">{step}</span>
                          </div>
                          {i < arr.length - 1 && (
                            <div className={`h-0.5 w-12 ${i < 2 ? 'bg-aramco-teal' : 'bg-muted'}`}></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6">
                    <h5 className="font-medium">Current Stage: Network Configuration</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      3/6 steps completed - Estimated time to completion: 45 minutes
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm">Continue Deployment</Button>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Recent Deployments</h4>
                    <div className="mt-3 space-y-3">
                      {[
                        { name: "Database Cluster", status: "Completed", time: "Yesterday" },
                        { name: "Web Servers", status: "Completed", time: "3 days ago" },
                        { name: "Storage Array", status: "Completed", time: "1 week ago" },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="text-xs text-muted-foreground">{item.time}</div>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Upcoming Deployments</h4>
                    <div className="mt-3 space-y-3">
                      {[
                        { name: "Network Switches", status: "Scheduled", time: "Tomorrow" },
                        { name: "Application Servers", status: "Pending", time: "Next Week" },
                        { name: "Backup Systems", status: "Preparing", time: "In 2 weeks" },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="text-xs text-muted-foreground">{item.time}</div>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
                            item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="software">
          <div className="flex items-center justify-center h-40 border rounded-md bg-muted">
            <p className="text-muted-foreground">Software inventory module loading...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="procedures">
          <div className="flex items-center justify-center h-40 border rounded-md bg-muted">
            <p className="text-muted-foreground">Procedures documentation loading...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryManagement;
