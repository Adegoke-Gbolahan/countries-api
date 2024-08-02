import request from 'supertest';
import app from '../index';

describe('GET /api/countries', () => {
  it('should return a list of countries', async () => {
    const res = await request(app).get('/api/countries');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

describe('GET /api/countries/:name', () => {
  it('should return details of a specific country', async () => {
    const res = await request(app).get('/api/countries/Nigeria');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name');
  });
});

// Add more tests for other endpoints
