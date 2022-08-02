import express from 'express';
import { errors } from 'celebrate';

import routes from './routes';

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(routes);
app.use((req, res) => res.status(404).json({ message: 'Resource not found' }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use(errors());

export default app;
