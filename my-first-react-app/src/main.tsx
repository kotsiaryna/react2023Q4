import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './view/App';
import './index.scss';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Results from './view/results/Results';
import { articleRequest, searchRequest } from './api';
import ResultsError from './view/results/ResultsError';
import Page404 from './view/notFound/Page404';
import ErrorBoundary from './view/ErrorBoundary';
import ArticleDetails from './view/results/ArticleDetails';

const router = createBrowserRouter(
  createRoutesFromElements(
    // TODO errorElement for app = '404 Page not found'
    <Route path="/" element={<App />} errorElement={<Page404 />}>
      <Route
        path=":search/:page"
        element={<Results />}
        loader={searchRequest}
        errorElement={<ResultsError />}
      >
        <Route path=":id" element={<ArticleDetails />} loader={articleRequest} />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
