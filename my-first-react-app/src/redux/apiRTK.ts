import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Response } from '../types';

type Params = {
  search: string;
  page: string;
  limit: string;
  id?: string;
};

export const newsApi = createApi({
  reducerPath: 'news',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2/top-headlines' }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ search, page, limit }: Params) =>
        `?q=${search}&pageSize=${limit}&page=${page}&apiKey=a6748dc91b9e4f7a8af5cc41a1090947`,
      // Pick out error and prevent nested properties in a hook or selector
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
    DetailedNews: builder.query({
      query: ({ search, page, limit, id }: Params) => {
        console.log(id);
        return `?q=${search}&pageSize=${limit}&page=${page}&apiKey=a6748dc91b9e4f7a8af5cc41a1090947`;
      },
      transformResponse: (response: Response) => response.articles,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
  }),
});

export const { useGetNewsQuery, useDetailedNewsQuery } = newsApi;
