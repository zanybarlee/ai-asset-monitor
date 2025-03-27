
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Calendar, Clock, FileText, Users } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Report title must be at least 3 characters",
  }),
  description: z.string().optional(),
  frequency: z.enum(["Daily", "Weekly", "Monthly", "Quarterly"]),
  format: z.enum(["PDF", "Excel", "CSV", "HTML"]),
  recipients: z.string().min(3, {
    message: "Please add at least one recipient email",
  }),
});

type ReportFormValues = z.infer<typeof formSchema>;

interface CreateReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateReportDialog({ open, onOpenChange }: CreateReportDialogProps) {
  const defaultValues: Partial<ReportFormValues> = {
    title: "",
    description: "",
    frequency: "Daily",
    format: "PDF",
    recipients: "",
  };

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (data: ReportFormValues) => {
    // In a real application, this would send the data to an API
    console.log("Creating new report:", data);
    
    toast({
      title: "Report scheduled successfully",
      description: `${data.title} will run ${data.frequency.toLowerCase()}`,
    });
    
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle>Create Scheduled Report</DialogTitle>
          <DialogDescription>
            Set up a new automated report for your facility operations
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report Title</FormLabel>
                  <FormControl>
                    <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                      <FileText className="mx-3 h-4 w-4 text-muted-foreground" />
                      <Input className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Daily Operations Summary" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief description of what the report will contain" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Daily">Daily</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="format"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Report Format</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PDF">PDF Document</SelectItem>
                        <SelectItem value="Excel">Excel Spreadsheet</SelectItem>
                        <SelectItem value="CSV">CSV File</SelectItem>
                        <SelectItem value="HTML">HTML Report</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="recipients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipients</FormLabel>
                  <FormControl>
                    <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                      <Users className="mx-3 h-4 w-4 text-muted-foreground" />
                      <Input className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="email@aramco.com, team@aramco.com" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Separate multiple email addresses with commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Report</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
