import { defineTool } from "@lovable.dev/mcp-js";
import { PROJECTS } from "../data";

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description: "List the featured projects in M. Areeb's portfolio with their tech stacks.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text" as const,
        text: PROJECTS.map(
          (p) => `- ${p.name} (${p.tech.join(", ")}): ${p.description}`,
        ).join("\n"),
      },
    ],
    structuredContent: {
      projects: PROJECTS.map((p) => ({
        name: p.name,
        description: p.description,
        tech: p.tech.map((t) => t),
      })),
    },
  }),
});
