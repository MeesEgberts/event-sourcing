# Event Sourcing with NestJS

This repository demonstrates a small event-sourced system built with NestJS 11, CQRS, and PostgreSQL. It models a simple Invoices bounded context to show how to capture domain events, project read models, and expose an HTTP API with OpenAPI/Swagger documentation.

## Architecture

- **Core module (`src/core`)** — Configures two PostgreSQL connections with TypeORM: one for the event store and one for the read database. Connection names are pulled from environment variables so you can point each store to separate databases.
- **Shared module (`src/shared`)** — Houses the event-sourcing building blocks:
  - `VersionedAggregateRoot` extends NestJS `AggregateRoot` with stream versioning for optimistic concurrency.
  - `PgEventStore` persists serialized domain events into the `events` table and can replay them by stream.
  - Event serializers/deserializers, publishers, and subscribers wire domain events into the NestJS CQRS event bus.
  - `AggregateRehydrator` loads aggregates from historical events to rebuild state.
- **Invoices bounded context (`src/invoices`)** — Implements the example domain using CQRS:
  - **Domain**: `Invoice` aggregate reacts to events like `InvoicePaidEvent` and tracks its current `version` and status.
  - **Application**: Commands (`CreateInvoiceCommand`, `PayInvoiceCommand`) and queries (`FindInvoiceByIdQuery`, `FindAllInvoicesQuery`) are executed via `CommandBus`/`QueryBus` in `InvoicesService`.
  - **Infrastructure**: Repositories persist events and read models to PostgreSQL databases defined in the core module.
  - **Presentation**: `InvoicesController` exposes REST endpoints backed by DTO validation and documented through Swagger.
- **API docs** — Swagger is configured in `src/main.ts` and served at `/api` once the app is running.

## Project structure

```
src/
├─ core/                # Database connections for event store and read DB
├─ shared/              # Event store, aggregate base class, serializers, infrastructure
├─ invoices/            # Domain, application services, event handlers, HTTP controllers
└─ main.ts              # App bootstrap and Swagger configuration
```

## Getting started

### Prerequisites

- Node.js 20+
- pnpm (`npm install -g pnpm`)
- Docker (optional but recommended for local PostgreSQL via `docker-compose`)

### Install dependencies

```bash
pnpm install
```

### Configure environment

Create a `.env` file in the project root defining the two database connections:

```bash
# Event store connection
EVENT_STORE_HOST=localhost
EVENT_STORE_PORT=5432
EVENT_STORE_USERNAME=postgres
EVENT_STORE_PASSWORD=postgres
EVENT_STORE_DATABASE=event_store

# Read database connection
READ_DB_HOST=localhost
READ_DB_PORT=5433
READ_DB_USERNAME=postgres
READ_DB_PASSWORD=postgres
READ_DB_DATABASE=read_db

# API
PORT=3001
```

> Adjust the ports/usernames/passwords if you already have PostgreSQL running locally.

### Start supporting services (optional)

If you do not have databases running, start the ones defined in `docker-compose.yml`:

```bash
docker-compose up -d pg-event-store pg-read-db
```

### Run the application

```bash
# development mode with hot reload
pnpm run start:dev

# production build
pnpm run build
pnpm run start:prod
```

Once running, browse Swagger UI at [http://localhost:3001/api](http://localhost:3001/api) to explore the REST endpoints.

### Running tests

```bash
# unit tests
pnpm run test

# watch mode
pnpm run test:watch

# coverage
pnpm run test:cov
```

## Event flow walkthrough

1. **Command dispatch**: The controller calls `InvoicesService`, which dispatches commands through `CommandBus`.
2. **Domain logic**: Command handlers load aggregates via `AggregateRehydrator`, invoke domain behaviors (e.g., `invoice.pay()`), and emit domain events.
3. **Event persistence**: `PgEventStore` serializes events into the `events` table with a stream position for optimistic concurrency.
4. **Projections**: Event handlers update read models in the read database so queries stay fast and side-effect-free.
5. **Queries**: Controllers use the `QueryBus` to read from the projection layer without touching the write model.

This separation keeps the domain consistent while providing a clean, testable surface for both writes and reads.

## API quick reference

- `POST /invoices` — Create an invoice (customer ID and amount).
- `GET /invoices` — List projected invoices from the read database.
- `GET /invoices/:id` — Fetch a single invoice read model.
- `POST /invoices/:id/pay` — Pay an invoice; appends an `InvoicePaidEvent` to the stream and updates projections.

## Troubleshooting

- Ensure both PostgreSQL instances are reachable with the credentials in your `.env` file.
- If schema tables are missing, confirm `synchronize: true` is acceptable for local development or create migrations for production.
- Use `pnpm run lint` to auto-fix lint issues before committing.

## License

MIT
