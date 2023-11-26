import Page404 from '../../src/view/notFound/Page404';
import ArticleDetails from '../../src/view/results/ArticleDetails';
import Results from '../../src/view/results/Results';

export const routesConfig = [
  {
    path: ':search/:page',
    element: <Results />,
    children: [
      {
        path: ':id',
        element: <ArticleDetails />,
      },
    ],
  },
  {
    path: '*',
    element: <Page404 />,
  },
];

export const detailsRoutesConfig = [
  {
    path: ':search/:page/:id',
    element: <ArticleDetails />,
  },
];
