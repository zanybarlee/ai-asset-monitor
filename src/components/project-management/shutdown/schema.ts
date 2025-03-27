
import { z } from "zod";

// Schema for form validation
export const shutdownFormSchema = z.object({
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

export type ShutdownFormValues = z.infer<typeof shutdownFormSchema>;
