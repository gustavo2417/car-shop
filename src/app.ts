import express from 'express';
import carRoutes from './Routes/Car.routes';
import motorcyclesRoutes from './Routes/Motorcycle.routes';
import ErrorHandler from './Middlewares/ErrorHandler';

const app = express();
app.use(express.json());
app.use(carRoutes);
app.use(motorcyclesRoutes);
app.use(ErrorHandler.handle);

export default app;
