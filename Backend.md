# Backend Infrastructure

## Core Principles

1.  **Dependency Inversion**: Services depend on Interfaces, not concrete Repositories.
2.  **Zod Everywhere**: Validation happens before Service execution using Zod schemas.
3.  **No Direct DB in API**: API routes are thin controllers. All logic lives in Services.

## Modular Config
Located in `src/config/`. Config is validated at runtime to ensure required environment variables exist.

## Error Handling
Located in `src/lib/errors/`. Use specific custom errors to trigger correct API responses:
-   `NotFoundError` (404)
-   `ValidationError` (400)
-   `UnauthorizedError` (401)
-   `ConflictError` (409)

## Logging
Structured JSON/Console logging with request tracing.
-   Include `requestId` and `userId` context in logs.
