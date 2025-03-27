
import { UseFormReturn } from "react-hook-form";
import { ShutdownFormValues } from "./schema";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface SettingsSectionProps {
  form: UseFormReturn<ShutdownFormValues>;
}

export const SettingsSection = ({ form }: SettingsSectionProps) => {
  return (
    <>
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
    </>
  );
};
