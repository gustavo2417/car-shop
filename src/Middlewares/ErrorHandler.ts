import { NextFunction, Request, Response } from 'express';

class ErrorHandler {
  public static handle(
    error: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (error.message === 'Invalid mongo id') {
      res.status(422).json({ message: error.message });
      next();
    }
    if (error.message === 'Car not found') {
      res.status(404).json({ message: error.message });
      next();
    }

    if (error.message === 'Motorcycle not found') {
      res.status(404).json({ message: error.message });
      next();
    }

    res.status(500).json({ message: error.message });
    next();
  }
}

export default ErrorHandler;