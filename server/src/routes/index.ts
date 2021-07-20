import { Router } from 'express';
import routesAuth from './auth.routes';
import routesStores from './stores.routes';
import routesUsers from './users.routes';

const routes = Router();

routes.get('/', (req, res) => {
  res.send('Its working!');
});

routes.use('/api/v1/authenticate', routesAuth);
routes.use('/api/v1/users', routesUsers);
routes.use('/api/v1/stores', routesStores);

export default routes;
