<div align="center">
  <h1>🟢 ZeroToken</h1>
  <p><b>The Flat-Rate API Proxy for Autonomous AI Agents</b></p>
  
  [![Website](https://img.shields.io/badge/Website-zerotoken.dev-10B981?style=for-the-badge&logo=vercel)](https://www.zerotoken.dev)
  [![Stack](https://img.shields.io/badge/Stack-Next.js_%7C_Supabase-black?style=for-the-badge&logo=next.js)](https://www.zerotoken.dev)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

  <p>Stop paying per token. Protect your margins and prevent context crashes with server-side payload truncation.</p>
</div>

---

## 📖 Table of Contents
- [The Problem](#-the-problem)
- [How ZeroToken Works](#-how-zerotoken-works)
- [Core Features](#-core-features)
- [Quick Start](#-quick-start)
- [Architecture](#-architecture)
- [FAQ](#-faq)

---

## 🚨 The Problem: The "$200 Weekend"
If you are building AI SaaS products or autonomous loops using frameworks like **OpenClaw, LangChain, or AutoGPT**, you've likely hit the infrastructure wall:

1. **Unpredictable OPEX:** Agents inject system prompts (`IDENTITY.md`) and full history into *every single step*. A 4,500-token payload looping 20 times a minute will burn through your OpenAI credits instantly.
2. **Context Crashes:** If left unchecked, the memory bloat eventually hits the LLM's context limit, throwing a `400 Bad Request` and killing the task at 99% completion.
3. **Degraded UX:** Developers try to fix this by using "cheaper/dumber" models or manually deleting chat history, which makes the AI hallucinate and forget instructions.

---

## 🛠 How ZeroToken Works
ZeroToken acts as a transparent, high-performance middleware between your application and the LLM provider. 

Instead of connecting directly to `api.openai.com`, you route your requests through `api.zerotoken.dev`. Our Next.js Edge proxy intercepts the massive payloads, applies our **Auto-Truncator Algorithm** to silently prune dead weight, and forwards the optimized request to the model.

**Result:** Your agent stays smart, never crashes, and you pay a flat monthly rate.

---

## ✨ Core Features
* **Drop-in Replacement:** 100% compatible with the OpenAI SDK. Zero code rewrites required.
* **Auto-Truncation Engine:** Intelligently deduplicates repeating headers and prunes the middle of the conversation history while strictly protecting your core system prompts.
* **Flat-Rate Billing ($40/mo):** Shift from usage-based anxiety to predictable SaaS margins. Run infinite loops without watching the meter.
* **Privacy First:** ZeroToken is a pass-through proxy. We do not store, log, or train on your payloads. 

---

## 🚀 Quick Start

Getting started takes less than 30 seconds. You only need to change two lines of code in your existing setup.

### Node.js / OpenAI SDK
```javascript
import { OpenAI } from "openai";

const client = new OpenAI({
  baseURL: "[https://api.zerotoken.dev/v1](https://api.zerotoken.dev/v1)", // <-- 1. Point to ZeroToken
  apiKey: "zk_your_zerotoken_key",         // <-- 2. Use your ZeroToken Key
});

const response = await client.chat.completions.create({
  model: "gpt-4-turbo",
  messages: [{ role: "user", content: "Hello world" }],
});
