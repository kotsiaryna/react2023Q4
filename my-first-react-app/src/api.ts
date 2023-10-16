/* eslint-disable @typescript-eslint/no-explicit-any */

import { IShip } from './types';

const BaseURL = 'https://swapi.dev/api/starships/';

export const searchRequest = async ({ params }: any): Promise<{ results: IShip[] }> => {
  const { page, search } = params;
  const url = `${BaseURL}?search=${search}&page=${page}`;
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error('error in fetch');
  }
  const result = await resp.json();
  return result.results;
};

export const shipRequest = async ({ params }: any) => {
  const url = `${BaseURL}/${params.id}`;
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error('error in getting details');
  }
  const result = await resp.json();
  return result;
};
