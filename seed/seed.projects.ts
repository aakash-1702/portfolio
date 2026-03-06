import { prisma } from "../lib/prisma";

const projects = [
  {
    slug: "basecase",
    title: "BaseCase",
    description:
      "A modern developer portfolio and technical writing platform built to showcase engineering projects, backend systems, and long-form technical content.",
    longDescription:
      "BaseCase is a full-featured portfolio platform purpose-built for developers who want to present their engineering work with clarity. It combines a structured project showcase with a technical blog engine, allowing visitors to explore real-world projects, understand architectural decisions, and follow engineering learnings. Built with a modular component architecture on Next.js, the platform is optimized for readability, SEO, and easy extensibility — serving as a central hub for backend engineering projects, development experiments, and technical insights.",
    impact:
      "Live production platform · SEO-optimized technical writing · Modular architecture for easy extension",
    stack: ["Next.js", "React", "TypeScript", "TailwindCSS", "Vercel"],
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

export async function seedProjects() {
  console.log("  📦 Seeding projects...");

  // Clear all existing projects first
  await prisma.project.deleteMany();

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  console.log(`  ✓ ${projects.length} projects seeded`);
}
