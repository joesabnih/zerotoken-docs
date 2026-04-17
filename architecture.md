# System Architecture: ZeroToken Proxy Layer

ZeroToken is engineered to act as a transparent, high-throughput middleware between autonomous AI agents and Large Language Model (LLM) APIs. 

By offloading context management from the client to the edge infrastructure, we eliminate variable token billing and prevent context window crashes.

## Infrastructure Stack
* **Proxy Engine:** Next.js API Routes (deployed on Vercel Edge Network for global low latency).
* **State & Telemetry:** Supabase (PostgreSQL) for API key validation, rate limiting, and flat-rate billing enforcement.
* **Core Logic:** ZeroToken Auto-Truncator Algorithm.

## Request Lifecycle

```text
[ Autonomous Agent ] 
        |
        | (1) Standard OpenAI Payload (Contains heavy IDENTITY.md & History)
        v
[ api.zerotoken.dev ] ---> (2) Supabase: Validate API Key & Active Subscription
        |
        | (3) Interception & Parsing: Analyze the `messages` array
        | (4) Deduplication: Strip duplicate system headers injected by retry loops
        | (5) Smart Truncation: Prune dead weight (middle history) if payload > limit
        v
[ Optimized Payload ] 
        |
        | (6) Forward to LLM Provider (OpenAI, Groq, etc.)
        v
[ Target LLM API ]
        |
        | (7) Stream completion response
        v
[ Autonomous Agent ] (Receives response seamlessly)
