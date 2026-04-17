# ZeroToken Architecture: The Proxy Layer

ZeroToken operates as a middleware infrastructure layer between your autonomous agent and the LLM provider. It is built to ensure consistent OPEX regardless of agent loop frequency.

## The Stack
- **Edge Runtime:** Next.js API Routes deployed on Vercel for ultra-low latency.
- **State & Telemetry:** Supabase for tracking request origins and enforcing flat-rate limits.
- **Core Engine:** Custom Auto-Truncator Algorithm.

## The Payload Pipeline

1. **Interception:** The agent sends a standard OpenAI payload to `api.zerotoken.dev`.
2. **Analysis:** The engine parses the `messages` array, measuring the token weight of the `system` prompt, tool descriptions, and historical context.
3. **Deduplication:** Frameworks often accidentally inject the `IDENTITY.md` multiple times in a retry loop. The proxy strips duplicate system headers.
4. **Smart Truncation:** If the payload approaches the model's context limit, the proxy aggressively prunes the middle of the conversation history (the dead weight) while strictly preserving:
   - The primary system instructions.
   - The most recent user input.
   - Active tool call JSONs.
5. **Forwarding:** The optimized payload is sent to the target LLM. 
6. **Response:** The LLM's response is streamed back to the agent with zero structural changes.

By handling this server-side, the client-side agent framework remains lightweight and never crashes from `400 Bad Request: Context Window Exceeded`.
