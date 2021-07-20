import { Router } from 'express';
import AuthController from '../app/controllers/AuthController';

const routesAuth = Router();

routesAuth.post('/', AuthController.authenticate);

export default routesAuth;
