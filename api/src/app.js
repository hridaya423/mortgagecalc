const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const { mortgageRouter } = require('./routes/mortgage.routes');
const { errorMiddleware, notFound } = require('./shared/middleware/error.middleware');

function createApp() {
  const app = express();

  app.use(helmet()); // does security things
  app.use(cors({ origin: process.env.WEB_ORIGIN || 'http://localhost:3000' }));
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
