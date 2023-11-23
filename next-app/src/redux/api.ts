import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper'
import { Resp } from '../../types';

type Params = {
  search: string;
  page: string;
  limit: string;
  id?: string;
};

export const newsApi = createApi({
  reducerPath: 'news',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2/top-headlines' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ search, page, limit }: Params) =>
        `?q=${search}&pageSize=${limit}&page=${page}&apiKey=a6748dc91b9e4f7a8af5cc41a1090947`,
      // Pick out error and prevent nested properties in a hook or selector
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
    detailedNews: builder.query({
      query: ({ search, page, limit, id }: Params) => {
        console.log(id);
        return `?q=${search}&pageSize=${limit}&page=${page}&apiKey=a6748dc91b9e4f7a8af5cc41a1090947`;
      },
      transformResponse: (response: Resp) => response.articles,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
  }),
});

export const { useGetNewsQuery, useDetailedNewsQuery, util: { getRunningQueriesThunk } } = newsApi;
// export endpoints for use in SSR
export const {getNews, detailedNews} = newsApi.endpoints;