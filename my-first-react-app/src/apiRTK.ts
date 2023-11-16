import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Params } from './api';
import { Response } from './types';

export const newsApi = createApi({
  reducerPath: 'news',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2/top-headlines' }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ search, page, limit }: Params) =>
        `?q=${search}&pageSize=${limit}&page=${page}&apiKey=a6748dc91b9e4f7a8af5cc41a1090947`,
      // Pick out error and prevent nested properties in a hook or selector
      transformErrorResponse: (response) => response.data,
    }),
    DetailedNews: builder.query({
      query: ({ search, page, limit }: Params) =>
        `?q=${search}&pageSize=${limit}&page=${page}&apiKey=a6748dc91b9e4f7a8af5cc41a1090947`,
      transformResponse: (response: Response) => response.articles,
      transformErrorResponse: (response) => response.data,
    }),
  }),
});

export const { useGetNewsQuery, useDetailedNewsQuery } = newsApi;
