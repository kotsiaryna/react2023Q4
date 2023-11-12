import { createContext } from 'react';
import { IArticle } from './types';

interface ISearchValueContext {
  searchContextValue: string;
  setSearchContextValue: React.Dispatch<React.SetStateAction<string>> | null;
}
const localValue = localStorage.getItem('inputValue') || JSON.stringify('');

export const defaultSearchValue = JSON.parse(localValue);

export const SearchValueContext = createContext<ISearchValueContext>({
  searchContextValue: defaultSearchValue,
  setSearchContextValue: null,
});

export const ArticlesContext = createContext<IArticle[] | null>(null);
