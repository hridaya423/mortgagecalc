# Mortgage Calculator Frontend

Next.js frontend for the mortgage product calculator.

## Run

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000` by default.

## Architecture

I used a simple Next.js structure. 
Microfrontends didn't make sense for the scenario considering it's a single feature, same with flux architecture or redux as it's a singular fetch call. 