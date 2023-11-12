import { articleRequest, searchRequest } from '../src/api';

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve({ articles: ['mocked data'] }),
  })
);
describe('testing api', () => {
  it('should fetch data from the API searchRequest', async () => {
    const data = await searchRequest({ search: 'test', page: '1', limit: '10' });
    expect(data).toEqual({ articles: ['mocked data'] });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://newsapi.org/v2/top-headlines?q=test&pageSize=10&page=1&apiKey=a6748dc91b9e4f7a8af5cc41a1090947'
    );
  });

  it('should fetch data from the API', async () => {
    const data = await articleRequest({
      params: {
        search: 'test',
        page: '1',
        limit: '10',
        id: '0',
      },
      request: {} as Request,
    });
    expect(data).toEqual('mocked data');
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://newsapi.org/v2/top-headlines?q=test&pageSize=10&page=1&apiKey=a6748dc91b9e4f7a8af5cc41a1090947'
    );
  });
});
