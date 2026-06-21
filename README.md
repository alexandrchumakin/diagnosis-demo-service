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

## GitHub Setup

1. Create a public GitHub repo named `diagnosis-demo-service`.
2. Push this repo's clean `main` branch.
3. Add repository secret `OPENAI_API_KEY`.
4. Optional: set repository variable `OPENAI_MODEL` if you want to override `gpt-5.5`.
5. After `main` is committed, run:

```bash
npm run bug:branch
```

Commit the generated bug branch manually, push it, and open a PR to `main`. The PR workflow calls the reusable Playwright workflow from `alexandrchumakin/diagnosis-demo-e2e`.

## Expected Demo Failure

The bug changes `src/checkout.ts` from a standard email format check to:

```ts
return normalized.endsWith("@company.test");
```

The E2E test submits `sam@example.com`, expects "Order confirmed", and fails. AI analysis should point to the tightened validation as the probable root cause.
