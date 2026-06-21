# Checkout Diagnosis Demo Service

Tiny React/Vite service for the "self-explaining test automation" demo.

The clean `main` version accepts a normal customer email and confirms a checkout order. The demo bug branch changes email validation so only `@company.test` addresses pass; Playwright E2E tests catch that regression and the reusable workflow asks OpenAI to explain the likely root cause from the test output and service diff.

## Run Locally

```bash
npm install
npm run build
docker compose up --build
```

Open http://localhost:4173.

IntelliJ IDEA users can run the shared `Start checkout UI (Docker Compose)` run configuration. It executes `npm run start:docker`, which runs `docker compose up --build`.
