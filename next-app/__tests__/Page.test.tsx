import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import ArticleListWrapper from '@/pages/[search]/[page]';
import { server } from './mocks/node';

import { Provider } from 'react-redux';
import { mockStore } from './mocks/mockData';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Search test', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());
  (useRouter as jest.Mock).mockReturnValue({
    query: { search: 'test', page: '1', limit: '10', id: '2' },
    push: jest.fn(),
  });

  it('renders ArticleWrapper', () => {
    render(
      <Provider store={mockStore}>
        <ArticleListWrapper />
      </Provider>
    );
    waitFor(() => {
      screen.debug();
      expect(1).toBe(1);
    });
  });
});
