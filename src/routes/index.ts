import { Application } from 'express';
import confirmRoute from './confirm';

export const applyRoutes = (app: Application): Application => {
  app.use('/confirm', confirmRoute);

  return app;
};
