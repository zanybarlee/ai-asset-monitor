
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// Schema for form validation
const formSchema = z.object({
  name: z.string().min(3, { message: "Shutdown name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  date: z.date(),
  startTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Please enter a valid time (HH:MM)" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  impactedSystems: z.array(z.string()).min(1, { message: "At least one system must be selected" }),
  requiresApproval: z.boolean().default(true),
  notifyStakeholders: z.boolean().default(true),
  emergencyContact: z.string().min(3, { message: "Emergency contact is required" }),
  additionalNotes: z.string().optional(),
});

interface NewShutdownDialogProps {
  open: boolean;
  onClose: () => void;
}

const NewShutdownDialog = ({ open, onClose }: NewShutdownDialogProps) => {
  const { toast } = useToast();
  const [selectedSystems, setSelectedSystems] = useState<string[]>([]);
  const availableSystems = [
    "Power Distribution", "UPS Systems", "Cooling Infrastructure", "Network Equipment", 
    "Servers", "Security Systems", "Fire Detection", "Building Management"
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      date: new Date(),
      startTime: "08:00",
      duration: "4h",
      impactedSystems: [],
      requiresApproval: true,
      notifyStakeholders: true,
      emergencyContact: "",
      additionalNotes: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Add impacted systems to the form values
    values.impactedSystems = selectedSystems;
    
    // In a real app, you would save the new shutdown to your backend
    console.log("New shutdown data:", values);
    
    toast({
      title: "Shutdown scheduled",
      description: `${values.name} has been successfully scheduled`,
    });
    
    onClose();
  };
  
  const toggleSystem = (system: string) => {
    setSelectedSystems((prev) => 
      prev.includes(system) 
        ? prev.filter(s => s !== system) 
        : [...prev, system]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule New Shutdown</DialogTitle>
          <DialogDescription>
            Fill in the details below to schedule a new maintenance shutdown. Required fields are marked with an asterisk (*).
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Shutdown Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Shutdown Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Quarterly UPS Maintenance" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter detailed description of shutdown activities" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Shutdown Date *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Start Time */}
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" placeholder="HH:MM" {...field} />
                      </div>
                    </FormControl>
                    <FormDescription>Use 24-hour format (e.g., 08:00, 14:30)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Duration */}
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Duration *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1h">1 hour</SelectItem>
                        <SelectItem value="2h">2 hours</SelectItem>
                        <SelectItem value="4h">4 hours</SelectItem>
                        <SelectItem value="6h">6 hours</SelectItem>
                        <SelectItem value="8h">8 hours</SelectItem>
                        <SelectItem value="12h">12 hours</SelectItem>
                        <SelectItem value="1d">1 day</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Emergency Contact */}
              <FormField
                control={form.control}
                name="emergencyContact"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Emergency Contact *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <AlertTriangle className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" placeholder="Contact name and phone number" {...field} />
                      </div>
                    </FormControl>
                    <FormDescription>Person responsible during the shutdown</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Approval Required */}
              <FormField
                control={form.control}
                name="requiresApproval"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Requires Management Approval</FormLabel>
                      <FormDescription>
                        This shutdown requires explicit management approval before proceeding
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {/* Notify Stakeholders */}
              <FormField
                control={form.control}
                name="notifyStakeholders"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Notify All Stakeholders</FormLabel>
                      <FormDescription>
                        Automatically notify all relevant stakeholders about this shutdown
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {/* Additional Notes */}
              <FormField
                control={form.control}
                name="additionalNotes"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any additional information or special instructions" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Impacted Systems */}
            <FormItem>
              <FormLabel>Impacted Systems *</FormLabel>
              <div className="flex flex-wrap gap-2 mt-2">
                {availableSystems.map((system) => (
                  <Button
                    key={system}
                    type="button"
                    variant={selectedSystems.includes(system) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSystem(system)}
                  >
                    {system}
                  </Button>
                ))}
              </div>
              {form.formState.errors.impactedSystems && (
                <p className="text-sm font-medium text-destructive mt-2">
                  {form.formState.errors.impactedSystems.message}
                </p>
              )}
            </FormItem>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Schedule Shutdown</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewShutdownDialog;
