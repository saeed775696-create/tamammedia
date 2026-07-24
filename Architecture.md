# Architecture Overview

## Phase 2.4 - Core Infrastructure

The project follows a layered architecture to ensure separation of concerns, testability, and scalability.

### Layers

1.  **API Route Layer (`src/app/api/...`)**
    -   Responsible for receiving HTTP requests.
    -   Extracts data and generates a Request ID.
    -   Calls Validators.
    -   Calls the Service Layer.
    -   Formats responses using standard API Response helpers.

2.  **Validation Layer (`src/validators/...`)**
    -   Uses Zod to parse and validate incoming data securely *before* business logic executes.

3.  **Service Layer (`src/services/...`)**
    -   Contains pure business logic.
    -   **NEVER** imports `prisma` directly.
    -   Interacts exclusively with the Repository Layer.

4.  **Repository Layer (`src/repositories/...`)**
    -   Abstracts database operations.
    -   Exposes standard methods: `findById`, `findMany`, `create`, `update`, `delete`, `count`, `paginate`, `search`.
    -   Implemented via Interfaces (e.g., `IPortfolioRepository`) to allow for future database swapping without altering the Service Layer.
    -   Prisma specific implementations are located in `src/repositories/prisma/`.

### Cross-Cutting Concerns
-   **Configuration (`src/config/`)**: Strongly typed and modularized settings (app, auth, db, upload, ai, seo, analytics).
-   **Logging (`src/lib/logger/`)**: Advanced structured logging (info, warn, error, debug, audit) carrying Request IDs.
-   **Error Handling (`src/lib/errors/`)**: Standardized custom errors (`ApiError`, `ValidationError`, etc.) mapping to proper HTTP statuses.
