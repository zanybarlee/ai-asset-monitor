
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Database, LayoutDashboard, Bell, Shield, Link, Check, X } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
        <p className="text-muted-foreground">
          Configure system preferences and integrations
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-4 space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Dashboard Settings</CardTitle>
              <CardDescription>Configure your dashboard preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="refresh-rate">Dashboard Refresh Rate (seconds)</Label>
                <Input id="refresh-rate" type="number" defaultValue="60" />
                <p className="text-sm text-muted-foreground">How often the dashboard should automatically refresh data</p>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-critical">Show Critical Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Display critical system alerts on dashboard
                    </p>
                  </div>
                  <Switch id="show-critical" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-warnings">Show Warnings</Label>
                    <p className="text-sm text-muted-foreground">
                      Display warning notifications on dashboard
                    </p>
                  </div>
                  <Switch id="show-warnings" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-maintenance">Show Maintenance Tasks</Label>
                    <p className="text-sm text-muted-foreground">
                      Display upcoming maintenance tasks on dashboard
                    </p>
                  </div>
                  <Switch id="show-maintenance" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Use dark theme across the application
                    </p>
                  </div>
                  <Switch id="dark-mode" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass">
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>Details about the CMMS system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">System Version</p>
                  <p className="text-sm text-muted-foreground">1.0.0</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Last Updated</p>
                  <p className="text-sm text-muted-foreground">August 12, 2023</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Database Status</p>
                  <div className="flex items-center gap-1">
                    <Badge className="bg-emerald-500">Connected</Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">API Status</p>
                  <div className="flex items-center gap-1">
                    <Badge className="bg-emerald-500">Operational</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-4 space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive system notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Alert Channels</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-alerts">Email Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts via email
                    </p>
                  </div>
                  <Switch id="email-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-alerts">SMS Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts via SMS
                    </p>
                  </div>
                  <Switch id="sms-alerts" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-alerts">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts via mobile push notifications
                    </p>
                  </div>
                  <Switch id="push-alerts" defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Notification Types</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="critical-alerts">Critical Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      System critical notifications that require immediate attention
                    </p>
                  </div>
                  <Switch id="critical-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="warning-alerts">Warnings</Label>
                    <p className="text-sm text-muted-foreground">
                      Warning notifications that may require attention
                    </p>
                  </div>
                  <Switch id="warning-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-reminders">Maintenance Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Reminders about upcoming scheduled maintenance
                    </p>
                  </div>
                  <Switch id="maintenance-reminders" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="system-updates">System Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications about system updates and changes
                    </p>
                  </div>
                  <Switch id="system-updates" />
                </div>
              </div>
              
              <Button className="w-full">Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-4 space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure system security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Authentication</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require two-factor authentication for all users
                    </p>
                  </div>
                  <Switch id="two-factor" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" />
                  <p className="text-sm text-muted-foreground">
                    How long before inactive users are automatically logged out
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="password-policy">Enforce Strong Password Policy</Label>
                    <p className="text-sm text-muted-foreground">
                      Require complex passwords and regular password changes
                    </p>
                  </div>
                  <Switch id="password-policy" defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Access Control</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ip-restriction">IP Address Restriction</Label>
                    <p className="text-sm text-muted-foreground">
                      Limit system access to specific IP addresses
                    </p>
                  </div>
                  <Switch id="ip-restriction" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="audit-logging">Enhanced Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">
                      Keep detailed logs of all system actions
                    </p>
                  </div>
                  <Switch id="audit-logging" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="max-login-attempts">Maximum Login Attempts</Label>
                  <Input id="max-login-attempts" type="number" defaultValue="5" />
                  <p className="text-sm text-muted-foreground">
                    Number of failed login attempts before account lockout
                  </p>
                </div>
              </div>
              
              <Button className="w-full">Save Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="mt-4 space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle>System Integrations</CardTitle>
              <CardDescription>Manage connections with external systems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border p-4 rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-md bg-blue-500/20 text-blue-500 grid place-items-center">
                      <Database className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Building Management System (BMS)</p>
                      <p className="text-sm text-muted-foreground">Connected to BMS v3.2</p>
                    </div>
                  </div>
                  <Badge className="flex items-center gap-1.5 bg-emerald-500">
                    <Check className="h-3 w-3" />
                    Connected
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between border p-4 rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-md bg-amber-500/20 text-amber-500 grid place-items-center">
                      <Bell className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Energy Management System (EPMS)</p>
                      <p className="text-sm text-muted-foreground">Connected to EPMS v2.1</p>
                    </div>
                  </div>
                  <Badge className="flex items-center gap-1.5 bg-emerald-500">
                    <Check className="h-3 w-3" />
                    Connected
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between border p-4 rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-md bg-emerald-500/20 text-emerald-500 grid place-items-center">
                      <LayoutDashboard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Digital Twin Platform</p>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Badge className="flex items-center gap-1.5 bg-muted-foreground/30 text-muted-foreground">
                    <X className="h-3 w-3" />
                    Disconnected
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between border p-4 rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-md bg-blue-500/20 text-blue-500 grid place-items-center">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">SAP Ticketing System</p>
                      <p className="text-sm text-muted-foreground">Connected to SAP v4.3</p>
                    </div>
                  </div>
                  <Badge className="flex items-center gap-1.5 bg-emerald-500">
                    <Check className="h-3 w-3" />
                    Connected
                  </Badge>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Add New Integration</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="api-endpoint">API Endpoint</Label>
                    <Input id="api-endpoint" placeholder="https://api.example.com" />
                  </div>
                  <div>
                    <Label htmlFor="api-type">Integration Type</Label>
                    <select id="api-type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option>Select type...</option>
                      <option>BMS</option>
                      <option>EPMS</option>
                      <option>Digital Twin</option>
                      <option>Ticketing</option>
                      <option>Custom</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input id="api-key" type="password" placeholder="Enter API key" />
                </div>
                
                <Button>
                  <Link className="mr-2 h-4 w-4" />
                  Connect Integration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
