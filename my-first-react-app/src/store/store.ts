import { configureStore } from '@reduxjs/toolkit';
import searchValueReducer, { SearchValueState } from './searchSlice';
import itemsPerPageReducer from './itemsPerPageSlice';
import flagReducer, { FlagsState } from './flagSlice';
import { loadSearchValue } from '../utils/localStorageUtils';

import { setupListeners } from '@reduxjs/toolkit/query';
import { newsApi } from '../apiRTK';

export type State = {
  // itemsPerPage: SearchValueState;
  searchValue: SearchValueState;
  flags: FlagsState;
  itemsPerPage: {
    value: string;
  };
};

const reducer = {
  searchValue: searchValueReducer,
  itemsPerPage: itemsPerPageReducer,
  flags: flagReducer,
  [newsApi.reducerPath]: newsApi.reducer,
};

const preloadedState: State = {
  searchValue: {
    value: loadSearchValue(),
  },
  itemsPerPage: {
    value: '10',
  },
  flags: {
    isLoadingResults: false,
    isLoadingPage: false,
    isLoadingDetails: false,
  },
};

const store = configureStore({
  reducer,
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(newsApi.middleware),
});
// don't know if it necessary
setupListeners(store.dispatch);

export default store;
