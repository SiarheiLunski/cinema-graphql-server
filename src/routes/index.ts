import { Application } from 'express';
import * as cookieParser from 'cookie-parser';

import confirmRoute from './confirm';

export const applyRoutes = (app: Application): Application => {
  app.use(cookieParser());

  app.use('/confirm', confirmRoute);

  return app;
};
