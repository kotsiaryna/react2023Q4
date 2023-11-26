import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import Search from '../src/view/search/Search';
import { setupStore } from '../src/redux/store';
import { Provider } from 'react-redux';

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

describe('Search', () => {
  beforeEach(() => {
    store = setupStore(initialState);
  });

  it('input value is changed', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>
    );
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(inputElement, {
      target: {
        value: 'new search',
      },
    });
    expect(inputElement.value).toBe('new search');
  });

  it('input get value from LS upon mounting', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>
    );

    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement.value).toBe('');
  });

  it('input value is saved to LS', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>
    );
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    const searchButton = screen.getByRole<HTMLButtonElement>('button');
    fireEvent.change(inputElement, {
      target: {
        value: 'new search',
      },
    });
    fireEvent.click(searchButton);
    const localStorageValue = localStorage.getItem('inputValue') || JSON.stringify('');
    expect(JSON.parse(localStorageValue)).toBe('new search');
  });
});
