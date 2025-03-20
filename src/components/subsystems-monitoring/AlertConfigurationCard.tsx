
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Settings, Bell, Shield, Zap, Thermometer, BellRing } from "lucide-react";

type AlertConfigProps = {
  handleSaveThreshold: () => void;
  handleSettingChange: (setting: string) => void;
  customThreshold: string;
  setCustomThreshold: (value: string) => void;
};

const AlertConfigurationCard = ({ 
  handleSaveThreshold, 
  handleSettingChange, 
  customThreshold, 
  setCustomThreshold 
}: AlertConfigProps) => {
  // Alert notification settings
  const alertSettings = [
    { name: "Electrical Alerts", enabled: true, icon: Zap },
    { name: "HVAC Alerts", enabled: true, icon: Thermometer },
    { name: "Safety System Alerts", enabled: true, icon: Shield },
    { name: "Email Notifications", enabled: true, icon: BellRing },
    { name: "SMS Notifications", enabled: false, icon: Bell },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          Alert Configuration
        </CardTitle>
        <CardDescription>Customize alert thresholds and notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ups-threshold">UPS Load Capacity Threshold (%)</Label>
            <div className="flex space-x-2">
              <Input 
                id="ups-threshold" 
                value={customThreshold} 
                onChange={(e) => setCustomThreshold(e.target.value)} 
              />
              <Button onClick={handleSaveThreshold}>Save</Button>
            </div>
          </div>
          
          <div className="space-y-3 pt-3">
            {alertSettings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <setting.icon className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor={`setting-${index}`}>{setting.name}</Label>
                </div>
                <Switch 
                  id={`setting-${index}`} 
                  checked={setting.enabled} 
                  onCheckedChange={() => handleSettingChange(setting.name)}
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertConfigurationCard;
