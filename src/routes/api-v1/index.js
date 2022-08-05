import { Router } from 'express';
import auth from './auth';
import questionsRoute from './questions';

const routes = Router();

routes.use('/auth', auth);
routes.use('/questions', questionsRoute);

export default routes;
