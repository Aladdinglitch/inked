import { z } from "zod";

export const bookingSchema = z.object({
  serviceType: z.literal("tattoo"),
  artistId: z.string().min(1, "Select an artist"),
  styleId: z.string().min(1, "Select a style"),
  placement: z.string().min(1, "Select placement"),
  size: z.string().min(1, "Select size"),
  budget: z.string().min(1, "Select budget"),
  preferredDate: z.string().min(1, "Choose a preferred date"),
  alternateDate: z.string().optional(),
  whatsapp: z.string().optional(),
  name: z.string().min(2, "Name is required"),
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

export const piercingSchema = z.object({
  serviceType: z.literal("piercing"),
  piercingLocation: z.string().min(1, "Select a piercing location"),
  locationDetail: z.string().optional(),
  earDetail: z.string().optional(),
  noseDetail: z.string().optional(),
  navelDetail: z.string().optional(),
  nippleDetail: z.string().optional(),
  jewelry: z.string().min(1, "Select jewellery preference"),
  jewelryOther: z.string().optional(),
  quantity: z.string().min(1, "Select quantity"),
  firstPiercing: z.string().optional(),
  previousDetails: z.string().optional(),
  preferredDate: z.string().min(1, "Choose a preferred date"),
  preferredTime: z.string().optional(),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Phone is required"),
  notes: z.string().optional(),
});

export type PiercingFormValues = z.infer<typeof piercingSchema>;
