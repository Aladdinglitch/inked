import { z } from "zod";
import { piercingLocations, tattooPlacements } from "@/content/piercings";

const optionalText = (max: number) => z.string().trim().max(max).optional();
const phoneSchema = z.string().trim().min(7).max(30).regex(/^\+?[0-9\s().-]+$/, "Enter a valid phone number");
const httpsUrlSchema = z.string().url().refine((value) => value.startsWith("https://"), "Reference links must use HTTPS");

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
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.email("Enter a valid email").max(254),
  phone: phoneSchema,
  notes: optionalText(5000),
  website: z.string().max(200).optional(),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.email("Enter a valid email").max(254),
  phone: phoneSchema.optional(),
  subject: z.string().trim().min(2, "Subject is required").max(200),
  message: z.string().trim().min(10, "Message is too short").max(5000),
  website: z.string().max(200).optional(),
});

export const piercingSchema = z.object({
  serviceType: z.literal("piercing"),
  piercingLocation: z.string().min(1, "Select a piercing location"),
  locationDetail: optionalText(500),
  earDetail: optionalText(100),
  noseDetail: optionalText(100),
  navelDetail: optionalText(100),
  nippleDetail: optionalText(100),
  jewelry: z.string().min(1, "Select jewellery preference").max(100),
  jewelryOther: optionalText(300),
  quantity: z.string().min(1, "Select quantity").max(30),
  firstPiercing: z.enum(["Yes", "No", "Not sure"], { message: "Tell us about your piercing experience" }),
  previousDetails: optionalText(2000),
  preferredDate: z.string().min(1, "Choose a preferred date"),
  preferredTime: z.string().max(30).optional(),
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.email("Enter a valid email").max(254),
  phone: phoneSchema,
  notes: optionalText(5000),
  website: z.string().max(200).optional(),
});

const appointmentSchema = z.object({
  preferredDate: z.string().max(30).optional(),
  preferredTime: z.string().max(30).optional(),
  alternateDate: z.string().max(30).optional(),
});

const baseInquirySchema = {
  name: z.string().trim().min(2).max(100),
  email: z.email().max(254),
  phone: phoneSchema,
  appointment: appointmentSchema.optional(),
  message: optionalText(5000),
};

export const tattooInquirySchema = z.strictObject({
  type: z.literal("tattoo"),
  ...baseInquirySchema,
  tattoo: z.strictObject({
    placement: z.enum(tattooPlacements),
    style: z.string().trim().min(1).max(100),
    size: z.string().trim().max(100).optional(),
    budget: z.string().trim().max(100).optional(),
    description: optionalText(3000),
    referenceUrl: httpsUrlSchema.optional(),
    referenceFiles: z.array(z.string().trim().min(1).max(255)).max(10).optional(),
  }),
  context: z.strictObject({
    artistId: z.string().trim().max(100).optional(),
    whatsapp: z.string().trim().max(30).optional(),
  }).optional(),
});

export const piercingInquirySchema = z.strictObject({
  type: z.literal("piercing"),
  ...baseInquirySchema,
  piercing: z.strictObject({
    location: z.enum(piercingLocations),
    locationDetail: z.string().trim().max(500).optional(),
    jewelryPreference: z.string().trim().max(300).optional(),
    quantity: z.string().trim().max(30).optional(),
    firstPiercing: z.boolean().optional(),
    previousExperience: optionalText(2000),
  }),
  context: z.strictObject({
    experienceAnswer: z.enum(["Yes", "No", "Not sure"]).optional(),
    referenceFiles: z.array(z.string().trim().min(1).max(255)).max(10).optional(),
  }).optional(),
});

export const contactInquirySchema = z.strictObject({
  type: z.literal("contact"),
  name: z.string().trim().min(2).max(100),
  email: z.email().max(254),
  phone: phoneSchema.optional(),
  message: z.string().trim().min(1).max(5000),
  subject: z.string().trim().max(200).optional(),
});

export const inquiryDataSchema = z.discriminatedUnion("type", [
  tattooInquirySchema,
  piercingInquirySchema,
  contactInquirySchema,
]);

export const inquiryRequestSchema = z.strictObject({
  type: z.enum(["tattoo", "piercing", "contact"]),
  data: z.unknown(),
  website: z.string().max(200).optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
export type ContactFormValues = z.infer<typeof contactSchema>;
export type PiercingFormValues = z.infer<typeof piercingSchema>;
export type InquiryPayload = z.infer<typeof inquiryDataSchema>;
