/* eslint-disable @typescript-eslint/no-explicit-any */

import { Response } from './types';

// const BaseURL = 'https://swapi.dev/api/starships/';
const BaseURL = 'https://newsapi.org/v2/top-headlines';

export const searchRequest = async ({ params }: any): Promise<Response> => {
  console.log('fetching data...');
  const { page, search } = params;
  const limit = window.location.search.split('=').at(-1) || '';
  const url = `${BaseURL}?q=${search}&pageSize=${limit}&page=${page}&apiKey=a6748dc91b9e4f7a8af5cc41a1090947`;
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error('error in fetch');
  }
  const result = await resp.json();
  return result;
};
// export const searchRequest = async ({ params }: any): Promise<Response> => {
//   const { page, search } = params;
//   const url = `${BaseURL}?search=${search}&page=${page}`;
//   const resp = await fetch(url);
//   if (!resp.ok) {
//     throw new Error('error in fetch');
//   }
//   const result = await resp.json();
//   return result;
// };

export const articleRequest = async ({ params }: any) => {
  const { page, search, id } = params;
  const url = `${BaseURL}?q=${search}&pageSize=5&page=${page}&apiKey=a6748dc91b9e4f7a8af5cc41a1090947`;
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error('error in fetch');
  }
  const result: Response = await resp.json();
  const article = result.articles[id];

  return article;
};
// export const shipRequest = async ({ params }: any) => {
//   const url = `${BaseURL}/${params.id}`;
//   const resp = await fetch(url);
//   if (!resp.ok) {
//     throw new Error('error in getting details');
//   }
//   const result = await resp.json();
//   return result;
// };
