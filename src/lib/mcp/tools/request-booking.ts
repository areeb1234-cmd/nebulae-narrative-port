import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { BOOKABLE_SERVICES } from "../data";
import { supabaseAnon } from "../supabase";

export default defineTool({
  name: "request_booking",
  title: "Request a booking",
  description:
    "Request a service booking with Areeb on a chosen weekday. Use list_services first to pick a valid service name.",
  inputSchema: {
    full_name: z.string().trim().min(1).max(100).describe("Requester's full name."),
    email: z.string().trim().email().max(255).describe("Requester's email address."),
    phone: z.string().trim().min(1).max(20).describe("Requester's phone number."),
    service: z.string().trim().min(1).describe("One of the services from list_services."),
    booking_date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .describe("Requested date as YYYY-MM-DD. Must be a future weekday."),
    message: z.string().trim().max(1000).optional().describe("Optional extra details."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ full_name, email, phone, service, booking_date, message }) => {
    if (!BOOKABLE_SERVICES.includes(service)) {
      throw new ToolError(
        `Unknown service "${service}". Available services: ${BOOKABLE_SERVICES.join(", ")}.`,
      );
    }
    const requested = new Date(`${booking_date}T00:00:00Z`);
    if (Number.isNaN(requested.getTime())) throw new ToolError("booking_date is not a valid date.");
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    if (requested < today) throw new ToolError("booking_date must be today or later.");
    const weekday = requested.getUTCDay();
    if (weekday === 0 || weekday === 6) {
      throw new ToolError("Bookings are only available on weekdays (Monday to Friday).");
    }

    const { error } = await supabaseAnon().from("bookings").insert({
      full_name,
      email,
      phone,
      service,
      booking_date,
      message: message ?? null,
    });
    if (error) throw new ToolError(`Could not create the booking: ${error.message}`);

    return {
      content: [
        {
          type: "text" as const,
          text: `Booking request for ${service} on ${booking_date} submitted. Areeb will confirm by email at ${email}.`,
        },
      ],
      structuredContent: { booking: { full_name, email, service, booking_date } },
    };
  },
});
