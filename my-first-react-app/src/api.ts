import { LoaderFunction } from 'react-router-dom';
import { Response } from './types';

const BaseURL = 'https://newsapi.org/v2/top-headlines';

type Params = {
  page: string;
  search: string;
  limit: string;
  id?: string;
};

export const searchRequest = async ({
  search,
  page,
  limit,
}: Params): Promise<Response | undefined> => {
  const url = `${BaseURL}?q=${search}&pageSize=${limit}&page=${page}&apiKey=a6748dc91b9e4f7a8af5cc41a1090947`;

  const resp = await fetch(url);
  const result = await resp.json();
  return result;
};

export const articleRequest: LoaderFunction = async ({ params }) => {
  const { search, page, id } = params;
  const limit = window.location.search.split('=').at(-1) || '10';

  if (search && page && id) {
    const result = await searchRequest({ search, page, limit });
    const article = result?.articles[+id];
    return article;
  }
};
