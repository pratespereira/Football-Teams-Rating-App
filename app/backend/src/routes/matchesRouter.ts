import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import { tokenValidator } from '../middleware/loginMiddleware';

const matchRouter = Router();

matchRouter.get('/', MatchesController.getMatches);
matchRouter.post('/', tokenValidator, MatchesController.createMatch);
matchRouter.patch('/:id/finish', tokenValidator, MatchesController.finishMatch);
matchRouter.patch('/:id', tokenValidator, MatchesController.updateMatch);

export default matchRouter;
