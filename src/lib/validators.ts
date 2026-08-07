import { z } from "zod";

export const bookingSchema = z.object({
  artistId: z.string().min(1, "Select an artist"),
  styleId: z.string().min(1, "Select a style"),
  placement: z.string().min(1, "Select placement"),
  size: z.string().min(1, "Select size"),
  budget: z.string().min(1, "Select budget"),
  preferredDate: z.string().min(1, "Choose a preferred date"),
  alternateDate: z.string().optional(),  whatsapp: z.string().optional(),  name: z.string().min(2, "Name is required"),
  email: z.email("Enter a valid email"),
  phone: z.string().min(7, "Phone is required"),
  notes: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Enter a valid email"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message is too short"),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
export type ContactFormValues = z.infer<typeof contactSchema>;
