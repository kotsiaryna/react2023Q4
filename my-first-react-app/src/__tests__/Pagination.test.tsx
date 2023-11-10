import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import Pagination from '../view/results/Pagination';

describe('Pagination', () => {
  const startPageNumber = 2;
  it('URL is updated when page changes (BACK)', () => {
    render(
      <BrowserRouter>
        <Pagination handleClick={jest.fn()} totalAmount={50} limit={10} page={startPageNumber} />
      </BrowserRouter>
    );
    const backButton = screen.getByText(/back/i);
    fireEvent.click(backButton);
    const path = window.location.pathname;
    const currentPage = path.split('/').at(2);
    expect(currentPage).toBe(`${startPageNumber - 1}`);
  });

  it('URL is updated when page changes (FORWARD)', () => {
    render(
      <BrowserRouter>
        <Pagination handleClick={jest.fn()} totalAmount={50} limit={10} page={startPageNumber} />
      </BrowserRouter>
    );
    const forwardButton = screen.getByText(/forward/i);
    fireEvent.click(forwardButton);
    const path = window.location.pathname;
    const currentPage = path.split('/').at(2);
    expect(currentPage).toBe(`${startPageNumber + 1}`);
  });
});
