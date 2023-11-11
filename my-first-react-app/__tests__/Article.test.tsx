import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import { BrowserRouter, RouterProvider, createMemoryRouter } from 'react-router-dom';

import Article from '../src/view/results/Article';

import Page404 from '../src/view/notFound/Page404';
import ArticleDetails from '../src/view/results/ArticleDetails';
import Results from '../src/view/results/Results';
import { mockArticleRequest } from './mockData';

const routesConfig = [
  {
    path: ':search/:page',
    element: <Results />,
    children: [
      {
        path: ':id',
        element: <ArticleDetails />,
        loader: mockArticleRequest,
      },
    ],
  },
  {
    path: '*',
    element: <Page404 />,
  },
];
const router = createMemoryRouter(routesConfig, {
  initialEntries: ['/news/1?limit=5'],
});

describe('Article - card short info', () => {
  const testData = {
    index: 0,
    author: 'Author',
    title: 'Title',
    handleClick: jest.fn(),
  };

  it('card component renders the relevant card data', () => {
    render(
      <BrowserRouter>
        <Article
          key={testData.index}
          index={testData.index}
          title={testData.title}
          author={testData.author}
          handleClick={testData.handleClick}
        />
      </BrowserRouter>
    );

    const titleElement = screen.getByText(testData.title);
    const authorElement = screen.getByText(testData.author);

    expect(titleElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
  });

  it('clicking on a card opens a detailed card component', () => {
    render(<RouterProvider router={router} />);

    const loader = screen.getByTestId('loader');
    waitForElementToBeRemoved(loader).then(() => {
      const articleElements = screen.getAllByRole('link');
      expect(articleElements[0]).toBeInTheDocument();

      fireEvent.click(articleElements[0]);
      waitForElementToBeRemoved(loader).then(() => {
        const detailsElement = screen.getByTestId(/article-details/i);
        expect(detailsElement).toBeInTheDocument();
      });
    });
  });

  it('clicking triggers an additional API call to fetch detailed info', () => {
    render(<RouterProvider router={router} />);

    const loader = screen.getByTestId('loader');
    waitForElementToBeRemoved(loader).then(() => {
      const articleElements = screen.getAllByRole('link');
      const firstArticle = articleElements[0];
      expect(firstArticle).toBeInTheDocument();

      fireEvent.click(articleElements[0]);
      expect(mockArticleRequest).toHaveBeenCalled();
    });
  });
});
