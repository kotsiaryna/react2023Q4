import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import Search from '../src/view/search/Search';

describe('Search', () => {
  it('input value is changed', () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
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
    localStorage.setItem('inputValue', JSON.stringify('test'));
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement.value).toBe('test');
  });

  it('input value is saved to LS', () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
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
