
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart } from "@/components/ui/charts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, ArrowUpRight, Battery, Thermometer, Zap, Wifi, Activity, Clock, Plus, Settings } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SensorReading {
  timestamp: string;
  value: number;
  unit: string;
  status: "normal" | "warning" | "critical";
}

interface Sensor {
  id: string;
  name: string;
  type: string;
  location: string;
  currentValue: number;
  unit: string;
  status: "normal" | "warning" | "critical";
  threshold: {
    warning: number;
    critical: number;
  };
  readings: SensorReading[];
  lastUpdated: string;
}

interface AssetSensorReadingsProps {
  assetId: string;
}

const AssetSensorReadings = ({ assetId }: AssetSensorReadingsProps) => {
  const [activeTab, setActiveTab] = useState("current");
  const [selectedSensor, setSelectedSensor] = useState("temp-main");
  
  // Mock sensor data
  const sensors: Sensor[] = [
    {
      id: "temp-main",
      name: "Main Temperature Sensor",
      type: "temperature",
      location: "Front Panel",
      currentValue: 24.3,
      unit: "°C",
      status: "normal",
      threshold: {
        warning: 30,
        critical: 35
      },
      readings: [
        { timestamp: "08:00", value: 23.1, unit: "°C", status: "normal" },
        { timestamp: "09:00", value: 23.5, unit: "°C", status: "normal" },
        { timestamp: "10:00", value: 24.2, unit: "°C", status: "normal" },
        { timestamp: "11:00", value: 24.8, unit: "°C", status: "normal" },
        { timestamp: "12:00", value: 25.1, unit: "°C", status: "normal" },
        { timestamp: "13:00", value: 24.9, unit: "°C", status: "normal" },
        { timestamp: "14:00", value: 24.3, unit: "°C", status: "normal" },
      ],
      lastUpdated: "2 minutes ago"
    },
    {
      id: "temp-ambient",
      name: "Ambient Temperature",
      type: "temperature",
      location: "Rear Panel",
      currentValue: 22.5,
      unit: "°C",
      status: "normal",
      threshold: {
        warning: 28,
        critical: 32
      },
      readings: [
        { timestamp: "08:00", value: 21.8, unit: "°C", status: "normal" },
        { timestamp: "09:00", value: 22.0, unit: "°C", status: "normal" },
        { timestamp: "10:00", value: 22.1, unit: "°C", status: "normal" },
        { timestamp: "11:00", value: 22.3, unit: "°C", status: "normal" },
        { timestamp: "12:00", value: 22.7, unit: "°C", status: "normal" },
        { timestamp: "13:00", value: 22.6, unit: "°C", status: "normal" },
        { timestamp: "14:00", value: 22.5, unit: "°C", status: "normal" },
      ],
      lastUpdated: "5 minutes ago"
    },
    {
      id: "power-main",
      name: "Power Consumption",
      type: "power",
      location: "Main Unit",
      currentValue: 4.8,
      unit: "kW",
      status: "normal",
      threshold: {
        warning: 5.5,
        critical: 6.5
      },
      readings: [
        { timestamp: "08:00", value: 3.8, unit: "kW", status: "normal" },
        { timestamp: "09:00", value: 4.2, unit: "kW", status: "normal" },
        { timestamp: "10:00", value: 4.6, unit: "kW", status: "normal" },
        { timestamp: "11:00", value: 4.9, unit: "kW", status: "normal" },
        { timestamp: "12:00", value: 5.1, unit: "kW", status: "warning" },
        { timestamp: "13:00", value: 5.0, unit: "kW", status: "normal" },
        { timestamp: "14:00", value: 4.8, unit: "kW", status: "normal" },
      ],
      lastUpdated: "3 minutes ago"
    },
    {
      id: "vibration",
      name: "Vibration Sensor",
      type: "vibration",
      location: "Compressor",
      currentValue: 0.32,
      unit: "mm/s",
      status: "warning",
      threshold: {
        warning: 0.3,
        critical: 0.5
      },
      readings: [
        { timestamp: "08:00", value: 0.25, unit: "mm/s", status: "normal" },
        { timestamp: "09:00", value: 0.26, unit: "mm/s", status: "normal" },
        { timestamp: "10:00", value: 0.28, unit: "mm/s", status: "normal" },
        { timestamp: "11:00", value: 0.31, unit: "mm/s", status: "warning" },
        { timestamp: "12:00", value: 0.33, unit: "mm/s", status: "warning" },
        { timestamp: "13:00", value: 0.35, unit: "mm/s", status: "warning" },
        { timestamp: "14:00", value: 0.32, unit: "mm/s", status: "warning" },
      ],
      lastUpdated: "1 minute ago"
    },
    {
      id: "humidity",
      name: "Humidity Sensor",
      type: "humidity",
      location: "Air Handler",
      currentValue: 45.8,
      unit: "%",
      status: "normal",
      threshold: {
        warning: 65,
        critical: 80
      },
      readings: [
        { timestamp: "08:00", value: 46.2, unit: "%", status: "normal" },
        { timestamp: "09:00", value: 45.9, unit: "%", status: "normal" },
        { timestamp: "10:00", value: 45.5, unit: "%", status: "normal" },
        { timestamp: "11:00", value: 45.7, unit: "%", status: "normal" },
        { timestamp: "12:00", value: 46.0, unit: "%", status: "normal" },
        { timestamp: "13:00", value: 46.3, unit: "%", status: "normal" },
        { timestamp: "14:00", value: 45.8, unit: "%", status: "normal" },
      ],
      lastUpdated: "8 minutes ago"
    }
  ];
  
  // Get selected sensor data
  const selectedSensorData = sensors.find(sensor => sensor.id === selectedSensor);
  
  // Prepare data for line chart
  const chartData = selectedSensorData?.readings.map(reading => ({
    time: reading.timestamp,
    value: reading.value,
    threshold: selectedSensorData.threshold.warning
  }));
  
  // Alert history
  const alertHistory = [
    {
      id: "alert-001",
      sensor: "Vibration Sensor",
      timestamp: "2024-03-15 13:45",
      value: "0.35 mm/s",
      threshold: "0.30 mm/s",
      status: "warning",
      acknowledged: true
    },
    {
      id: "alert-002",
      sensor: "Power Consumption",
      timestamp: "2024-03-14 12:22",
      value: "5.8 kW",
      threshold: "5.5 kW",
      status: "warning",
      acknowledged: true
    },
    {
      id: "alert-003",
      sensor: "Main Temperature Sensor",
      timestamp: "2024-03-10 14:33",
      value: "32.1 °C",
      threshold: "30.0 °C",
      status: "warning",
      acknowledged: true
    }
  ];
  
  const renderSensorIcon = (type: string) => {
    switch (type) {
      case "temperature":
        return <Thermometer className="h-5 w-5 text-orange-500" />;
      case "power":
        return <Zap className="h-5 w-5 text-yellow-500" />;
      case "vibration":
        return <Activity className="h-5 w-5 text-blue-500" />;
      case "humidity":
        return <Wifi className="h-5 w-5 text-blue-500" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };
  
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "normal":
        return <Badge className="bg-emerald-500">Normal</Badge>;
      case "warning":
        return <Badge className="bg-amber-500">Warning</Badge>;
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="current">Current Readings</TabsTrigger>
          <TabsTrigger value="history">Sensor History</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="settings">CBM Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 space-y-4">
              <h3 className="text-lg font-medium">Attached Sensors</h3>
              
              {sensors.map((sensor) => (
                <Card 
                  key={sensor.id} 
                  className={`cursor-pointer transition-all ${selectedSensor === sensor.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedSensor(sensor.id)}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {renderSensorIcon(sensor.type)}
                      <div>
                        <div className="font-medium">{sensor.name}</div>
                        <div className="text-xs text-muted-foreground">{sensor.location}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{sensor.currentValue} {sensor.unit}</span>
                        {renderStatusBadge(sensor.status)}
                      </div>
                      <div className="text-xs text-muted-foreground">Updated {sensor.lastUpdated}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button className="w-full" variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add New Sensor
              </Button>
            </div>
            
            <div className="md:col-span-2">
              {selectedSensorData && (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{selectedSensorData.name}</CardTitle>
                        <CardDescription>Real-time sensor data and trend analysis</CardDescription>
                      </div>
                      {selectedSensorData.status !== "normal" && (
                        <div className="flex items-center gap-2">
                          <AlertTriangle className={`h-5 w-5 ${selectedSensorData.status === "warning" ? "text-amber-500" : "text-destructive"}`} />
                          <span className={selectedSensorData.status === "warning" ? "text-amber-500" : "text-destructive"}>
                            {selectedSensorData.status === "warning" ? "Warning: Above threshold" : "Critical: Immediate attention required"}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {renderSensorIcon(selectedSensorData.type)}
                          <div className="text-3xl font-bold">
                            {selectedSensorData.currentValue} <span className="text-lg">{selectedSensorData.unit}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-3">
                            <div className="text-xs">
                              <span className="text-muted-foreground">Warning:</span> {selectedSensorData.threshold.warning} {selectedSensorData.unit}
                            </div>
                            <div className="text-xs">
                              <span className="text-muted-foreground">Critical:</span> {selectedSensorData.threshold.critical} {selectedSensorData.unit}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">Updated {selectedSensorData.lastUpdated}</div>
                        </div>
                      </div>
                      
                      <div className="h-[250px]">
                        <LineChart 
                          data={chartData || []}
                          index="time"
                          categories={["value", "threshold"]}
                          colors={["#0ea5e9", "#ef4444"]}
                          valueFormatter={(value) => `${value} ${selectedSensorData.unit}`}
                          showLegend={true}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between bg-muted/30 p-3 rounded-md">
                        <div>
                          <div className="text-sm font-medium">Sensor Status</div>
                          <div className="text-xs text-muted-foreground">Firmware v2.1.4</div>
                        </div>
                        <div>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Wifi className="h-3 w-3" />
                            Connected
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="pt-4">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Historical Data</h3>
              <div className="flex items-center gap-2">
                <Select defaultValue="24h">
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">24 Hours</SelectItem>
                    <SelectItem value="7d">7 Days</SelectItem>
                    <SelectItem value="30d">30 Days</SelectItem>
                    <SelectItem value="90d">90 Days</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">Export Data</Button>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-4">
                <div className="h-[350px]">
                  <LineChart 
                    data={[
                      { day: "Mon", temperature: 24.1, power: 4.2, vibration: 0.25 },
                      { day: "Tue", temperature: 24.3, power: 4.5, vibration: 0.26 },
                      { day: "Wed", temperature: 24.8, power: 4.7, vibration: 0.28 },
                      { day: "Thu", temperature: 25.2, power: 5.0, vibration: 0.31 },
                      { day: "Fri", temperature: 25.1, power: 4.9, vibration: 0.33 },
                      { day: "Sat", temperature: 24.7, power: 4.6, vibration: 0.32 },
                      { day: "Sun", temperature: 24.3, power: 4.4, vibration: 0.30 },
                    ]}
                    index="day"
                    categories={["temperature", "power", "vibration"]}
                    colors={["#0ea5e9", "#f59e0b", "#ef4444"]}
                    valueFormatter={(value) => `${value}`}
                    showLegend={true}
                  />
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-orange-500" />
                    Temperature Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Average:</span>
                      <span className="font-medium">24.6 °C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Min:</span>
                      <span className="font-medium">23.1 °C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Max:</span>
                      <span className="font-medium">25.3 °C</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    Power Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Average:</span>
                      <span className="font-medium">4.6 kW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Min:</span>
                      <span className="font-medium">3.8 kW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Max:</span>
                      <span className="font-medium">5.1 kW</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-500" />
                    Vibration Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Average:</span>
                      <span className="font-medium">0.29 mm/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Min:</span>
                      <span className="font-medium">0.25 mm/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Max:</span>
                      <span className="font-medium text-amber-500">0.35 mm/s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="alerts" className="pt-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Alert History</h3>
              <Button variant="outline" size="sm">Configure Alerts</Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 bg-muted/50 p-4 text-sm font-medium">
                    <div>Time</div>
                    <div className="col-span-2">Sensor</div>
                    <div>Value</div>
                    <div>Threshold</div>
                    <div>Status</div>
                  </div>
                  
                  <div className="divide-y">
                    {alertHistory.map((alert) => (
                      <div key={alert.id} className="grid grid-cols-6 p-4 text-sm items-center">
                        <div className="font-medium">{alert.timestamp}</div>
                        <div className="col-span-2 font-medium">{alert.sensor}</div>
                        <div>{alert.value}</div>
                        <div>{alert.threshold}</div>
                        <div>
                          {alert.status === "warning" 
                            ? <Badge className="bg-amber-500">Warning</Badge> 
                            : <Badge variant="destructive">Critical</Badge>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Alert Notifications</CardTitle>
                <CardDescription>Configure how you receive alert notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-muted-foreground">Receive alert notifications via email</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">SMS Notifications</div>
                      <div className="text-sm text-muted-foreground">Receive alert notifications via SMS</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">System Notifications</div>
                      <div className="text-sm text-muted-foreground">Receive in-app notifications</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="pt-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Condition-Based Maintenance Settings</h3>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                Advanced Settings
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Sensor Thresholds</CardTitle>
                <CardDescription>Configure when alerts should be triggered based on sensor readings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {sensors.map((sensor) => (
                    <div key={sensor.id} className="space-y-4">
                      <div className="flex items-center gap-2">
                        {renderSensorIcon(sensor.type)}
                        <h4 className="font-medium">{sensor.name}</h4>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`${sensor.id}-warning`}>Warning Threshold ({sensor.unit})</Label>
                          <Input 
                            id={`${sensor.id}-warning`} 
                            type="number" 
                            step="0.1" 
                            defaultValue={sensor.threshold.warning}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`${sensor.id}-critical`}>Critical Threshold ({sensor.unit})</Label>
                          <Input 
                            id={`${sensor.id}-critical`} 
                            type="number" 
                            step="0.1" 
                            defaultValue={sensor.threshold.critical}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <Switch 
                            id={`${sensor.id}-trigger`} 
                            defaultChecked
                          />
                          <Label htmlFor={`${sensor.id}-trigger`}>Trigger Work Order Automatically</Label>
                        </div>
                        
                        <div>
                          <Select defaultValue="high">
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="critical">Critical</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Preventive Maintenance Triggers</CardTitle>
                <CardDescription>Configure automatic maintenance based on sensor readings or time intervals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Time-Based Triggers
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Schedule Maintenance Every</Label>
                        <div className="flex gap-2">
                          <Input type="number" defaultValue="90" className="max-w-[100px]" />
                          <Select defaultValue="days">
                            <SelectTrigger>
                              <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="days">Days</SelectItem>
                              <SelectItem value="weeks">Weeks</SelectItem>
                              <SelectItem value="months">Months</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Usage-Based Triggers
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Schedule Maintenance Every</Label>
                        <div className="flex gap-2">
                          <Input type="number" defaultValue="5000" className="max-w-[100px]" />
                          <Select defaultValue="hours">
                            <SelectTrigger>
                              <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hours">Hours</SelectItem>
                              <SelectItem value="cycles">Cycles</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
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

export default AssetSensorReadings;
