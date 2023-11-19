import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import routesConfig from '../src/routerConfig';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from '../src/redux/store';

describe('Page 404', () => {
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

  it('Page 404 is displayed when navigating to an invalid route', async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/badRoute'],
    });

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    const errorPageElement = screen.getByTestId('page404');

    expect(errorPageElement).toBeInTheDocument();
  });
});
