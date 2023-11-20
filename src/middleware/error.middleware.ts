import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../types/http.error.js';

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status((error as HttpError).status);
  res.statusMessage = (error as HttpError).statusMessage;
  res.json({});
};
