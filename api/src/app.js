const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const { mortgageRouter } = require('./routes/mortgage.routes');
const { errorMiddleware, notFound } = require('./shared/middleware/error.middleware');

function createCorsOrigin() {
  const allowedOrigins = (process.env.WEB_ORIGIN || 'http://localhost:3000,http://localhost:3001')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return function corsOrigin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`origin not allowed: ${origin}`));
  };
}

function createApp() {
  const app = express();

  app.use(helmet()); // does security things
  app.use(cors({ origin: createCorsOrigin() }));
  app.use(express.json({ limit: '10kb' }));

  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.use('/api/mortgage', mortgageRouter);

  app.use(notFound);
  app.use(errorMiddleware);

  return app;
}

module.exports = { createApp };
