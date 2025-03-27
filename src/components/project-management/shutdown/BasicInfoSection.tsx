
import { UseFormReturn } from "react-hook-form";
import { ShutdownFormValues } from "./schema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle } from "lucide-react";

interface BasicInfoSectionProps {
  form: UseFormReturn<ShutdownFormValues>;
}

export const BasicInfoSection = ({ form }: BasicInfoSectionProps) => {
  return (
    <>
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
    </>
  );
};
