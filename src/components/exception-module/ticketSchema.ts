
import { z } from "zod";

// Define the form schema with zod
export const ticketFormSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  priority: z.string().min(1, {
    message: "Please select a priority.",
  }),
  location: z.string().min(1, {
    message: "Please provide a location.",
  }),
});

export type TicketFormValues = z.infer<typeof ticketFormSchema>;
