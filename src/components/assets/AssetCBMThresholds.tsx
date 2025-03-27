
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Thermometer, Activity, Zap, Clock, AlertTriangle, Plus, Save } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

const AssetCBMThresholds = () => {
  const [activeTab, setActiveTab] = useState("temperature");
  
  const handleSaveThresholds = () => {
    toast.success("Threshold settings saved successfully");
  };
  
  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Condition-Based Maintenance Thresholds</DialogTitle>
        <DialogDescription>
          Configure sensor thresholds to trigger maintenance alerts and work orders
        </DialogDescription>
      </DialogHeader>
      
      <Tabs defaultValue="temperature" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="temperature" className="flex items-center gap-1">
            <Thermometer className="h-4 w-4" />
            <span>Temperature</span>
          </TabsTrigger>
          <TabsTrigger value="vibration" className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            <span>Vibration</span>
          </TabsTrigger>
          <TabsTrigger value="power" className="flex items-center gap-1">
            <Zap className="h-4 w-4" />
            <span>Power</span>
          </TabsTrigger>
          <TabsTrigger value="runtime" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Runtime</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="temperature" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-orange-500" />
                Temperature Thresholds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">HVAC / CRAC Units</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Warning Threshold (°C)</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" defaultValue="28" />
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Critical Threshold (°C)</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" defaultValue="32" />
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <Switch id="auto-wo-hvac" defaultChecked />
                            <Label htmlFor="auto-wo-hvac">Auto-create WO</Label>
                          </div>
                          <Select defaultValue="high">
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="critical">Critical</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Server Room Ambient</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Warning Threshold (°C)</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" defaultValue="24" />
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Critical Threshold (°C)</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" defaultValue="27" />
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <Switch id="auto-wo-server" defaultChecked />
                            <Label htmlFor="auto-wo-server">Auto-create WO</Label>
                          </div>
                          <Select defaultValue="critical">
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="critical">Critical</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Rack Inlet Temperature</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Warning Threshold (°C)</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" defaultValue="26" />
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Critical Threshold (°C)</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" defaultValue="29" />
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <Switch id="auto-wo-rack" defaultChecked />
                            <Label htmlFor="auto-wo-rack">Auto-create WO</Label>
                          </div>
                          <Select defaultValue="high">
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="critical">Critical</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    Add New Temperature Threshold
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="vibration" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Vibration Thresholds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">CRAC Compressor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Warning Threshold (mm/s)</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" step="0.1" defaultValue="4.5" />
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Critical Threshold (mm/s)</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" step="0.1" defaultValue="7.1" />
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <Switch id="auto-wo-compressor" defaultChecked />
                            <Label htmlFor="auto-wo-compressor">Auto-create WO</Label>
                          </div>
                          <Select defaultValue="high">
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="critical">Critical</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Cooling Tower</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Warning Threshold (mm/s)</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" step="0.1" defaultValue="6.0" />
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Critical Threshold (mm/s)</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" step="0.1" defaultValue="9.0" />
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <Switch id="auto-wo-tower" defaultChecked />
                            <Label htmlFor="auto-wo-tower">Auto-create WO</Label>
                          </div>
                          <Select defaultValue="high">
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="critical">Critical</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Air Handler Fan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Warning Threshold (mm/s)</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" step="0.1" defaultValue="3.5" />
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Critical Threshold (mm/s)</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" step="0.1" defaultValue="5.5" />
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <Switch id="auto-wo-fan" defaultChecked />
                            <Label htmlFor="auto-wo-fan">Auto-create WO</Label>
                          </div>
                          <Select defaultValue="medium">
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="critical">Critical</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    Add New Vibration Threshold
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="power" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Power Thresholds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">PDU Load</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Warning Threshold (%)</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" defaultValue="80" />
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Critical Threshold (%)</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" defaultValue="90" />
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <Switch id="auto-wo-pdu" defaultChecked />
                            <Label htmlFor="auto-wo-pdu">Auto-create WO</Label>
                          </div>
                          <Select defaultValue="critical">
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="critical">Critical</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">UPS Battery</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Warning Threshold (%)</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" defaultValue="50" />
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Critical Threshold (%)</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" defaultValue="20" />
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <Switch id="auto-wo-ups" defaultChecked />
                            <Label htmlFor="auto-wo-ups">Auto-create WO</Label>
                          </div>
                          <Select defaultValue="critical">
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="critical">Critical</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Power Factor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Warning Threshold</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" step="0.01" defaultValue="0.85" />
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Critical Threshold</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" step="0.01" defaultValue="0.80" />
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <Switch id="auto-wo-pf" defaultChecked />
                            <Label htmlFor="auto-wo-pf">Auto-create WO</Label>
                          </div>
                          <Select defaultValue="medium">
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="critical">Critical</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    Add New Power Threshold
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="runtime" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-500" />
                Runtime Thresholds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">HVAC Compressor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Maintenance Threshold (hours)</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" defaultValue="5000" />
                            <Clock className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Reset After Maintenance</Label>
                          <div className="flex items-center justify-between">
                            <Switch id="reset-hvac" defaultChecked />
                            <Select defaultValue="pm-reset">
                              <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Reset Option" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pm-reset">After PM Only</SelectItem>
                                <SelectItem value="any-reset">Any Maintenance</SelectItem>
                                <SelectItem value="manual">Manual Reset</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <Switch id="auto-wo-compressor-rt" defaultChecked />
                            <Label htmlFor="auto-wo-compressor-rt">Auto-create WO</Label>
                          </div>
                          <Select defaultValue="high">
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="critical">Critical</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Air Filter</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Replacement Threshold (hours)</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" defaultValue="2160" />
                            <Clock className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Reset After Replacement</Label>
                          <div className="flex items-center justify-between">
                            <Switch id="reset-filter" defaultChecked />
                            <Select defaultValue="any-reset">
                              <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Reset Option" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pm-reset">After PM Only</SelectItem>
                                <SelectItem value="any-reset">Any Maintenance</SelectItem>
                                <SelectItem value="manual">Manual Reset</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <Switch id="auto-wo-filter" defaultChecked />
                            <Label htmlFor="auto-wo-filter">Auto-create WO</Label>
                          </div>
                          <Select defaultValue="medium">
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="critical">Critical</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">UPS Battery</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Inspection Threshold (hours)</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" defaultValue="8760" />
                            <Clock className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Reset After Inspection</Label>
                          <div className="flex items-center justify-between">
                            <Switch id="reset-ups" defaultChecked />
                            <Select defaultValue="pm-reset">
                              <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Reset Option" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pm-reset">After PM Only</SelectItem>
                                <SelectItem value="any-reset">Any Maintenance</SelectItem>
                                <SelectItem value="manual">Manual Reset</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <Switch id="auto-wo-ups-rt" defaultChecked />
                            <Label htmlFor="auto-wo-ups-rt">Auto-create WO</Label>
                          </div>
                          <Select defaultValue="high">
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="critical">Critical</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    Add New Runtime Threshold
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <DialogFooter>
        <Button onClick={handleSaveThresholds} className="flex items-center gap-1">
          <Save className="h-4 w-4" />
          Save Threshold Settings
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AssetCBMThresholds;
