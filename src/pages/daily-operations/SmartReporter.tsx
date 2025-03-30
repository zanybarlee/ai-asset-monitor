
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUploader } from "@/components/daily-operations/smart-reporter/FileUploader";
import { ReportGenerator } from "@/components/daily-operations/smart-reporter/ReportGenerator";
import { ReportHistory } from "@/components/daily-operations/smart-reporter/ReportHistory";
import { Plus, History, FileText } from "lucide-react";

const SmartReporter = () => {
  const [activeTab, setActiveTab] = useState("generate");
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Smart Reporter</h3>
          <p className="text-muted-foreground">
            Generate structured reports from various data sources using AI
          </p>
        </div>
        <Button onClick={() => setActiveTab("generate")}>
          <Plus className="mr-2 h-4 w-4" />
          New Report
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="generate">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="mr-2 h-4 w-4" />
            Report History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>New Smart Report</CardTitle>
              <CardDescription>
                Upload files or provide links to generate AI-powered reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FileUploader />
              <ReportGenerator />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <ReportHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartReporter;
