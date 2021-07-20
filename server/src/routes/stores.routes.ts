import { Router } from 'express';
import StoreController from '../app/controllers/StoreController';
import storeCreateSchema from '../app/validations/storeCreateValidate';
import authMiddleware from '../middlewares/authMiddleware';
import validation from '../middlewares/validationMiddleware';

const routesStores = Router();

routesStores.post(
  '/',
  [authMiddleware, validation(storeCreateSchema)],
  StoreController.create,
);
routesStores.get('/', authMiddleware, StoreController.index);
routesStores.get('/:id', authMiddleware, StoreController.show);
routesStores.put('/:id', authMiddleware, StoreController.update);
routesStores.delete('/:id', authMiddleware, StoreController.destroy);

export default routesStores;
