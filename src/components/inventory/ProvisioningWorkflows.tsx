
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProvisioningWorkflows = () => {
  return (
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
  );
};

export default ProvisioningWorkflows;
