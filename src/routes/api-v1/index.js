import { Router } from 'express';
import usersRoute from './users';
import questionsRoute from './questions';

const routes = Router();

routes.use('/users', usersRoute);
routes.use('/questions', questionsRoute);

export default routes;
