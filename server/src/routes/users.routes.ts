import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import UserController from '../app/controllers/UserController';
import validation from '../middlewares/validationMiddleware';
import userCreateSchema from '../app/validations/userCreateValidate';

const routesUsers = Router();

routesUsers.post('/', validation(userCreateSchema), UserController.create);
routesUsers.get('/', authMiddleware, UserController.index);
routesUsers.get('/:id', authMiddleware, UserController.show);
routesUsers.put('/:id', authMiddleware, UserController.update);
routesUsers.delete('/:id', authMiddleware, UserController.destroy);

export default routesUsers;
