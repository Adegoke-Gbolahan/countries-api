import axios from 'axios';
import NodeCache from 'node-cache';

const API_URL = 'https://restcountries.com/v3.1/all';
const cache = new NodeCache();

export const fetchCountries = async (page: number, limit: number, region?: string, population?: number) => {
  const cacheKey = `countries-${page}-${limit}-${region}-${population}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const { data } = await axios.get(API_URL);
  let countries = data;

  if (region) {
    countries = countries.filter((country: any) => country.region === region);
  }

  if (population) {
    countries = countries.filter((country: any) => country.population >= population);
  }

  const start = (page - 1) * limit;
  const end = start + limit;

  const result = countries.slice(start, end);
  cache.set(cacheKey, result, 3600);
  return result;
};

export const fetchCountry = async (name: string) => {
  const cacheKey = `country-${name}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const { data } = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
  const result = data[0];
  cache.set(cacheKey, result, 3600);
  return result;
};

export const fetchRegions = async () => {
  const cacheKey = `regions`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const { data } = await axios.get(API_URL);
  const regions: any = {};

  data.forEach((country: any) => {
    if (!regions[country.region]) {
      regions[country.region] = {
        countries: [],
        totalPopulation: 0
      };
    }
    regions[country.region].countries.push(country.name.common);
    regions[country.region].totalPopulation += country.population;
  });

  cache.set(cacheKey, regions, 3600);
  return regions;
};

export const fetchLanguages = async () => {
  const cacheKey = `languages`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const { data } = await axios.get(API_URL);
  const languages: any = {};

  data.forEach((country: any) => {
    Object.entries(country.languages || {}).forEach(([code, language]: any) => {
      if (!languages[language]) {
        languages[language] = {
          countries: [],
          totalSpeakers: 0
        };
      }
      languages[language].countries.push(country.name.common);
      languages[language].totalSpeakers += country.population;
    });
  });

  cache.set(cacheKey, languages, 3600);
  return languages;
};

export const fetchStatistics = async () => {
  const cacheKey = `statistics`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const { data } = await axios.get(API_URL);
  let totalCountries = data.length;
  let largestCountry = data.reduce((max: any, country: any) => (country.area > max.area ? country : max));
  let smallestCountry = data.reduce((min: any, country: any) => (country.population < min.population ? country : min));
  let languages: any = {};

  data.forEach((country: any) => {
    Object.entries(country.languages || {}).forEach(([code, language]: any) => {
      if (!languages[language]) {
        languages[language] = 0;
      }
      languages[language] += country.population;
    });
  });

  let mostSpokenLanguage = Object.entries(languages).reduce((max: any, [language, count]: any) => (count > max[1] ? [language, count] : max), ["", 0]);

  const result = {
    totalCountries,
    largestCountry: largestCountry.name.common,
    smallestCountry: smallestCountry.name.common,
    mostSpokenLanguage: mostSpokenLanguage[0]
  };
  
  cache.set(cacheKey, result, 3600);
  return result;
};
