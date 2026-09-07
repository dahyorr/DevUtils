# Go Backend Rewrite — Design

**Date:** 2026-09-07
**Branch:** `go-rewrite`
**Status:** Approved, ready for implementation
**Nature:** Learning exercise. The author writes all implementation code; Claude
reviews each milestone at a checkpoint and advises on idiomatic Go.

## Goal

Port the existing NestJS/TypeScript backend (`backend/`) to Go, living in
`backend-go/`, using the Go standard library wherever practical. The Go service
is a drop-in replacement for the Node process: same HTTP contract, same external
services (Neon Postgres, S3, Python worker), same database schema.

## Current backend (what we are porting)

NestJS + TypeScript, listens on `:5000`, global prefix `/api`, CORS open,
Swagger at `/api/docs`, global validation pipe.

| Slice | Endpoints | Behavior |
|---|---|---|
| Upload | `POST /api/upload` | Multipart (20 MB cap) → `PutObject` to S3 → insert `File` row. `isTemp` form field prefixes the S3 key with `temp/`. Returns `{ fileId, message }`. |
| Hash | `POST /api/hash/initiate` | Validates `fileId` (UUID) and `hashTypes` (enum: md5/sha224/sha256/sha512), inserts one pending `Hash` row per type. Returns `{ message }`. |
| Hash | `GET /api/hash/result?fileId=` | Loads file + hashes. For each `pending` hash, calls the worker, writes the digest back, sets status `completed`. Returns the hash list. |
| Hash WS | socket.io namespace `/file-hash` | Client emits `hash-ready` `{ fileId, hashType }`; server polls the result logic ~1s until `completed`, emits `hash-completed` with a `HashData` body, then stops. |

External dependencies:
- **Neon Postgres** — schema owned by the existing Drizzle migrations in
  `backend/drizzle/`. Tables `File`, `Hash`; enums `HashType`, `HashStatus`.
  The Go service only reads/writes rows; it never owns the schema.
- **S3** — `@aws-sdk/client-s3`, `PutObjectCommand`.
- **Python worker** — `POST {WORKER_URL}/hash` with
  `{ file_path: "temp/<id>", hash_type }` → `{ hash, hashType, status }`.

RabbitMQ and Redis appear in `.env`/compose but the live code does not use them.
Not ported.

## Decisions

| Area | Choice | Rationale |
|---|---|---|
| HTTP | stdlib `net/http` + `http.ServeMux` with Go 1.22+ method+pattern routes | Learn the real server model; the routing needs are trivial. |
| Routing lib | none (no chi/echo/gin) | Stdlib mux covers 5 routes. |
| DB | `jackc/pgx/v5` + `pgxpool`, queries via **sqlc** | Typed, compile-checked, raw SQL, no ORM magic. Teaches the sqlc workflow. |
| Schema ownership | stays with Drizzle migrations in `backend/` | One source of truth; Go reads the tables. |
| S3 | `aws-sdk-go-v2` (`config` + `service/s3`) | Matches existing usage. |
| WebSocket | `github.com/coder/websocket` (ex `nhooyr.io/websocket`) | Small, context-first, idiomatic. Replaces socket.io entirely. |
| Config | plain `os.Getenv` in `config.Load()`, optional `godotenv` for local `.env` | Fail fast, no framework. |
| Validation | hand-written (UUID parse, enum whitelist) | No `class-validator` equivalent needed. |
| Swagger | hand-written `openapi/openapi.yaml` + embedded Swagger UI served at `/api/docs` | 4 endpoints; `//go:embed` the UI assets. Avoids `swaggo/swag` annotation codegen. |
| Testing | stdlib `testing` + `net/http/httptest`; hand-written fakes for S3/worker; real Postgres for integration (`testcontainers-go` or `DATABASE_URL_TEST`) | Go convention; teaches interface design. |
| Go version | current local toolchain (1.23/1.24) | — |

## Project layout

```
backend-go/
  go.mod  go.sum
  cmd/server/main.go        # wiring only: load config, open pool, build router, ListenAndServe, graceful shutdown
  config/config.go          # env -> Config struct, one Load() (Config, error)
  http/
    router.go               # ServeMux, route table, middleware chain
    middleware.go           # request logging, panic recovery, CORS
    respond.go              # writeJSON / writeError helpers
    upload_handler.go
    hash_handler.go
    ws_handler.go
  store/
    queries/*.sql           # authored by hand
    sqlc/                   # generated, do not edit
    store.go                # pgxpool + Store wrapping the generated Querier
  s3/s3.go                  # thin wrapper over aws-sdk-go-v2 PutObject
  worker/worker.go          # *http.Client wrapper for POST {WORKER_URL}/hash
  hash/hash.go              # service logic: orchestrates store + worker
  openapi/                  # openapi.yaml + embedded Swagger UI
```

Flat and boring on purpose. No `internal/domain/usecase` layering for a service
this size. No globals — the pool, config, S3 client, and worker client are
constructed in `main` and injected.

## HTTP contract

Unchanged from the current backend except the realtime transport:

- `GET  /healthz` — new, `200 {"status":"ok"}`
- `POST /api/upload` — multipart `file` + optional `isTemp`; `200 {"fileId","message"}`; missing file → `422`
- `POST /api/hash/initiate` — `{"fileId","hashTypes":[]}`; `200 {"message"}`; bad UUID / bad enum → `400`; unknown file → `404`
- `GET  /api/hash/result?fileId=` — `200 [HashData]`; unknown file → `404`; worker failure → `500`
- `GET  /api/ws/file-hash` — WebSocket. Client → `{"event":"hash-ready","fileId","hashType"}`. Server → `{"event":"hash-completed","data":{HashData}}`, then closes.
- `GET  /api/docs` — Swagger UI

## Milestones

Each milestone ends with something that runs and something testable. The author
builds it, then Claude reviews the diff at a checkpoint before the next one.

### M0 — Skeleton that boots
`go mod init`; `cmd/server/main.go` starts an `http.Server` on `:5000`;
`GET /healthz` → `200 {"status":"ok"}`; middleware chain (request logging, panic
recovery); graceful shutdown via `signal.NotifyContext` + `server.Shutdown`.
*Learn:* `http.Handler` vs `HandlerFunc`, middleware as `func(http.Handler) http.Handler`, server lifecycle.
*Test:* `httptest` on `/healthz`.

### M1 — Config
`config.Load() (Config, error)` reads `DATABASE_URL`, `S3_UPLOAD_BUCKET`,
`S3_REGION`, `WORKER_URL`, `PORT`. Missing vars → one error listing all of them.
`main` calls it first.
*Learn:* config struct pattern, returning errors not panicking, zero values.
*Test:* table test over set/unset env.

### M2 — DB pool + `File` read/write
`pgxpool` opened in `main`, injected. `store/queries/file.sql` with
`CreateFile` and `GetFileByID`; `sqlc generate`; `store.Store` wraps pool +
generated `Querier`.
*Learn:* `context.Context` threading, `defer pool.Close()`, sqlc workflow, row
scanning, `pgtype` null handling.
*Test:* integration test inserting + reading a `File` row against a real test DB.

### M3 — `POST /api/upload` end to end
Parse multipart (`http.MaxBytesReader` + `r.ParseMultipartForm`, 20 MB), read
`isTemp`, build key (`temp/<uuid>` or `<uuid>`, `google/uuid`),
`s3.PutObject`, `store.CreateFile`, return `{fileId,message}`. Missing file → 422.
*Learn:* stdlib multipart, streaming `io.Reader` to S3, body limits, error mapping, aws-sdk-go-v2.
*Test:* `httptest` + multipart body + fake S3 client (consumer-defined interface); optional real-S3 integration test.

### M4 — `POST /api/hash/initiate` + `GET /api/hash/result`
`initiate`: validate UUID + enum, insert N pending `Hash` rows (batch or loop in
a tx). `result`: load file + hashes; for each pending hash call the worker,
update row to `completed` with the digest; return the list, preserving the
current grouping/ordering behavior.
*Learn:* pgx transactions (`pool.Begin`, `defer tx.Rollback`), error wrapping/`errors.Join`, slice/map idioms, enum validation without a library.
*Test:* handler tests with a fake worker; integration test for DB transitions.

### M5 — Worker HTTP client
`worker.Client` with a configured `*http.Client` (explicit timeout);
`Hash(ctx, filePath, hashType) (Result, error)` does
`POST {WORKER_URL}/hash`, decodes the response, maps non-2xx to errors.
*Learn:* outbound HTTP in stdlib, `json.NewDecoder`, context timeout/cancellation, defining the interface at the consumer.
*Test:* `httptest.Server` as a stub worker.

### M6 — WebSocket (replaces socket.io)
`GET /api/ws/file-hash` upgrades with `coder/websocket`. Read a `hash-ready`
message; a per-connection goroutine polls the result logic on a `time.Ticker`
(~1s) until that hash is `completed`; send `hash-completed`; close. Goroutine and
poll loop bound to the request context so a disconnect cancels them.
*Learn:* goroutines, `select`, `time.Ticker`, context cancellation, read/write loop pattern.
*Test:* connect with the same lib in-test, drive one message through.

### M7 — Swagger
Hand-write `openapi/openapi.yaml` for the 4 endpoints; `//go:embed` Swagger UI
static assets; serve UI + spec at `/api/docs`.

### M8 — Frontend WebSocket client swap (optional, last)
Three files, all shrink:
- `frontend/helpers/socketManager.ts` — delete or replace with a ~20-line `WebSocket` wrapper.
- `frontend/hooks/useSocket.ts` — `useWebSocket` returning `{ send, lastMessage, open, close }`.
- `frontend/components/FileHashGenerator/HashPreview.tsx` — swap `socket.emit`/`socket.on` for `send` + a message effect; logic otherwise identical.
- Remove `socket.io-client` from `frontend/package.json`.

### Later / optional — Containerization
New `backend-go/Dockerfile` (multi-stage: `golang:1.x` build →
`distroless/static` or `alpine` run); point `docker-compose.yml`'s `backend`
service at `backend-go/`. Local `go run ./cmd/server` is fine until then.

## Explicitly out of scope

- RabbitMQ / Redis (dead in the current code)
- The commented-out cache logic in `hash.service.ts`
- `class-validator` / `class-transformer` DTOs (replaced by hand validation)
- Any change to the database schema or the Drizzle migration workflow
- Any change to the Python worker

## Idiomatic-Go review checklist (applied at each checkpoint)

- `context.Context` is the first parameter everywhere; never stored in a struct.
- `defer` for every cleanup (`rows.Close()`, `tx.Rollback()`, `pool.Close()`).
- Errors wrapped with `fmt.Errorf("...: %w", err)`; inspected with `errors.Is`/`errors.As`.
- No package-level globals for pool/config/clients — constructed in `main`, injected.
- Interfaces defined at the consumer, small, for fakes (S3, worker).
- Goroutine lifetimes tied to a context; no leaks on WS disconnect.
- Both `http.MaxBytesReader` and the multipart size limit set on uploads.
- Handlers thin; business logic in `hash/`, `store/`, `s3/`, `worker/`.
- `go vet` clean; tests run with `-race`.
