import { RouteObject } from 'react-router-dom';
import { articleRequest } from './api';
import App from './view/App';
import ErrorPage from './view/error/ErrorPage';
import Page404 from './view/notFound/Page404';
import ArticleDetails from './view/results/ArticleDetails';
import Results from './view/results/Results';

const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ':search/:page',
        element: <Results />,
        children: [
          {
            path: ':id',
            element: <ArticleDetails />,
            loader: articleRequest,
          },
        ],
      },
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
];
export default routesConfig;
