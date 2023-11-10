import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import routesConfig from '../routerConfig';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

describe('Page 404', () => {
  it('Page 404 is displayed when navigating to an invalid route', async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/badRoute'],
    });

    render(<RouterProvider router={router} />);

    const errorPageElement = screen.getByTestId('page404');

    expect(errorPageElement).toBeInTheDocument();
  });
});
