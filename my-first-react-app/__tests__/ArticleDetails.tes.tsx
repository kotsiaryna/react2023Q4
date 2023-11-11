import '@testing-library/jest-dom';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import ArticleDetails from '../src/view/results/ArticleDetails';
// loader???
describe('Article Details - card details info', () => {
  it('renders card details', () => {
    render(
      <MemoryRouter>
        <ArticleDetails />
      </MemoryRouter>
    );
    const loader = screen.getByTestId('loader');
    waitForElementToBeRemoved(loader).then(() => {
      const articleDetailsElement = screen.getByTestId('article-details');
      expect(articleDetailsElement).toBeInTheDocument();
    });
  });
});
