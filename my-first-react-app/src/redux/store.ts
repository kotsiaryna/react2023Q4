import { configureStore } from '@reduxjs/toolkit';
import searchValueReducer from './searchSlice';
import itemsPerPageReducer from './itemsPerPageSlice';
import flagReducer, { FlagsState } from './flagSlice';
import { loadSearchValue } from '../utils/localStorageUtils';

import { setupListeners } from '@reduxjs/toolkit/query';
import { newsApi } from './apiRTK';

export type State = {
  searchValue: string;
  flags: FlagsState;
  itemsPerPage: string;
};

const reducer = {
  searchValue: searchValueReducer,
  itemsPerPage: itemsPerPageReducer,
  flags: flagReducer,
  [newsApi.reducerPath]: newsApi.reducer,
};

export const preloadedState: State = {
  searchValue: loadSearchValue() || '',
  itemsPerPage: '10',
  flags: {
    isLoadingResults: false,
    isLoadingDetails: false,
  },
};
export const setupStore = (preloadedState?: State) => {
  return configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(newsApi.middleware),
  });
};
const store = setupStore(preloadedState);

setupListeners(store.dispatch);

export default store;
