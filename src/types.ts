export interface Country {
  name: string;
  population: number;
  region: string;
  area: number;
  languages: { [key: string]: string };
  borders: string[];
}
