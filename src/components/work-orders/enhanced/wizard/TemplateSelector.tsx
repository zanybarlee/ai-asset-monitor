
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TemplateSelectorProps {
  templateType: string;
  setTemplateType: (type: string) => void;
}

const TemplateSelector = ({ templateType, setTemplateType }: TemplateSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>Select Template</Label>
      <Tabs defaultValue="blank" value={templateType} onValueChange={setTemplateType} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="blank">Blank</TabsTrigger>
          <TabsTrigger value="department">Department</TabsTrigger>
          <TabsTrigger value="asset">Asset Specific</TabsTrigger>
        </TabsList>
        
        <TabsContent value="blank" className="space-y-4 mt-4">
          <div className="border rounded-md p-4 bg-muted/30">
            <h4 className="font-medium mb-2">Blank Template</h4>
            <p className="text-sm text-muted-foreground">
              Start with a blank work order form. You'll need to fill in all the details manually.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="department" className="space-y-4 mt-4">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select department template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electrical">Electrical Department</SelectItem>
              <SelectItem value="mechanical">Mechanical Department</SelectItem>
              <SelectItem value="plumbing">Plumbing Department</SelectItem>
              <SelectItem value="hvac">HVAC Department</SelectItem>
            </SelectContent>
          </Select>
        </TabsContent>
        
        <TabsContent value="asset" className="space-y-4 mt-4">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select asset template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hvac">HVAC Quarterly Maintenance</SelectItem>
              <SelectItem value="generator">Generator Monthly Test</SelectItem>
              <SelectItem value="ups">UPS Battery Inspection</SelectItem>
              <SelectItem value="electrical">Electrical Panel Inspection</SelectItem>
            </SelectContent>
          </Select>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TemplateSelector;
