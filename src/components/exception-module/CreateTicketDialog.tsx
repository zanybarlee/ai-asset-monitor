
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { ticketFormSchema, TicketFormValues } from "./ticketSchema";
import { BasicTicketFields } from "./BasicTicketFields";
import { CategoryPriorityFields } from "./CategoryPriorityFields";

export function CreateTicketDialog({ 
  open, 
  onClose 
}: { 
  open: boolean; 
  onClose: () => void 
}) {
  // Initialize form with react-hook-form and zod resolver
  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      priority: "",
      location: "",
    },
  });

  // Handle form submission
  function onSubmit(values: TicketFormValues) {
    // In a real application, you would send this data to your API
    console.log(values);
    toast({
      title: "Ticket created",
      description: "Your support ticket has been successfully created.",
    });
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create Support Ticket</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new support ticket. Required fields are marked with an asterisk.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <BasicTicketFields form={form} />
            <CategoryPriorityFields form={form} />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Submit Ticket</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
