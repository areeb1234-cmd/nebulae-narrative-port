import { defineMcp } from "@lovable.dev/mcp-js";
import getProfileTool from "./tools/get-profile";
import listServicesTool from "./tools/list-services";
import listProjectsTool from "./tools/list-projects";
import sendMessageTool from "./tools/send-message";
import requestBookingTool from "./tools/request-booking";

export default defineMcp({
  name: "astral-canvas",
  title: "Astral Canvas",
  version: "0.1.0",
  instructions:
    "Public tools for M. Areeb's developer portfolio. Use get_profile for contact details, list_services and list_projects to explore his work, send_message to contact him, and request_booking to reserve a weekday service slot. Always collect the person's real name, email, and (for bookings) phone number before submitting.",
  tools: [
    getProfileTool,
    listServicesTool,
    listProjectsTool,
    sendMessageTool,
    requestBookingTool,
  ],
});
