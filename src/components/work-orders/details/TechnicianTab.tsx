
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2 } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface TechnicianTabProps {
  onComplete: (data: any) => void;
}

const TechnicianTab = ({ onComplete }: TechnicianTabProps) => {
  const form = useForm({
    defaultValues: {
      technicalNotes: "",
      completionStatus: "fixed",
      hoursSpent: "1.5",
      signature: true
    }
  });
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onComplete)} className="space-y-4">
        <FormField
          control={form.control}
          name="technicalNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technical Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your technical notes here..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="completionStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Completion Status</FormLabel>
                <FormControl>
                  <select 
                    className="w-full border rounded-md p-2"
                    {...field}
                  >
                    <option value="fixed">Fixed</option>
                    <option value="partially_fixed">Partially Fixed</option>
                    <option value="needs_parts">Needs Parts</option>
                    <option value="escalated">Escalated</option>
                  </select>
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="hoursSpent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hours Spent</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Technician Signature</Label>
          <div className="border rounded-md p-4 flex items-center justify-center bg-gray-50 h-24">
            <img 
              src="/lovable-uploads/1cf1a6e4-1a43-48dc-ab7f-6485698d145a.png" 
              alt="Technician Signature" 
              className="max-h-full object-contain"
            />
          </div>
        </div>
        
        <div className="pt-4 flex justify-end">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TechnicianTab;
