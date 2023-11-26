import { HttpResponse, http } from 'msw';
import { mockRequest } from './mockData';

export const handlers = [
  http.get('https://newsapi.org/v2/*', () => {
    return HttpResponse.json(mockRequest);
  }),
];
