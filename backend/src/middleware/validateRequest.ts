import type {
  Request,
  Response,
  NextFunction,
} from "express";

type Validator = (body: unknown) => string | null;

export function validateRequest(validator: Validator) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const error = validator(req.body);

    if (error) {
      res.status(400).json({ message: error });
      return;
    }

    next();
  };
}