// 21st SDK agent definition. Deployed separately via the 21st CLI — see
// the TODO at the bottom of this file for the manual steps required
// before the chat widget in ChatLauncher.tsx will actually respond.
import { agent, tool } from "@21st-sdk/agent";
import { z } from "zod";

const PLATFORM_CAPABILITIES = [
  { name: "Scan to Product Truth", summary: "Resolves label, sourcing, and safety data into one verified record per scan." },
  { name: "Label Intelligence", summary: "Parses labels into structured, queryable data, including allergen detection." },
  { name: "Personalised Product Safety", summary: "Flags risk against an owner's personal safety profile at scan time." },
  { name: "Retail Operations Engine", summary: "Syncs inventory, compliance, and recall status across every retail location." },
  { name: "Business Pulse", summary: "Real-time analytics on scans, partners, uptime, and recall response time." },
  { name: "Private by Design", summary: "Owner data is encrypted at rest and never shared without explicit consent." },
  { name: "Complete RADHA Ecosystem", summary: "Brands, retailers, and owners all read from the same source of truth." },
];

export default agent({
  model: "claude-sonnet-4-6",
  systemPrompt:
    "You are the RADHA assistant. You help visitors understand the RADHA " +
    "platform — a connected system for product truth spanning label " +
    "intelligence, retail operations, and private owner insight. Keep " +
    "answers concise and point people to /contact for a live demo when " +
    "they want to go deeper than a conversation can.",
  tools: {
    platformCapabilities: tool({
      description:
        "Look up what a specific RADHA platform capability does, or list all of them if no name is given.",
      inputSchema: z.object({
        capability: z
          .string()
          .optional()
          .describe("Capability name to look up, e.g. 'Retail Operations Engine'"),
      }),
      execute: async ({ capability }) => {
        const matches = capability
          ? PLATFORM_CAPABILITIES.filter((c) =>
              c.name.toLowerCase().includes(capability.toLowerCase())
            )
          : PLATFORM_CAPABILITIES;

        const text =
          matches.length > 0
            ? matches.map((c) => `${c.name}: ${c.summary}`).join("\n")
            : `No capability matching "${capability}" — try one of: ${PLATFORM_CAPABILITIES.map((c) => c.name).join(", ")}.`;

        return { content: [{ type: "text", text }] };
      },
    }),
  },
});

// TODO(manual step): this agent must be deployed before the chat widget
// works. From this project's root, run yourself in a real terminal:
//   npx @21st-sdk/cli login
//   npx @21st-sdk/cli deploy
// Both require interactive input and cannot be run by an agent.
