import '@testing-library/jest-dom';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { server } from '../src/mocks/node';
import { setupStore } from '../src/redux/store';
import { detailsRoutesConfig } from './testUtils/testRoutsConfig';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

const router = createMemoryRouter(detailsRoutesConfig, {
  initialEntries: ['/news/1/1'],
});

const initialState = {
  searchValue: 'news',
  itemsPerPage: '10',
  flags: {
    isLoadingResults: false,
    isLoadingPage: true,
    isLoadingDetails: false,
  },
};

const store = setupStore(initialState);

describe('Details section tests', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  it('shows loader while fetching', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
    await screen.findByTestId('article-details');
    screen.debug();
  });

  // it('shows detailed card after fetching', async () => {
  //   render(
  //     <Provider store={store}>
  //       <RouterProvider router={router} />
  //     </Provider>
  //   );
  //   const detailedCard = await screen.findByTestId('article-details');
  //   screen.debug();
  //   expect(detailedCard).toBeInTheDocument();
  // });
});
