import { LoaderFunction } from 'react-router-dom';
import { Response } from './types';

const BaseURL = 'https://newsapi.org/v2/top-headlines';

type Params = {
  params: {
    page: string;
    search: string;
  };
};

export const searchRequest = async ({ params }: Params): Promise<Response> => {
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

export const articleRequest: LoaderFunction = async ({ params }) => {
  const { page, search, id } = params;
  const limit = window.location.search.split('=').at(-1) || '10';
  const url = `${BaseURL}?q=${search}&pageSize=${limit}&page=${page}&apiKey=a6748dc91b9e4f7a8af5cc41a1090947`;
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error('error in fetch');
  }
  const result: Response = await resp.json();
  if (id) {
    const article = result.articles[+id];
    return article;
  }
};
