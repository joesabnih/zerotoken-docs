/**
 * ZeroToken Integration for OpenClaw
 * * Since ZeroToken acts as a direct mirror to the OpenAI API, 
 * integrating it into your OpenClaw agent requires zero code rewrites.
 * You only need to override the baseURL and point it to your ZeroToken proxy.
 */

import { OpenClawAgent } from "openclaw";

const agent = new OpenClawAgent({
  model: "gpt-4-turbo",
  // 1. Point the baseURL to the ZeroToken Flat-Rate Proxy
  baseURL: "https://api.zerotoken.dev/v1",
  // 2. Use your ZeroToken Access Key instead of the OpenAI key
  apiKey: process.env.ZEROTOKEN_API_KEY,
  
  systemPrompt: "./IDENTITY.md",
  tools: ["search", "readFile", "executeCommand"]
});

// The agent will now run its loops. 
// Context bloat is handled server-side by ZeroToken.
await agent.run("Analyze the local codebase and generate a summary report.");
