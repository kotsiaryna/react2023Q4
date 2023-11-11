import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import ArticleList from '../view/results/ArticleList';
import { fakeArticles } from './mockData';
import { MemoryRouter } from 'react-router-dom';
import { ArticlesContext } from '../context';

describe('ArticleList (Card List)', () => {
  it('renders the specified number of cards', () => {
    render(
      <MemoryRouter>
        <ArticlesContext.Provider value={fakeArticles}>
          <ArticleList handleClick={jest.fn()} />
        </ArticlesContext.Provider>
      </MemoryRouter>
    );

    const articlesArray = screen.getAllByTestId(/article/i);
    const fakeArticlesNumber = fakeArticles.length;
    const renderedArticlesNumber = articlesArray.length;

    expect(renderedArticlesNumber).toBe(fakeArticlesNumber);
  });

  it('renders "no matches" message if no cards are present', () => {
    render(
      <MemoryRouter>
        <ArticlesContext.Provider value={null}>
          <ArticleList handleClick={jest.fn()} />
        </ArticlesContext.Provider>
      </MemoryRouter>
    );

    const messageElement = screen.getByText(/no matches/i);
    expect(messageElement).toBeInTheDocument();
  });
});
