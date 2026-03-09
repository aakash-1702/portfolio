import { prisma } from "../lib/prisma";

const blogPosts = [
  {
    slug: "basecase-interview-prep-platform",
    title: "BaseCase: One-Stop Solution for End-to-End Interview Preparedness",
    description:
      "How BaseCase transforms coding interview preparation from scattered problem-solving into a structured, AI-guided system with spaced repetition and mock interviews.",
    date: "2026-03-05",
    category: "Engineering",
    tags: ["basecase", "dsa", "interview-prep", "ai", "spaced-repetition"],
    featured: true,
    draft: false,
    content: `## BaseCase: A Smarter Way to Prepare for Coding Interviews

Coding interview preparation should build confidence, not confusion.
Yet for most students and developers, the journey feels scattered from day one.

There are thousands of problems across LeetCode, Codeforces, and GeeksforGeeks. But more choice has not meant better outcomes. It has often meant more anxiety, inconsistent practice, and weak foundations.

---

## The Real Problem with Interview Prep Today

Most learners face the same bottlenecks:

- **No structured learning path** — decision fatigue from choosing what to solve next
- **Jumping into hard problems too early** — skipping foundational patterns
- **Lack of personalized mentorship** — getting stuck with no one to ask
- **Resources fragmented across platforms** — constant context switching

The result is predictable: lots of effort, but low direction. People spend time *planning* practice instead of *actually* practicing.

---

## Enter BaseCase: Interview Prep as a System, Not a Guessing Game

BaseCase is designed to make DSA preparation **clear, progressive, and practical**. Instead of random problem solving, it gives learners a guided roadmap where every step has intent.

The platform is built around one core belief:

> Great interview performance comes from **structured repetition**, **pattern recognition**, and **timely guidance**.

---

## Core Features

### 1. Structured Sheets That Build Fundamentals First

BaseCase uses curated sheets as complete learning tracks. These are not just collections of links — they are ordered sequences designed around how interview skills are actually built.

Each sheet is:
- **Pattern-first** — problems grouped by technique, not topic surface
- **Difficulty-ramped** — easy → medium → hard within each section
- **Organized into sections** for progressive, incremental learning

Learners move from foundational topics like arrays, hashing, and two pointers toward advanced areas like dynamic programming, graphs, and trees. This reduces randomness and prevents the common mistake of attempting advanced problems before mastering core patterns.

### 2. Curated Problem Sets for Effective DSA Practice

BaseCase emphasizes high-quality problem sets selected for **transfer learning**. Each problem is chosen not just because it is popular, but because it teaches a reusable pattern that appears across many interview questions.

This is the key shift from passive grinding to effective practice:
- Fewer random questions
- More pattern depth
- Better long-term recall

**The goal is simple:** every solved problem should improve your ability to solve future problems faster.

### 3. AI Mentor: Personalized Guidance Without Mentor Dependency

One of the strongest differentiators of BaseCase is its **AI Mentor**.

Many learners fail not because they are lazy, but because they get stuck with no one to ask. The AI Mentor closes that gap by acting as an always-available problem-solving coach.

It helps learners:
- Understand the problem and constraints
- Validate whether their approach is on track
- Think through edge cases
- Debug logic step by step
- Improve reasoning without spoiling the full answer too early

Interview success depends on **thinking quality**, not memorized answers. The AI Mentor is designed to guide that thinking process — making mentorship scalable and accessible 24/7.

### 4. SM-2 Inspired Revision for Long-Term Retention

Most platforms focus on solving new problems. BaseCase also focuses on **remembering** solved ones.

Its revision engine uses an **SM-2 inspired spaced repetition** approach to decide when a learner should revisit a problem. Each solved problem gets a review interval and a next recommended revision date, adjusted by confidence.

Typical behavior:
- **High confidence** → interval expands faster
- **Medium confidence** → interval grows moderately
- **Low confidence** → interval resets for near-term revision

In practical terms, BaseCase keeps surfacing the right problems at the right time — before they are forgotten. This directly fights the *"I solved it once but can't solve it again"* problem that costs candidates in real interviews.

Revision is no longer guesswork. It is **data-driven and personalized**.

### 5. Upcoming: AI Mock Interviewer

BaseCase is building an **AI Mock Interviewer** as a major upcoming feature.

The vision is to simulate realistic interview rounds:
- Timed pressure
- Follow-up probing questions
- Mandatory thought-process explanation
- Interview-style adaptive questioning
- Deep post-session feedback and readiness scoring

This bridges the final gap between solving problems alone and performing live in front of an interviewer — from *"I can solve on my own"* to *"I can communicate and solve under pressure."*

---

## Why This Approach Works

BaseCase combines three things most learners need but rarely get together:

| Pillar | How |
|--------|-----|
| **Direction** | Structured sheets and curated progression |
| **Coaching** | AI Mentor guidance |
| **Retention** | SM-2 based revision recommendations |
| **Simulation** | AI mock interviews *(upcoming)* |

That stack turns interview prep from a chaotic routine into a **repeatable system**.

---

## Final Thoughts

Interview prep should not feel like wandering through infinite problem lists. It should feel like **skill-building with intent**.

BaseCase delivers exactly that: a focused path, effective DSA practice through sheets and problem sets, intelligent AI mentoring, and a revision system that makes learning stick.

For learners serious about improving interview outcomes:

**Less confusion. More consistency. Better problem-solving depth. Real interview readiness.**`,
    contentFormat: "mdx",
  },
  {
    slug: "building-realtime-ai-voice-agent",
    title: "Building a Real-Time AI Voice Agent From Scratch",
    description:
      "A first-principles breakdown of voice pipelines, browser APIs, latency problems, and the architecture decisions that actually matter — from building BaseCase's AI mock interviewer.",
    date: "2026-03-09",
    category: "Engineering",
    tags: [
      "ai",
      "voice-ai",
      "websockets",
      "browser-apis",
      "architecture",
      "basecase",
    ],
    featured: true,
    draft: false,
    content: `I was building a mock interview platform.

The idea was simple: a candidate speaks to an AI interviewer, the AI listens, reasons, and responds — just like a real interview. No typing. No clicking. Just conversation.

The problem was I wanted to build the voice layer myself. No third-party services abstracting the hard parts away. I wanted to understand what was actually happening under the hood.

What followed was one of the most instructive engineering experiences I've had — and also one of the most humbling.

This is a complete breakdown of how real-time AI voice agents work, how to build a working prototype, where the prototype breaks down at scale, and how to fix it.

---

## Part 1 — The Mental Model

Before writing a single line of code, you need to understand what a voice agent actually is at its core.

A voice agent is nothing more than a **pipeline**. Data enters one end as sound waves. It exits the other end as sound waves again. Everything in between is transformation.

The pipeline has six stages: audio capture, speech-to-text, AI inference, text-to-speech, audio playback, and back to capture. Each stage has a cost — in latency, in accuracy, in complexity.

The most common mistake engineers make when building voice agents is treating this as one problem. **It is six problems.** Solve them one at a time.

---

## Part 2 — Capturing Audio (The Browser Layer)

In a browser environment, audio capture happens through the **Web Speech API** or the **MediaRecorder API**. They solve different problems.

**Web Speech API** handles both capture and transcription in one step. The browser sends audio to a speech recognition service (usually Google's) and returns a transcript. It's fast, straightforward, and works in Chrome and Edge out of the box.

The \`interimResults: true\` flag is critical — it makes the browser emit partial transcripts in real time as the user speaks, rather than waiting until they stop. This creates the live transcript effect. \`continuous: true\` keeps recognition going past the first pause until you explicitly stop it.

**What breaks here:** Firefox doesn't support the Web Speech API at all. Brave blocks it by default. Safari has partial support. This isn't a bug you can fix — it's a browser policy decision. Handle it by detecting support at runtime and degrading gracefully.

**MediaRecorder API** is lower level. It captures raw audio chunks and hands you binary data useful for sending to your own STT service (Whisper, Deepgram, AssemblyAI). More control, more complexity, more latency budget consumed.

For a prototype, Web Speech API is the right call. For production at scale, MediaRecorder plus a dedicated STT service gives you more control over accuracy and cross-browser support.

---

## Part 3 — Speech to Text

If you use Web Speech API, STT is handled for you. The browser returns structured transcript data.

If you're rolling your own, you capture audio chunks with MediaRecorder and send them to a transcription service, then pass the result to Whisper or a similar model on the server.

**The finalization problem:** When the user stops speaking, STT engines need a brief moment to finalize the last few words. If you grab the transcript immediately on stop, you'll often miss the last word or two. The fix is simple — wait 300ms after stopping before reading the final transcript.

Small detail. Significant impact on perceived accuracy.

---

## Part 4 — The AI Layer

Once you have a transcript, you send it to your AI model. The key design decision here is how you manage conversation history.

A conversational AI has no memory between requests. Every request is stateless. To simulate a continuous conversation, you must send the entire conversation history with every request.

The simplest representation is a flat array of strings — even indices are AI messages, odd indices are user messages. Role is derived from position. You reconstruct the full conversation history from this array on every turn.

This is the correct architecture for a prototype. The cost is that the context window grows with every turn — eventually hitting token limits. Production systems handle this with sliding window context or summarization. For a prototype, it's not a concern.

---

## Part 5 — Text to Speech

Once the AI generates a response, you convert it to audio. On the server, you call a TTS service and get back base64-encoded audio. On the client, you decode it, create a blob URL, play it, and — critically — revoke the URL when done.

Two things matter here:

The \`onended\` callback is where you unlock the microphone for the next user turn. The mic should never be available while AI audio is playing — that creates confusion and terrible UX.

**Always revoke your blob URLs.** Every \`URL.createObjectURL\` call allocates memory. In a long interview session where the AI speaks dozens of times, not revoking those URLs adds up to a meaningful memory leak.

---

## Part 6 — State Management

The most underrated part of building a voice agent is managing UI state correctly. Voice is inherently sequential — you can't be speaking and listening at the same time. Your state machine needs to enforce this strictly.

The phases: \`loading\` → \`speaking\` → \`answering\` → \`recording\` → \`submitting\` → back to \`speaking\` (or \`complete\` / \`error\`).

Every UI element reads from this single phase variable. The microphone button only exists during \`answering\` and \`recording\`. The AI orb animates differently per phase.

**A single state variable controlling the entire UI is the correct architecture.** Multiple boolean flags (\`isListening\`, \`isPlaying\`, \`isLoading\`) that need to be kept in sync is a path to subtle, hard-to-reproduce bugs.

---

## Part 7 — The Full Request Cycle

A single turn, end to end: user clicks Speak → STT starts → user speaks → transcript updates live → user clicks Done → 300ms finalization pause → POST to server with full conversation history → AI generates response → TTS converts to audio → client plays it → mic unlocks → cycle repeats.

This works. It's a complete, functional voice agent. But it has a problem.

---

## Part 8 — The Latency Problem

The sequential pipeline takes 2.5 to 6 seconds per turn: STT finalization (300ms) + network round-trip + AI inference (1–3s) + TTS conversion (500ms–1.5s).

In a real conversation, 3 seconds of silence after you stop speaking feels broken. At 5 seconds it feels like the system crashed.

This is the fundamental tension in voice AI: **the pipeline is sequential by nature, but the user experience demands it feels instantaneous.**

Here's how you fix it, in order of complexity:

**Fix 1 — Stream the AI response.** Begin TTS as soon as you have the first complete sentence. The user starts hearing audio 300–500ms after the AI starts generating. This alone cuts perceived latency by 60–70%.

**Fix 2 — WebSocket instead of HTTP.** A persistent WebSocket connection eliminates the 200–400ms per-request connection overhead. Connection established once; messages flow in both directions with near-zero overhead per turn.

**Fix 3 — Parallel TTS and AI.** Start generating audio for sentence 1 while the AI is still generating sentences 2 and 3. Audio playback begins within 500–800ms. Subsequent sentences buffer and play without gaps.

**Fix 4 — Edge deployment.** Deploy AI and TTS calls from edge functions geographically close to your users. For a regional prototype it's minor. For a global product it's a significant lever.

---

## Part 9 — The Architecture That Scales

The prototype uses request-response: HTTP in, HTTP out, everything sequential.

The production architecture uses a streaming pipeline: a persistent WebSocket carries both user audio transcripts and streaming AI audio chunks. The AI generates sentence by sentence, each sentence is immediately sent to TTS, and audible response starts playing before the AI has finished thinking.

This is the same architecture used by Siri and Alexa. The reason they feel instantaneous is not that the AI is faster — **it's that audio starts playing before the AI has finished thinking.**

---

## What I Actually Learned

Building this from first principles taught me things I couldn't have learned any other way.

I now understand why every voice AI demo uses streaming — it's not an optimization, it's a **requirement** for the experience to feel natural. I understand why browser compatibility is a first-class engineering concern. I understand why state management in voice UIs requires a strict state machine rather than a collection of flags.

Most importantly, I understand the difference between a pipeline that *works* and a pipeline that *feels good*. They are not the same thing.

---

## The Takeaway

1. Build the sequential prototype first. Don't optimize prematurely.
2. Measure actual latency at each stage before trying to reduce it.
3. Add streaming to the AI layer first — biggest gain, least complexity.
4. Replace HTTP with WebSockets for sub-second perceived response time.
5. Add parallel TTS only when you need the last 20% of latency reduction.

The sequential prototype is not a failure state. It is the foundation that makes the optimizations meaningful.

**Build the foundation. Then make it fast.**

---

*The voice agent described in this post powers BaseCase's AI Mock Interviewer — live and working. Still making it faster.*`,
    contentFormat: "mdx",
  },
];

export async function seedBlogPosts() {
  console.log("  📝 Seeding blog posts...");

  for (const post of blogPosts) {
    const wordCount = post.content.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: { ...post, readingTime },
      create: { ...post, readingTime },
    });
  }

  console.log(`  ✓ ${blogPosts.length} blog post(s) seeded`);
}
