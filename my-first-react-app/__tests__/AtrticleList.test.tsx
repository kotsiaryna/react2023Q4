import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import ArticleList from '../src/view/results/ArticleList';
import { fakeArticles } from './testUtils/mockData';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from '../src/redux/store';

describe('ArticleList (Card List)', () => {
  const initialState = {
    searchValue: '',
    itemsPerPage: '10',
    flags: {
      isLoadingResults: false,
      isLoadingPage: true,
      isLoadingDetails: false,
    },
  };
  const store = setupStore(initialState);

  it('renders the specified number of cards', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ArticleList results={fakeArticles} />
        </Provider>
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
        <Provider store={store}>
          <ArticleList results={[]} />
        </Provider>
      </MemoryRouter>
    );

    const messageElement = screen.getByText(/no matches/i);
    expect(messageElement).toBeInTheDocument();
  });
});
