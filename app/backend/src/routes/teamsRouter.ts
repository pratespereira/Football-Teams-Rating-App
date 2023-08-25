import { Router } from 'express';
import TeamsController from '../controllers/teamsController';

const teamRouter = Router();

teamRouter.get('/', TeamsController.getAll);
teamRouter.get('/:id', TeamsController.getById);

export default teamRouter;
