import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Results from '../src/view/results/Results';
import ArticleDetails from '../src/view/results/ArticleDetails';
import { SearchValueContext } from '../src/context';
import { fakeArticles } from './mockData';

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: '200', totalResults: 30, articles: fakeArticles }),
  })
);

describe('Results - card list', () => {
  it('renders list', async () => {
    render(
      <SearchValueContext.Provider
        value={{ searchContextValue: 'test', setSearchContextValue: jest.fn() }}
      >
        <Routes>
          <Route path="/" element={<Results />} />
          <Route path="/:id" element={<ArticleDetails />} />
        </Routes>
      </SearchValueContext.Provider>,
      { wrapper: MemoryRouter }
    );

    const resultSection = screen.getByTestId('results');
    expect(resultSection).toBeInTheDocument();

    const loader = screen.getByTestId('loader');

    expect(loader).toBeInTheDocument();

    const items = await screen.findAllByTestId(/article/i);

    expect(items[0]).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
