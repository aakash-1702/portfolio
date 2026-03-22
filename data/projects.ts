import type { ProjectData } from "@/lib/types";

export const projects: ProjectData[] = [
  {
    slug: "basecase",
    title: "BaseCase",
    description:
      "An AI-powered mock interview platform with a real-time voice agent — candidates speak to an AI interviewer that listens, reasons, and responds just like a real interview.",
    longDescription:
      "BaseCase is a full-stack interview preparation platform built around one core belief: great interview performance comes from structured repetition, pattern recognition, and timely guidance. At its center is a live AI Mock Interviewer — a real-time voice pipeline where candidates speak naturally and an AI interviewer responds with follow-up questions, probing deeper into their reasoning. The voice layer is built from first principles: browser-based STT via the Web Speech API, a stateful conversation history sent to the AI model on every turn, TTS conversion of the AI response, and a strict client-side state machine (loading → speaking → answering → recording → submitting) that enforces the sequential nature of voice interaction. Beyond the voice agent, BaseCase offers curated DSA sheets, an AI Mentor for problem-solving guidance, and an SM-2 inspired spaced repetition engine that surfaces the right problems at the right time — turning prep from aimless grinding into a repeatable system.",
    impact:
      "Live AI voice interviewer · Real-time STT/TTS pipeline · SM-2 spaced repetition engine · AI Mentor guidance",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "TailwindCSS",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Vercel",
    ],
    demoUrl: "https://basecase-xi.vercel.app/",
    githubUrl: "https://github.com/aakash-1702/basecase",
    featured: true,
    status: "active",
  },
  {
    slug: "medbackend",
    title: "MedBackend",
    description:
      "A transaction-safe doctor appointment booking backend with slot-locking, concurrency control, and Redis-backed performance — designed to prevent double bookings under load.",
    longDescription:
      "MedBackend is an end-to-end backend system engineered to solve real-world scheduling challenges in healthcare. It manages doctor availability, patient registration, and appointment booking with a focus on data consistency and reliability. The system handles concurrent booking attempts through slot-locking mechanisms and transaction-safe scheduling logic, ensuring no double bookings even under simultaneous requests. The architecture follows clean separation of controllers, services, and routes, with Redis powering the locking layer for low-latency performance. Built as a team project — responsible for designing and implementing the complete backend system and core scheduling logic.",
    impact:
      "Concurrency-safe booking · Redis slot-locking · RESTful API with clean service architecture",
    stack: ["Node.js", "Express.js", "PostgreSQL", "Redis"],
    githubUrl: "https://github.com/aakash-1702/medBackend",
    featured: true,
    status: "active",
  },
  {
    slug: "bookstore-backend",
    title: "Bookstore Backend",
    description:
      "A production-grade backend for managing an online bookstore, demonstrating industry-standard API design, modular service layers, and scalable MongoDB data modeling.",
    longDescription:
      "This project implements a complete backend system for an online bookstore, built during the IBM Backend Development Certification program. It demonstrates core backend engineering principles: modular service layers separating business logic from routing, RESTful API design following industry conventions, and scalable MongoDB schemas for managing books, users, and orders. The system includes structured request validation, consistent error handling, and a clean project architecture designed for maintainability and growth.",
    impact:
      "IBM Certification project · Modular MVC architecture · Scalable MongoDB schema design",
    stack: ["Node.js", "Express.js", "MongoDB"],
    githubUrl: "https://github.com/aakash-1702/BOOKSTORE",
    featured: false,
    status: "active",
  },
];
