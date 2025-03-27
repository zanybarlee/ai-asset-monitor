
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { shutdownFormSchema, ShutdownFormValues } from "./shutdown/schema";
import { BasicInfoSection } from "./shutdown/BasicInfoSection";
import { ScheduleSection } from "./shutdown/ScheduleSection";
import { SettingsSection } from "./shutdown/SettingsSection";
import { ImpactedSystemsSection } from "./shutdown/ImpactedSystemsSection";

interface NewShutdownDialogProps {
  open: boolean;
  onClose: () => void;
}

const NewShutdownDialog = ({ open, onClose }: NewShutdownDialogProps) => {
  const { toast } = useToast();
  const [selectedSystems, setSelectedSystems] = useState<string[]>([]);

  const form = useForm<ShutdownFormValues>({
    resolver: zodResolver(shutdownFormSchema),
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

  const handleSubmit = (values: ShutdownFormValues) => {
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
              <BasicInfoSection form={form} />
              <ScheduleSection form={form} />
              <SettingsSection form={form} />
            </div>

            <ImpactedSystemsSection form={form} />

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
