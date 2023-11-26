import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { fakeArticles } from './testUtils/mockData';
import { setupStore } from '../src/redux/store';
import { Provider } from 'react-redux';
import { server } from '../src/mocks/node';
import routesConfig from '../src/routerConfig';

const router = createMemoryRouter(routesConfig, {
  initialEntries: ['/news/1'],
});

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

describe('Result section tests', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  it('shows loader while getting cards', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('shows proper amount of cards after fetching', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
    const resultList = await screen.findAllByTestId(/article/i);
    expect(resultList.length).toBe(fakeArticles.length);
  });
});
