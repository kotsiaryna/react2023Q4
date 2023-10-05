import { ResultsData } from './types';

const BaseURL = 'https://swapi.dev/api/starships/';

export const searchRequest = async (searchValue: string): Promise<{ results: ResultsData[] }> => {
  const url = `${BaseURL}?search=${searchValue}`;
  const resp = await fetch(url);
  const result = await resp.json();
  return result;
};
