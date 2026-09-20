import { defineTool } from "@lovable.dev/mcp-js";
import { SERVICES } from "../data";

export default defineTool({
  name: "list_services",
  title: "List services",
  description: "List the services Areeb offers and that can be booked.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text" as const,
        text: SERVICES.map((s) => `- ${s.name}: ${s.description}`).join("\n"),
      },
    ],
    structuredContent: {
      services: SERVICES.map((s) => ({ name: s.name, description: s.description })),
    },
  }),
});
