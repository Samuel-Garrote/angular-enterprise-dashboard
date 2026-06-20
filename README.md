# Angular Enterprise Dashboard

A full-stack user management dashboard built to demonstrate modern Angular and NestJS patterns used in enterprise environments: standalone components, signals, reactive forms, JWT authentication, and a real PostgreSQL backend.

**Live demo:** https://angular-enterprise-dashboard-psi.vercel.app
**Backend repo:** https://github.com/Samuel-Garrote/dashboard-api

Try it with:
- Email: `testprod@gmail.com`
- Password: `123456`

## Features

- JWT authentication (login, route guards, automatic token attachment via HTTP interceptor)
- User management: create, list, search, filter by role, delete
- Reactive Forms with custom synchronous and asynchronous validators
- Live search synced to backend query params (RxJS `debounceTime` + `switchMap`)
- Signals-based state management (`signal`, `computed`, `effect`)
- Lazy-loaded routes with guards and resolvers
- Password hashing with bcrypt, never exposed in API responses
- Responsive UI with a custom glassmorphism design

## Tech Stack

**Frontend:** Angular 21 (standalone components, no NgModules), TypeScript, RxJS, Reactive Forms, Signals

**Backend:** NestJS, Prisma ORM, PostgreSQL, JWT, bcrypt

**Deployment:** Vercel (frontend), Railway (backend + PostgreSQL)

## Architecture

```
Angular (Vercel) ──HTTP/JWT──> NestJS (Railway) ──Prisma──> PostgreSQL (Railway)
```

## Running Locally

```bash
git clone https://github.com/Samuel-Garrote/angular-enterprise-dashboard.git
cd angular-enterprise-dashboard
npm install
ng serve
```

By default the app points to the deployed backend. To run against a local backend instead, change the `apiUrl` values in `src/app/services/auth.service.ts` and `src/app/services/user.service.ts` to `http://localhost:3000`, and follow the setup instructions in the [backend repo](https://github.com/Samuel-Garrote/dashboard-api).

## Roadmap

Planned for a future version:
- Update (edit) users — Create, Read and Delete are implemented; Update is the next addition
- Role-based authorization on protected routes (admin-only actions)
- Refresh tokens
- Automated tests (unit + e2e)

## Author

Samuel Garrote — [GitHub](https://github.com/Samuel-Garrote)
