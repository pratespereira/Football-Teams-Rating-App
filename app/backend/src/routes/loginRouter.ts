import { Router } from 'express';
import LoginController from '../controllers/loginController';
import { emailAndPasswordValidator, tokenValidator } from '../middleware/loginMiddleware';

const userRouter = Router();

userRouter.post('/', emailAndPasswordValidator, LoginController.login);
userRouter.get('/validate', tokenValidator, LoginController.getRole);

export default userRouter;
