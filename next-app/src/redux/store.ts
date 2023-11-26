import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { newsApi } from './api';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';

const setupStore = () => {
  return configureStore({
    reducer: {
      [newsApi.reducerPath]: newsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(newsApi.middleware),
  });
};

setupListeners(setupStore().dispatch);
type AppStore = ReturnType<typeof setupStore>;
type RootState = ReturnType<AppStore['getState']>;
type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const wrapper = createWrapper<AppStore>(setupStore, { debug: true });
