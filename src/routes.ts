import { Router } from 'express';
import { check, query } from 'express-validator';
import {
  getCountries,
  getCountry,
  getRegions,
  getLanguages,
  getStatistics
} from './controllers';

const router = Router();

/**
 * @swagger
 * /api/countries:
 *   get:
 *     summary: Retrieve a list of countries
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of countries per page
 *       - in: query
 *         name: region
 *         schema:
 *           type: string
 *         description: Filter by region
 *       - in: query
 *         name: population
 *         schema:
 *           type: integer
 *         description: Filter by minimum population
 *     responses:
 *       200:
 *         description: A list of countries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

router.get('/countries', [
  query('page').isInt({ min: 1 }).optional(),
  query('limit').isInt({ min: 1 }).optional(),
  query('region').isString().optional(),
  query('population').isInt({ min: 0 }).optional()
], getCountries);

/**
 * @swagger
 * /api/countries/{name}:
 *   get:
 *     summary: Retrieve detailed information for a specific country
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Country name
 *     responses:
 *       200:
 *         description: A country object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

router.get('/countries/:name', [
  check('name').isString()
], getCountry);

/**
 * @swagger
 * /api/regions:
 *   get:
 *     summary: Retrieve a list of regions and the countries within each region
 *     responses:
 *       200:
 *         description: A list of regions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

router.get('/regions', getRegions);

/**
 * @swagger
 * /api/languages:
 *   get:
 *     summary: Retrieve a list of languages and the countries where they are spoken
 *     responses:
 *       200:
 *         description: A list of languages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

router.get('/languages', getLanguages);

/**
 * @swagger
 * /api/statistics:
 *   get:
 *     summary: Provide aggregated statistics
 *     responses:
 *       200:
 *         description: Statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

router.get('/statistics', getStatistics);

export default router;
