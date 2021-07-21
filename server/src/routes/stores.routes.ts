import { Router } from 'express';
import StoreController from '../app/controllers/StoreController';
import storeCreateSchema from '../app/validations/storeCreateValidate';
import authMiddleware from '../middlewares/authMiddleware';
import validation from '../middlewares/validationMiddleware';

const routesStores = Router();

routesStores.post('/', [validation(storeCreateSchema)], StoreController.create);
routesStores.get('/', StoreController.index);
routesStores.get('/:id', StoreController.show);
routesStores.put('/:id', StoreController.update);
routesStores.delete('/:id', StoreController.destroy);

export default routesStores;
