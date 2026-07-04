# Folder Structure

```text
src/
├── app/                  # Next.js App Router (Pages & APIs)
│   ├── api/              # API Routes (Thin controllers)
│   └── (routes)/         # Frontend and Dashboard pages
├── components/           # React Components (UI, Dashboard, etc.)
├── config/               # Centralized Zod-validated configuration
├── lib/                  # Utilities and core infrastructure
│   ├── api-response/     # API formatting helpers
│   ├── errors/           # Custom error classes
│   ├── logger/           # Advanced logging system
│   ├── upload/           # Upload provider abstraction
│   ├── ai/               # AI provider interfaces
│   └── request-id.ts     # Request tracing utility
├── repositories/         # Database interaction layer
│   ├── interfaces/       # Repository interfaces (e.g. IPortfolioRepository)
│   └── prisma/           # Concrete Prisma implementations
├── services/             # Pure business logic (depends on repositories)
├── validators/           # Zod schemas for input validation
└── types/                # Global TypeScript definitions
```
