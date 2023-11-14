import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import ArticleDetails from '../src/view/results/ArticleDetails';
import { fakeArticles } from './mockData';
import { articleRequest } from '../src/api';

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: '200', totalResults: 30, articles: fakeArticles }),
  })
);
global['Request'] = jest.fn().mockImplementation(() => ({
  signal: {
    removeEventListener: () => {},
    addEventListener: () => {},
  },
}));

const routesConfig = [
  {
    path: '/:search/:page/:id',
    element: <ArticleDetails />,
    loader: articleRequest,
  },
];

const router = createMemoryRouter(routesConfig, {
  initialEntries: ['/news/1/1'],
});

describe('ArticleDetails', () => {
  it('renders articleDetails', () => {
    render(<RouterProvider router={router} />);
    const headingElement = screen.getByText(fakeArticles[1].title);
    expect(headingElement).not.toBeEmptyDOMElement();
  });
});
