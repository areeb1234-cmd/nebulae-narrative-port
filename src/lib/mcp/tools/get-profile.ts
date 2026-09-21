import { defineTool } from "@lovable.dev/mcp-js";
import { PROFILE } from "../data";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description:
    "Get M. Areeb's public profile: role, public contact details, location, and typical response time.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text" as const,
        text: `${PROFILE.name} — ${PROFILE.role}\nEmail: ${PROFILE.email}\nPhone: ${PROFILE.phone}\nLocation: ${PROFILE.location}\n${PROFILE.responseTime}`,
      },
    ],
    structuredContent: { profile: { ...PROFILE } },
  }),
});
