# Mortgage Calculator Frontend

Next.js frontend for the mortgage product calculator.

## Run

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000` by default.

## End-to-end tests

```bash
npm run test:e2e
```

playwright browser tests. They start both API on `4100` and
the app on `3100`, then test the page.

Other options to run with:

```bash
npm run test:e2e:ui
npm run test:e2e:headed
```

## Architecture

I used a simple Next.js structure. 
Microfrontends didn't make sense for the scenario considering it's a single feature, same with flux architecture or redux as it's a singular fetch call. 
