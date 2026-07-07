const { createApp } = require('./app');

const PORT = Number(process.env.PORT || 4000);
const app = createApp();

const server = app.listen(PORT, () => {
  console.log(`api running at http://localhost:${PORT}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`${PORT} in use. change port`);
    process.exit(1);
  }
  throw error;
});
