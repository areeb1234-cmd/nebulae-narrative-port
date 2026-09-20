import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAnon } from "../supabase";

export default defineTool({
  name: "send_message",
  title: "Send a message",
  description:
    "Send Areeb a message through the portfolio contact form. Ask the sender for their real name and email first.",
  inputSchema: {
    name: z.string().trim().min(1).max(100).describe("Sender's full name."),
    email: z.string().trim().email().max(255).describe("Sender's email address."),
    subject: z.string().trim().min(1).max(200).describe("Short subject line."),
    message: z.string().trim().min(1).max(2000).describe("Message body."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ name, email, subject, message }) => {
    const { error } = await supabaseAnon()
      .from("contact_submissions")
      .insert({ name, email, subject, message });
    if (error) throw new ToolError(`Could not send the message: ${error.message}`);
    return {
      content: [
        {
          type: "text" as const,
          text: `Message sent to Areeb. He usually replies within 24 hours at ${email}.`,
        },
      ],
    };
  },
});
