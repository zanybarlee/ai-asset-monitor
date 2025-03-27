
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Box, Layers, Component } from "lucide-react";
import DigitalTwinScene from "@/components/digital-twin/DigitalTwinScene";

const DigitalTwin = () => {
  const [activeTab, setActiveTab] = useState("floor1");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Digital Twin Visualization</CardTitle>
              <CardDescription>Real-time 3D representation of site assets</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DigitalTwinScene activeFloor={activeTab} />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Asset Count</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">147 servers, 328 networking, 809 peripherals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Real-time Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.7% Online</div>
            <p className="text-xs text-muted-foreground">16 assets currently offline or in maintenance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Space Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <p className="text-xs text-muted-foreground">28% capacity available for expansion</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="floor1" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="floor1">Floor 1</TabsTrigger>
          <TabsTrigger value="floor2">Floor 2</TabsTrigger>
          <TabsTrigger value="floor3">Floor 3</TabsTrigger>
          <TabsTrigger value="serverRoom">Server Room</TabsTrigger>
        </TabsList>
        <TabsContent value="floor1" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Floor 1 - Operations Center</CardTitle>
              <CardDescription>Primary operations and monitoring center</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-muted rounded-md aspect-video relative flex items-center justify-center">
                  <Layers className="h-8 w-8 text-aramco-teal opacity-50" />
                  <div className="absolute bottom-2 right-2">
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("floor1")}>View In 3D</Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Asset Summary</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex justify-between">
                        <span>Workstations</span>
                        <span>42</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Monitoring Displays</span>
                        <span>16</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Network Equipment</span>
                        <span>8</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Environmental Controls</span>
                        <span>12</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Current Status</h4>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm">All systems operational</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="floor2" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Floor 2 - Administration</CardTitle>
              <CardDescription>Administrative offices and meeting rooms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-muted rounded-md aspect-video relative flex items-center justify-center">
                  <Layers className="h-8 w-8 text-aramco-teal opacity-50" />
                  <div className="absolute bottom-2 right-2">
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("floor2")}>View In 3D</Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Asset Summary</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex justify-between">
                        <span>Office Workstations</span>
                        <span>36</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Conference Rooms</span>
                        <span>4</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Office Equipment</span>
                        <span>52</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Communication Systems</span>
                        <span>8</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Current Status</h4>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm">All systems operational</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="floor3" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Floor 3 - Research & Development</CardTitle>
              <CardDescription>R&D labs and testing facilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-muted rounded-md aspect-video relative flex items-center justify-center">
                  <Layers className="h-8 w-8 text-aramco-teal opacity-50" />
                  <div className="absolute bottom-2 right-2">
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("floor3")}>View In 3D</Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Asset Summary</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex justify-between">
                        <span>Testing Equipment</span>
                        <span>28</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Development Workstations</span>
                        <span>24</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Prototype Models</span>
                        <span>12</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Research Systems</span>
                        <span>16</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Current Status</h4>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                      <span className="text-sm">Maintenance in progress on 2 systems</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="serverRoom">
          <Card>
            <CardHeader>
              <CardTitle>Server Room - Data Center</CardTitle>
              <CardDescription>Primary data center with critical infrastructure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-muted rounded-md aspect-video relative flex items-center justify-center">
                  <Component className="h-8 w-8 text-aramco-teal opacity-50" />
                  <div className="absolute bottom-2 right-2">
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("serverRoom")}>View In 3D</Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Asset Summary</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex justify-between">
                        <span>Server Racks</span>
                        <span>24</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Network Switches</span>
                        <span>16</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Storage Arrays</span>
                        <span>8</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Cooling Units</span>
                        <span>6</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Environmental Metrics</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex justify-between">
                        <span>Temperature</span>
                        <span>18.5°C</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Humidity</span>
                        <span>45%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Power Usage</span>
                        <span>68%</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DigitalTwin;
