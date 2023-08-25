import * as express from 'express';
import loginRouter from './routes/loginRouter';
import teamRouter from './routes/teamsRouter';
import matchRouter from './routes/matchesRouter';
import leaderboardRouter from './routes/leaderboardRouter';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.routes();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private routes():void {
    this.app.use('/login', loginRouter);
    this.app.use('/teams', teamRouter);
    this.app.use('/matches', matchRouter);
    this.app.use('/leaderboard', leaderboardRouter);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
