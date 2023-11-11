import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import ArticleDetails from '../src/view/results/ArticleDetails';
import { fakeArticles } from './mockData';

describe('Article Details - card details info', () => {
  it('a loading indicator is displayed while fetching data', () => {
    render(
      <MemoryRouter>
        <ArticleDetails />
      </MemoryRouter>
    );
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('renders card details correctly', () => {
    render(
      <MemoryRouter>
        <ArticleDetails />
      </MemoryRouter>
    );
    const loader = screen.getByTestId('loader');
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
      screen.debug();
    });
  });
  it(' clicking the close button hides the component', () => {
    render(
      <MemoryRouter>
        <ArticleDetails />
      </MemoryRouter>
    );
    const loader = screen.getByTestId('loader');
    waitForElementToBeRemoved(loader).then(() => {
      const closeButton = screen.getByRole('link');
      const detailsElement = screen.getByTestId(/article-details/);
      fireEvent.click(closeButton);
      expect(closeButton).not.toBeInTheDocument();
      expect(detailsElement).not.toBeInTheDocument();
    });
  });
});
