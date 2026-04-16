# ZeroToken: Flat-Rate API Proxy for Autonomous Agents

ZeroToken is a high-performance proxy layer designed to solve the "Token Burn" problem in autonomous agent frameworks like OpenClaw, LangChain, and AutoGPT.

## The Problem: The $200 Weekend
Most autonomous agents are stateless by design. To maintain context, they inject system prompts, tool definitions, and full conversation history into every single API call. In complex loops, a 4,500-token system prompt is resent 10-20 times per minute, leading to:
- **Exponential Costs:** Variable billing that kills SaaS margins.
- **Context Crashes:** Sudden 400 errors when the payload exceeds the LLM's window.
- **Degraded UX:** Developers truncating history manually to save money, making agents "dumber."

## The Solution: Infrastructure-Level Truncation
ZeroToken intercepts the API request before it hits the provider (OpenAI/Groq). Our Next.js-based proxy performs real-time payload optimization:

1. **Deduplication:** Identifies and cleans repetitive system headers.
2. **Auto-Truncator Algorithm:** Silently prunes older message blocks while strictly protecting core `IDENTITY.md` instructions and active tool calls.
3. **Flat-Rate Billing:** Shifts the financial model from variable ($/token) to predictable ($40/month).

## Technical Stack
- **Edge Proxy:** Next.js (Vercel)
- **State Management:** Supabase
- **Compatibility:** 100% OpenAI API compatible (simply change `baseURL`).

## Quick Start
```javascript
const { OpenAI } = require("openai");

const client = new OpenAI({
  baseURL: "[https://api.zerotoken.dev/v1](https://api.zerotoken.dev/v1)",
  apiKey: "YOUR_ZEROTOKEN_KEY",
});
