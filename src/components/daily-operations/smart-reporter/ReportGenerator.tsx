
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const reportFormSchema = z.object({
  reportTitle: z.string().min(3, {
    message: "Report title must be at least 3 characters",
  }),
  reportType: z.enum(["daily", "weekly", "monthly", "executive", "custom"]),
  audience: z.enum(["field", "site", "management"]),
  customPrompt: z.string().optional(),
  outputFormat: z.enum(["pdf", "docx", "pptx"]),
});

type ReportFormValues = z.infer<typeof reportFormSchema>;

export function ReportGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      reportTitle: "",
      reportType: "daily",
      audience: "field",
      customPrompt: "",
      outputFormat: "pdf",
    },
  });
  
  function onSubmit(data: ReportFormValues) {
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Report generation started",
        description: "Your report will be ready in a few moments",
      });
      console.log("Report generation data:", data);
    }, 2000);
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Report Configuration</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="reportTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Daily Tasks Summary - June 15" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reportType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="daily">Daily Report</SelectItem>
                      <SelectItem value="weekly">Weekly Report</SelectItem>
                      <SelectItem value="monthly">Monthly Report</SelectItem>
                      <SelectItem value="executive">Executive Summary</SelectItem>
                      <SelectItem value="custom">Custom Report</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="audience"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Target Audience</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="field" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Field Engineer (Detailed task reports)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="site" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Site Engineer (System status and tickets)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="management" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Management (KPIs and high-level metrics)
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="customPrompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custom Instructions (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Example: Generate a summary of all maintenance activities, highlighting critical issues and SLA compliance"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide specific instructions for the AI to focus on
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="outputFormat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Output Format</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select output format" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="docx">Word Document</SelectItem>
                    <SelectItem value="pptx">PowerPoint Presentation</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" disabled={isGenerating} className="w-full">
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Report...
              </>
            ) : (
              "Generate Report"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
