# Portfolio App Backend Contract

This file is the single source of truth for backend expectations of this portfolio app.

## 1. App Overview (End-to-End)

The app has these data-driven areas:

1. Home page

- Selected work (projects)
- Competitive programming snapshot (ratings/stats)
- Journey timeline
- Writing teaser (latest blog posts)

2. Blog

- Blog list page
- Blog detail page
- RSS feed and sitemap entries derived from blog data

3. Projects

- Projects list page
- Project detail page (with long-form content)

4. Static profile pages

- About
- Contact

Current state in code:

- Most data currently comes from local files (`content/*.mdx`, `data/*.ts`).
- `app/api/blog/route.ts` exists but is currently a placeholder.

Target state described in this document:

- Backend provides JSON APIs for the same data so frontend can switch from local-file reads to API reads.

## 2. API Standards

### 2.1 Base path

- Base path: `/api`
- Content-Type: `application/json; charset=utf-8`

### 2.2 Response envelope

All JSON endpoints should use the same envelope.

Success:

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request payload",
    "details": []
  }
}
```

### 2.3 Common backend rules

1. Dates must be ISO-8601 strings (`YYYY-MM-DD` or full ISO timestamp).
2. `slug` is unique per resource.
3. Draft blog posts should be excluded from public APIs unless explicitly requested by authenticated admin.
4. Use stable ordering:

- Blog: newest first by `date`
- Projects: featured first, then by title or created date

5. Include cache headers where possible for read endpoints.

## 3. Data Models Expected by Frontend

### 3.1 BlogPostMeta

```json
{
  "slug": "building-basecase",
  "title": "Building BaseCase: A DSA Tracking Platform",
  "description": "How I designed a relational data model...",
  "date": "2026-02-15",
  "category": "Engineering",
  "tags": ["next.js", "prisma", "postgresql", "architecture"],
  "featured": true,
  "draft": false,
  "readingTime": 6
}
```

### 3.2 BlogPostDetail

```json
{
  "meta": {
    "slug": "building-basecase",
    "title": "Building BaseCase: A DSA Tracking Platform",
    "description": "How I designed a relational data model...",
    "date": "2026-02-15",
    "category": "Engineering",
    "tags": ["next.js", "prisma"],
    "featured": true,
    "draft": false,
    "readingTime": 6
  },
  "content": "## The Problem...",
  "contentFormat": "mdx"
}
```

### 3.3 ProjectData

```json
{
  "slug": "basecase",
  "title": "BaseCase",
  "description": "A DSA tracking platform...",
  "longDescription": "Full-stack DSA practice tracking platform...",
  "impact": "500+ problems tracked",
  "stack": ["Next.js", "TypeScript", "PostgreSQL"],
  "demoUrl": "https://basecase.vercel.app",
  "githubUrl": "https://github.com/akash/basecase",
  "featured": true,
  "status": "active",
  "content": "## Problem Definition...",
  "contentFormat": "mdx"
}
```

### 3.4 CPStats

```json
{
  "leetcode": {
    "rating": 1868,
    "solved": 400,
    "profile": "https://leetcode.com/akash",
    "percentile": "Top 5%"
  },
  "codeforces": {
    "rating": 1450,
    "maxRating": 1500,
    "profile": "https://codeforces.com/profile/akash",
    "percentile": "Top 15%"
  },
  "codechef": {
    "stars": 2,
    "rating": 1500,
    "profile": "https://codechef.com/users/akash"
  },
  "guardian": {
    "current": 1868,
    "target": 2200
  },
  "lastUpdated": "2026-03-01"
}
```

### 3.5 TimelineEvent

```json
{
  "year": "2026",
  "title": "Portfolio v2 & Blog Launch",
  "description": "Rebuilt personal site from scratch...",
  "type": "project"
}
```

## 4. Endpoint Contract

## 4.1 Blog APIs

### GET `/api/blog`

Purpose:

- Blog list page
- Home page writing teaser
- Source data for RSS and sitemap generation

Query params:

- `tag` (optional, string)
- `featured` (optional, boolean)
- `page` (optional, number)
- `limit` (optional, number)

200 response:

```json
{
  "success": true,
  "data": [
    {
      "slug": "building-basecase",
      "title": "Building BaseCase: A DSA Tracking Platform",
      "description": "How I designed a relational data model...",
      "date": "2026-02-15",
      "category": "Engineering",
      "tags": ["next.js", "prisma"],
      "featured": true,
      "draft": false,
      "readingTime": 6
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "hasNextPage": false
  }
}
```

### GET `/api/blog/:slug`

Purpose:

- Blog detail page
- OG image generation input

200 response:

```json
{
  "success": true,
  "data": {
    "meta": {
      "slug": "building-basecase",
      "title": "Building BaseCase: A DSA Tracking Platform",
      "description": "How I designed...",
      "date": "2026-02-15",
      "category": "Engineering",
      "tags": ["next.js"],
      "featured": true,
      "draft": false,
      "readingTime": 6
    },
    "content": "## The Problem...",
    "contentFormat": "mdx"
  }
}
```

404 response:

```json
{
  "success": false,
  "error": {
    "code": "BLOG_NOT_FOUND",
    "message": "Blog post not found"
  }
}
```

### POST `/api/blog` (Admin)

Status:

- Route file exists as placeholder in current app (`app/api/blog/route.ts`).

Purpose:

- Create a blog post from an admin panel or CMS webhook.

Request body:

```json
{
  "slug": "transaction-patterns",
  "title": "Transaction Patterns in Prisma",
  "description": "How to keep writes consistent",
  "date": "2026-03-05",
  "category": "Engineering",
  "tags": ["prisma", "postgresql"],
  "featured": false,
  "draft": true,
  "content": "## Intro..."
}
```

201 response:

```json
{
  "success": true,
  "data": {
    "slug": "transaction-patterns"
  }
}
```

## 4.2 Project APIs

### GET `/api/projects`

Purpose:

- Home page selected work
- Projects list page

200 response:

```json
{
  "success": true,
  "data": [
    {
      "slug": "basecase",
      "title": "BaseCase",
      "description": "A DSA tracking platform...",
      "longDescription": "Full-stack DSA practice tracking platform...",
      "impact": "500+ problems tracked",
      "stack": ["Next.js", "TypeScript", "PostgreSQL"],
      "demoUrl": "https://basecase.vercel.app",
      "githubUrl": "https://github.com/akash/basecase",
      "featured": true,
      "status": "active"
    }
  ]
}
```

### GET `/api/projects/:slug`

Purpose:

- Project detail page

200 response:

```json
{
  "success": true,
  "data": {
    "slug": "basecase",
    "title": "BaseCase",
    "description": "A DSA tracking platform...",
    "longDescription": "Full-stack DSA practice tracking platform...",
    "impact": "500+ problems tracked",
    "stack": ["Next.js", "TypeScript", "PostgreSQL"],
    "demoUrl": "https://basecase.vercel.app",
    "githubUrl": "https://github.com/akash/basecase",
    "featured": true,
    "status": "active",
    "content": "## Problem Definition...",
    "contentFormat": "mdx"
  }
}
```

## 4.3 CP Stats API

### GET `/api/cp-stats`

Purpose:

- Home page CP snapshot cards

200 response:

```json
{
  "success": true,
  "data": {
    "leetcode": {
      "rating": 1868,
      "solved": 400,
      "profile": "https://leetcode.com/akash",
      "percentile": "Top 5%"
    },
    "codeforces": {
      "rating": 1450,
      "maxRating": 1500,
      "profile": "https://codeforces.com/profile/akash",
      "percentile": "Top 15%"
    },
    "codechef": {
      "stars": 2,
      "rating": 1500,
      "profile": "https://codechef.com/users/akash"
    },
    "guardian": {
      "current": 1868,
      "target": 2200
    },
    "lastUpdated": "2026-03-01"
  }
}
```

## 4.4 Timeline API

### GET `/api/timeline`

Purpose:

- Home page journey section

200 response:

```json
{
  "success": true,
  "data": [
    {
      "year": "2024",
      "title": "Started B.Tech CSE",
      "description": "Began Computer Science & Engineering...",
      "type": "education"
    }
  ]
}
```

## 4.5 Contact API (recommended)

### POST `/api/contact`

Purpose:

- Handle contact submissions from contact page/form.

Request body:

```json
{
  "name": "Akash",
  "email": "akash@example.com",
  "message": "Interested in collaborating"
}
```

Validation:

- `name`: required, 2-80 chars
- `email`: required, valid email
- `message`: required, 10-2000 chars

201 response:

```json
{
  "success": true,
  "data": {
    "id": "msg_01J...",
    "receivedAt": "2026-03-05T10:00:00.000Z"
  }
}
```

## 5. Non-Functional Requirements

1. Performance

- P95 response time under 300ms for read endpoints.
- Use caching for blog/project list endpoints.

2. Security

- Admin write endpoints (`POST /api/blog`) require auth token.
- Add rate limiting on `POST /api/contact`.
- Sanitize/validate all request payloads.

3. Reliability

- Return typed errors with consistent `error.code` values.
- Avoid partial writes by using transactions for multi-step operations.

## 6. Implementation Priority

1. `GET /api/blog`
2. `GET /api/blog/:slug`
3. `GET /api/projects`
4. `GET /api/projects/:slug`
5. `GET /api/cp-stats`
6. `GET /api/timeline`
7. `POST /api/contact`
8. `POST /api/blog` (admin)

## 7. Current Gap Snapshot

At the moment, these are true in this repo:

1. The frontend still reads from local files and in-repo data constants.
2. `app/api/blog/route.ts` exists but has no logic yet.
3. The backend contract above is ready for implementation without changing UI data shape expectations.
