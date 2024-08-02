import { Response } from 'express';

export const handleError = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    res.status(500).json({ message: error.message });
  } else {
    res.status(500).json({ message: 'An unknown error occurred' });
  }
};
