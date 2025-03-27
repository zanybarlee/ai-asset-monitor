
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Wrench, CheckCircle, AlertTriangle, Archive } from "lucide-react";

const AssetLifecycleStages = () => {
  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Asset Lifecycle Stages</DialogTitle>
        <DialogDescription>
          Understanding the lifecycle stages of data center assets
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -z-10"></div>
          
          {/* Stage 1: Acquired */}
          <Card className="flex flex-col items-center text-center p-4">
            <div className="h-14 w-14 rounded-full bg-purple-100 flex items-center justify-center mb-3">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-medium">Acquired</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Asset purchased and received
            </p>
          </Card>
          
          {/* Stage 2: Installed */}
          <Card className="flex flex-col items-center text-center p-4">
            <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-3">
              <Wrench className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-medium">Installed</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Asset installed and configured
            </p>
          </Card>
          
          {/* Stage 3: Operational */}
          <Card className="flex flex-col items-center text-center p-4">
            <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium">Operational</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Asset in active use
            </p>
          </Card>
          
          {/* Stage 4: Under Maintenance */}
          <Card className="flex flex-col items-center text-center p-4">
            <div className="h-14 w-14 rounded-full bg-amber-100 flex items-center justify-center mb-3">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="font-medium">Under Maintenance</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Asset temporarily offline
            </p>
          </Card>
          
          {/* Stage 5: Decommissioned */}
          <Card className="flex flex-col items-center text-center p-4">
            <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <Archive className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="font-medium">Decommissioned</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Asset retired from service
            </p>
          </Card>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Lifecycle Stage Details</h3>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-md flex items-center gap-2">
                <Package className="h-5 w-5 text-purple-600" />
                Acquired
              </CardTitle>
              <CardDescription>Initial receipt and onboarding of the asset</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="bg-purple-500 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0"></span>
                  <span>Asset is purchased and received at the facility</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-purple-500 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0"></span>
                  <span>Initial inspection and documentation of the asset</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-purple-500 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0"></span>
                  <span>Recording of purchase date, warranty information, and vendor details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-purple-500 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0"></span>
                  <span>Assignment of a unique asset ID and barcode/RFID tagging</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-md flex items-center gap-2">
                <Wrench className="h-5 w-5 text-blue-600" />
                Installed
              </CardTitle>
              <CardDescription>Installation and preparation for operation</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="bg-blue-500 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0"></span>
                  <span>Physical installation at the designated location</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-500 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0"></span>
                  <span>Connection to power, network, and other required services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-500 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0"></span>
                  <span>Initial configuration and setup according to specifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-500 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0"></span>
                  <span>Commissioning tests and validation</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-md flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Operational
              </CardTitle>
              <CardDescription>Active service and regular maintenance</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="bg-green-500 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0"></span>
                  <span>Asset is in active service performing its intended function</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-green-500 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0"></span>
                  <span>Regular preventive maintenance according to schedule</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-green-500 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0"></span>
                  <span>Performance monitoring and operational data collection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-green-500 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0"></span>
                  <span>Minor repairs and adjustments as needed</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-md flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                Under Maintenance
              </CardTitle>
              <CardDescription>Temporarily offline for repairs or major service</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="bg-amber-500 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0"></span>
                  <span>Asset is temporarily taken out of service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-amber-500 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0"></span>
                  <span>Major repairs, overhauls, or upgrades being performed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-amber-500 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0"></span>
                  <span>Detailed documentation of maintenance activities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-amber-500 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0"></span>
                  <span>Root cause analysis for unexpected failures</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-md flex items-center gap-2">
                <Archive className="h-5 w-5 text-gray-600" />
                Decommissioned
              </CardTitle>
              <CardDescription>End of service life and proper disposal</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="bg-gray-500 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0"></span>
                  <span>Asset has reached end of useful life or is obsolete</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-gray-500 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0"></span>
                  <span>Proper shutdown and disconnection procedures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-gray-500 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0"></span>
                  <span>Data wiping and security protocols if applicable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-gray-500 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0"></span>
                  <span>Environmentally responsible disposal or recycling</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </DialogContent>
  );
};

export default AssetLifecycleStages;
