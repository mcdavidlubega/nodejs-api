import app from './app';
import connect from './db/database';

connect();
const { PORT } = process.env || 3000;

app.listen(PORT, () => {
    console.log(`Connecting on port ${PORT} ...`);
});
