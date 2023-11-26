import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import { useDetailedNewsQuery, useGetNewsQuery } from '@/redux/api';
import { mockStore } from './mocks/mockData';

describe('api tests', () => {
  it('api tests', async () => {
    const { result } = renderHook(
      () => useGetNewsQuery({ search: 'test', page: '1', limit: '10' }),
      {
        wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
      }
    );

    await waitFor(() => {
      expect(result.current.endpointName).toBe('getNews');
    });
  });

  it('api tests', async () => {
    const { result } = renderHook(
      () => useDetailedNewsQuery({ search: 'test', page: '1', limit: '10', id: '2' }),
      {
        wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
      }
    );

    await waitFor(() => {
      expect(result.current.endpointName).toBe('detailedNews');
    });
  });
});
