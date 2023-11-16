import { configureStore } from '@reduxjs/toolkit';
import searchValueReducer, { SearchValueState } from './searchSlice';
import itemsPerPageReducer from './itemsPerPageSlice';
import { loadSearchValue } from '../utils/localStorageUtils';

export type State = {
  // itemsPerPage: SearchValueState;
  searchValue: SearchValueState;
  itemsPerPage: {
    value: string;
  };
};

const reducer = {
  searchValue: searchValueReducer,
  itemsPerPage: itemsPerPageReducer,
};

const preloadedState: State = {
  searchValue: {
    value: loadSearchValue(),
  },
  itemsPerPage: {
    value: '10',
  },
};

const store = configureStore({
  reducer,
  preloadedState,
});

export default store;
