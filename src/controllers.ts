import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import {
  fetchCountries,
  fetchCountry,
  fetchRegions,
  fetchLanguages,
  fetchStatistics
} from './services';

import { handleError } from './utils/errorHandler';

export const getCountries = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { page = 1, limit = 10, region, population } = req.query;
  try {
    const data = await fetchCountries(Number(page), Number(limit), region as string, Number(population));
    res.json(data);
  } catch (error: unknown) {
    handleError(res, error);
  }
};

export const getCountry = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.params;
  try {
    const data = await fetchCountry(name);
    res.json(data);
  } catch (error: unknown) {
    handleError(res, error);
  }
};

export const getRegions = async (req: Request, res: Response) => {
  try {
    const data = await fetchRegions();
    res.json(data);
  } catch (error: unknown) {
    handleError(res, error);
  }
};

export const getLanguages = async (req: Request, res: Response) => {
  try {
    const data = await fetchLanguages();
    res.json(data);
  } catch (error: unknown) {
    handleError(res, error);
  }
};

export const getStatistics = async (req: Request, res: Response) => {
  try {
    const data = await fetchStatistics();
    res.json(data);
  } catch (error: unknown) {
    handleError(res, error);
  }
};
