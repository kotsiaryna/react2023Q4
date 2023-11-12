import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import routesConfig from '../src/routerConfig';

describe('App', () => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: ['/'],
  });
  it('App renders', () => {
    render(<RouterProvider router={router} />);

    const appSection = screen.getByTestId('app');

    expect(appSection).toBeInTheDocument();
  });
});
