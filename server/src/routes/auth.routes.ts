import { Router } from 'express';
import AuthController from '../app/controllers/AuthController';
import authSchema from '../app/validations/authenticationValidate';
import validation from '../middlewares/validationMiddleware';

const routesAuth = Router();

routesAuth.post('/', validation(authSchema), AuthController.authenticate);

export default routesAuth;
