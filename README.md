# Rally — Pickleball Reservation System

React + TypeScript microfrontend starter using **Webpack 5 Module Federation**.

## Apps and ports
| App | Port | Responsibility |
|---|---:|---|
| Host portal | 3000 | App shell, navigation, remote loading |
| Booking remote | 3001 | Court/date/time selection and reservation UI |
| Courts remote | 3002 | Court catalogue and rates |
| Admin remote | 3003 | Reservation overview dashboard |
| Express API | 4000 | Court and reservation API starter |

## Run locally
Requires Node.js 20+ and npm 10+.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Keep all apps running: the host loads the remotes' `remoteEntry.js` files at runtime.

## Module Federation
Each remote exposes `./App` from its Webpack container. The host consumes `booking/App`, `courts/App`, and `admin/App`. React, React DOM, and MUI are configured as shared singletons. See each app's `webpack.config.js`.

## API starter
The Express API exposes:
- `GET /health`
- `GET /api/courts`
- `GET /api/reservations`
- `POST /api/reservations`
- `PATCH /api/reservations/:id/cancel`

Example create request:

```json
{
  "playerName": "Jamie Santos",
  "email": "jamie@example.com",
  "courtId": "court-1",
  "startAt": "2026-11-21T09:00:00.000Z",
  "durationMinutes": 60
}
```

The API currently uses in-memory demo data. The booking remote currently demonstrates local UI state and is not yet wired to this API.

## Before production
1. Replace in-memory storage with PostgreSQL and migrations.
2. Enforce reservation overlap prevention transactionally in the database (not only in application memory).
3. Add authentication, role-based authorization, input validation, rate limiting, audit logs, and secure session/token handling.
4. Add timezone-aware venue scheduling, opening hours, booking lead times, cancellation rules, and payment integration.
5. Configure environment-specific remote URLs and deploy each remote independently; add versioned remote manifests and a rollback strategy.
6. Add integration/e2e tests for concurrent bookings, cancellations, permissions, and payment failures.
