import { Router } from 'express';
import auth from './auth';
import questions from './questions';
import users from './users';

const routes = Router();

routes.use('/auth', auth);
routes.use('/questions', questions);
routes.use('/users', users);

export default routes;
