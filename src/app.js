import express from 'express';
import { errors } from 'celebrate';
import connect from './db/database';
import routes from './routes';

connect();

const app = express();
app.use(express.json());
app.use(routes);
app.get('/', (req, res) => {
    return res.status(200).send('Home');
});
app.use((req, res) => res.status(404).json({ message: 'Resource not found' }));

app.use(errors());

export default app;
