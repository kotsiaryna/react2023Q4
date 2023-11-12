import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import { BrowserRouter, RouterProvider, createMemoryRouter } from 'react-router-dom';

import Article from '../src/view/results/Article';

import Page404 from '../src/view/notFound/Page404';
import ArticleDetails from '../src/view/results/ArticleDetails';
import Results from '../src/view/results/Results';
import { fakeArticles, mockArticleRequest } from './mockData';
import { articleRequest } from '../src/api';

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: '200', totalResults: 30, articles: fakeArticles }),
  })
);

const routesConfig = [
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
];
const router = createMemoryRouter(routesConfig, {
  initialEntries: ['/news/1?limit=5'],
});

describe('Article - card short info & card details', () => {
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

  it('clicking on a card opens a detailed card component', async () => {
    render(<RouterProvider router={router} />);

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
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

  it('Detailed Card: a loading indicator is displayed while fetching data', () => {
    render(<RouterProvider router={router} />);

    const loader = screen.getByTestId('loader');
    waitForElementToBeRemoved(loader).then(() => {
      const articleElements = screen.getAllByRole('link');
      const firstArticle = articleElements[0];
      expect(firstArticle).toBeInTheDocument();

      fireEvent.click(articleElements[0]);

      expect(loader).toBeInTheDocument();
    });
  });

  it('Detailed Card correctly displays the detailed card data', () => {
    render(<RouterProvider router={router} />);

    const loader = screen.getByTestId('loader');

    waitForElementToBeRemoved(loader).then(() => {
      const articleElements = screen.getAllByRole('link');
      const firstArticle = articleElements[0];
      expect(firstArticle).toBeInTheDocument();

      fireEvent.click(articleElements[0]);
      waitForElementToBeRemoved(loader).then(() => {
        const articleDetailsElement = screen.getByTestId('article-details');
        const headingElement = screen.getByRole('heading');
        const descriptionElement = screen.getByText(fakeArticles[0].description);
        const contentElement = screen.getByText(fakeArticles[0].content);
        const authorElement = screen.getByText(fakeArticles[0].author);
        const linkToOrigin: HTMLAnchorElement = screen.getByText(/Read more in origin/i);

        expect(articleDetailsElement).toBeInTheDocument();
        expect(headingElement).toHaveTextContent(fakeArticles[0].title);
        expect(descriptionElement).toBeInTheDocument();
        expect(contentElement).toBeInTheDocument();
        expect(authorElement).toBeInTheDocument();
        expect(linkToOrigin.href).toBe(fakeArticles[0].url);
      });
    });
  });
  it('Detailed Card: clicking the close button hides the component', () => {
    render(<RouterProvider router={router} />);

    const loader = screen.getByTestId('loader');
    waitForElementToBeRemoved(loader).then(() => {
      const articleElements = screen.getAllByRole('link');
      const firstArticle = articleElements[0];
      fireEvent.click(firstArticle);

      waitForElementToBeRemoved(loader).then(() => {
        const closeButton = screen.getByRole('link');
        const detailsElement = screen.getByTestId(/article-details/);

        fireEvent.click(closeButton);
        expect(closeButton).not.toBeInTheDocument();
        expect(detailsElement).not.toBeInTheDocument();
      });
    });
  });
});
