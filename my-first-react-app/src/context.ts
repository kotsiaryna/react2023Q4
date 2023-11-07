import { createContext } from 'react';
import { IArticle } from './types';

interface ISearchValueContext {
  searchContextValue: string;
  setSearchContextValue: React.Dispatch<React.SetStateAction<string>> | null;
}

export const defaultSearchValue = JSON.parse(localStorage.getItem('inputValue') || '');

export const SearchValueContext = createContext<ISearchValueContext>({
  searchContextValue: defaultSearchValue,
  setSearchContextValue: null,
});

export const ResultsContext = createContext<IArticle[] | null>(null);
