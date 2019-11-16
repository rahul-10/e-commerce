const app = require('./configs/app');
const { APP: { PORT } } = require('./configs/vars');

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }
  return false;
}

const port = normalizePort(PORT);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

