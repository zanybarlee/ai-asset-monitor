
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PieChart, BarChart } from "@/components/ui/charts";
import { Calendar, Clock, AlertTriangle, DollarSign, PiggyBank, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AssetType } from "./mockAssetData";

interface AssetLifecycleProps {
  asset: AssetType;
}

const AssetLifecycle = ({ asset }: AssetLifecycleProps) => {
  const [activeTab, setActiveTab] = useState("timeline");
  
  // Calculate the approximate percentage of asset lifecycle completed
  const installDate = asset.installDate ? new Date(asset.installDate) : new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
  const eolDate = asset.expectedEOL ? new Date(asset.expectedEOL) : new Date(Date.now() + 5 * 365 * 24 * 60 * 60 * 1000);
  const currentDate = new Date();
  
  const totalLifespan = eolDate.getTime() - installDate.getTime();
  const elapsedLifespan = currentDate.getTime() - installDate.getTime();
  const lifecyclePercentage = Math.min(100, Math.max(0, Math.round((elapsedLifespan / totalLifespan) * 100)));
  
  // Calculate days until next lifecycle stage
  const daysToWarrantyExpiry = asset.warrantyExpiry ? 
    Math.max(0, Math.round((new Date(asset.warrantyExpiry).getTime() - currentDate.getTime()) / (24 * 60 * 60 * 1000))) : 0;
  
  const daysToEOL = Math.max(0, Math.round((eolDate.getTime() - currentDate.getTime()) / (24 * 60 * 60 * 1000)));
  
  // Lifecycle events
  const lifecycleEvents = [
    { 
      date: asset.purchaseDate || "2018-06-15", 
      stage: "Acquired", 
      description: "Asset purchased from vendor",
      details: "PO-2018-4521"
    },
    { 
      date: asset.installDate || "2018-07-22", 
      stage: "Installed", 
      description: "Asset installed and commissioned",
      details: "Installation completed by vendor technician"
    },
    { 
      date: "2018-08-01", 
      stage: "Operational", 
      description: "Asset put into production",
      details: "Acceptance testing completed"
    },
    { 
      date: "2021-09-15", 
      stage: "Under Maintenance", 
      description: "Major overhaul performed",
      details: "Compressor replacement"
    },
    { 
      date: "2021-10-05", 
      stage: "Operational", 
      description: "Asset returned to service",
      details: "Post-maintenance testing passed"
    }
  ];
  
  // Financial data
  const financialData = {
    acquisitionCost: 48500,
    installationCost: 6200,
    maintenanceCosts: [
      { year: "2018", cost: 1200 },
      { year: "2019", cost: 3200 },
      { year: "2020", cost: 2800 },
      { year: "2021", cost: 12500 },
      { year: "2022", cost: 3600 },
      { year: "2023", cost: 4100 }
    ],
    energyCosts: [
      { year: "2018", cost: 4800 },
      { year: "2019", cost: 9600 },
      { year: "2020", cost: 9800 },
      { year: "2021", cost: 10200 },
      { year: "2022", cost: 10600 },
      { year: "2023", cost: 11200 }
    ],
    totalCapEx: 54700,
    totalOpExToDate: 83600,
    estimatedRemainingCost: 45000,
    estimatedTotalLifecycleCost: 183300,
    salvageValue: 4500,
    roi: 2.8
  };
  
  // Prepare data for pie chart
  const costDistributionData = [
    { category: "Acquisition", value: financialData.acquisitionCost },
    { category: "Installation", value: financialData.installationCost },
    { category: "Maintenance", value: financialData.maintenanceCosts.reduce((sum, year) => sum + year.cost, 0) },
    { category: "Energy", value: financialData.energyCosts.reduce((sum, year) => sum + year.cost, 0) }
  ];
  
  // Prepare data for bar chart
  const yearlyExpensesData = financialData.maintenanceCosts.map((yearData, index) => ({
    year: yearData.year,
    maintenance: yearData.cost,
    energy: financialData.energyCosts[index].cost
  }));
  
  // Determine current lifecycle stage
  const currentStage = asset.lifecycleStage || "Operational";
  
  // Render a badge for lifecycle stage
  const renderLifecycleStageBadge = (stage: string) => {
    switch (stage) {
      case "Acquired":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800">Acquired</Badge>;
      case "Installed":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Installed</Badge>;
      case "Operational":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Operational</Badge>;
      case "Under Maintenance":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800">Under Maintenance</Badge>;
      case "Decommissioned":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Decommissioned</Badge>;
      default:
        return <Badge variant="outline">{stage}</Badge>;
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <Tabs defaultValue="timeline" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="timeline">Lifecycle Timeline</TabsTrigger>
          <TabsTrigger value="financial">Financial Analysis</TabsTrigger>
          <TabsTrigger value="documents">Documents & Contracts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="timeline" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Current Lifecycle Stage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center text-center py-4">
                    <div className="mb-2">
                      {renderLifecycleStageBadge(currentStage)}
                    </div>
                    <div className="text-4xl font-bold">{lifecyclePercentage}%</div>
                    <div className="text-sm text-muted-foreground mt-1">through estimated lifespan</div>
                    
                    <Separator className="my-4" />
                    
                    <div className="w-full space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Warranty Expires</span>
                        </div>
                        <Badge variant={daysToWarrantyExpiry <= 0 ? "destructive" : "outline"}>
                          {daysToWarrantyExpiry <= 0 ? "Expired" : `${daysToWarrantyExpiry} days`}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Expected EOL</span>
                        </div>
                        <Badge variant="outline">{daysToEOL} days</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {currentStage === "Operational" && (
                <Card className="border-amber-200 bg-amber-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-amber-800 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Lifecycle Alert
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-amber-800">
                      <p>This asset is nearing the end of its warranty period. Consider:</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Purchasing extended warranty</li>
                        <li>Scheduling comprehensive inspection</li>
                        <li>Planning for potential replacement</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Lifecycle Timeline</CardTitle>
                  <CardDescription>History of the asset's lifecycle stages and events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative pb-4">
                    <div className="absolute top-0 left-8 bottom-0 w-0.5 bg-border" />
                    
                    {lifecycleEvents.map((event, index) => (
                      <div key={index} className="relative mb-8 last:mb-0">
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-16 h-16 rounded-full border bg-background z-10 mr-4">
                            {renderLifecycleStageBadge(event.stage)}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{event.description}</div>
                            <div className="text-sm text-muted-foreground">{event.date}</div>
                            <div className="text-sm mt-1">{event.details}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="text-center mt-4">
                      <Button variant="outline" size="sm">
                        Add Lifecycle Event
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="financial" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                    Lifecycle Cost Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Acquisition Cost:</span>
                      <span className="font-medium">${financialData.acquisitionCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Installation Cost:</span>
                      <span className="font-medium">${financialData.installationCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Maintenance to Date:</span>
                      <span className="font-medium">${financialData.maintenanceCosts.reduce((sum, year) => sum + year.cost, 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Energy to Date:</span>
                      <span className="font-medium">${financialData.energyCosts.reduce((sum, year) => sum + year.cost, 0).toLocaleString()}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total CapEx:</span>
                      <span className="font-medium">${financialData.totalCapEx.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total OpEx to Date:</span>
                      <span className="font-medium">${financialData.totalOpExToDate.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Est. Remaining Cost:</span>
                      <span className="font-medium">${financialData.estimatedRemainingCost.toLocaleString()}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center font-medium">
                      <span>Est. Total Lifecycle Cost:</span>
                      <span className="text-lg">${financialData.estimatedTotalLifecycleCost.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Est. Salvage Value:</span>
                      <span>${financialData.salvageValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">ROI:</span>
                      <span>{financialData.roi}x</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Cost Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <PieChart 
                      data={costDistributionData}
                      category="value"
                      index="category"
                      valueFormatter={(value) => `$${value.toLocaleString()}`}
                      colors={["#3b82f6", "#10b981", "#f43f5e", "#f59e0b"]}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PiggyBank className="h-5 w-5 text-blue-600" />
                    Yearly Expenses
                  </CardTitle>
                  <CardDescription>Maintenance and energy costs by year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <BarChart 
                      data={yearlyExpensesData}
                      index="year"
                      categories={["maintenance", "energy"]}
                      colors={["#3b82f6", "#f59e0b"]}
                      valueFormatter={(value) => `$${value.toLocaleString()}`}
                      showLegend={true}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="documents" className="pt-4">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Contracts & Agreements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 border rounded-md">
                      <div className="flex-1">
                        <div className="font-medium">Purchase Contract</div>
                        <div className="text-sm text-muted-foreground">Signed on {asset.purchaseDate || "June 15, 2018"}</div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    
                    <div className="flex items-center p-3 border rounded-md">
                      <div className="flex-1">
                        <div className="font-medium">Warranty Certificate</div>
                        <div className="text-sm text-muted-foreground">Valid until {asset.warrantyExpiry || "June 15, 2024"}</div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    
                    <div className="flex items-center p-3 border rounded-md">
                      <div className="flex-1">
                        <div className="font-medium">Service Level Agreement</div>
                        <div className="text-sm text-muted-foreground">4-hour response time, 24/7 support</div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    
                    <div className="flex items-center p-3 border rounded-md">
                      <div className="flex-1">
                        <div className="font-medium">Maintenance Contract</div>
                        <div className="text-sm text-muted-foreground">Quarterly preventive maintenance</div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-emerald-600" />
                    Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 border rounded-md">
                      <div className="flex-1">
                        <div className="font-medium">User Manual</div>
                        <div className="text-sm text-muted-foreground">Operation and user instructions</div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    
                    <div className="flex items-center p-3 border rounded-md">
                      <div className="flex-1">
                        <div className="font-medium">Technical Specifications</div>
                        <div className="text-sm text-muted-foreground">Detailed technical information</div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    
                    <div className="flex items-center p-3 border rounded-md">
                      <div className="flex-1">
                        <div className="font-medium">Installation Guide</div>
                        <div className="text-sm text-muted-foreground">Setup and configuration</div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    
                    <div className="flex items-center p-3 border rounded-md">
                      <div className="flex-1">
                        <div className="font-medium">Maintenance Log</div>
                        <div className="text-sm text-muted-foreground">Complete service history</div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Vendor Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Manufacturer</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span>{asset.manufacturer || "Carrier Corporation"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contact:</span>
                        <span>support@carrier.com</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone:</span>
                        <span>+1-800-555-1234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Website:</span>
                        <span>carrier.com</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Service Provider</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span>DataCenter HVAC Services</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contact:</span>
                        <span>service@dchvac.com</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone:</span>
                        <span>+1-888-555-4321</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">SLA Level:</span>
                        <span>Premium 24/7</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssetLifecycle;
