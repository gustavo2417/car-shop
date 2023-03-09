import { Router } from 'express';
import CarController from '../Controllers/Car.controller';

const routes = Router();

routes.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next).create(),
);

routes.get(
  '/cars',
  (req, res, next) => new CarController(req, res, next).getAll(),
);

routes.get(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).getOne(),
);

routes.put(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).updateOne(),
);

export default routes;