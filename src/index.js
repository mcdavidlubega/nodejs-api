const app = require('./app');
require('./db/database');

const { PORT } = process.env || 3000;
app.listen(PORT, () => {
  console.log(`Connecting on port ${PORT} ...`);
});
