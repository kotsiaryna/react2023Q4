import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import Pagination from '../src/view/results/Pagination';
import { setupStore } from '../src/redux/store';
import { Provider } from 'react-redux';

describe('Pagination', () => {
  const initialState = {
    searchValue: '',
    itemsPerPage: '10',
    flags: {
      isLoadingResults: false,
      isLoadingPage: true,
      isLoadingDetails: false,
    },
  };
  let store = setupStore(initialState);
  const startPageNumber = 2;

  beforeEach(() => {
    store = setupStore(initialState);
  });

  it('URL is updated when page changes (BACK)', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Pagination totalAmount={50} limit={10} page={startPageNumber} />
        </BrowserRouter>
      </Provider>
    );
    const backButton = screen.getByText(/back/i);
    fireEvent.click(backButton);
    const path = window.location.pathname;
    const currentPage = path.split('/').at(2);
    expect(currentPage).toBe(`${startPageNumber - 1}`);
  });

  it('Nothing happens when click back on first page (BACK)', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Pagination totalAmount={50} limit={10} page={1} />
        </BrowserRouter>
      </Provider>
    );
    const backButton = screen.getByText(/back/i);
    fireEvent.click(backButton);
    const path = window.location.pathname;
    const currentPage = path.split('/').at(2);
    expect(currentPage).toBe('1');
  });

  it('URL is updated when page changes (FORWARD)', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Pagination totalAmount={50} limit={10} page={startPageNumber} />
        </BrowserRouter>
      </Provider>
    );
    const forwardButton = screen.getByText(/forward/i);
    fireEvent.click(forwardButton);
    const path = window.location.pathname;
    const currentPage = path.split('/').at(2);
    expect(currentPage).toBe(`${startPageNumber + 1}`);
  });
});
