export const fakeArticles = [
  {
    index: 0,
    author: 'Author 0',
    title: 'title 0',
    description: 'some description',
    urlToImage: '/',
    handleClick: jest.fn(),
  },
  {
    index: 1,
    author: 'Author 1',
    title: 'title 1',
    description: 'some description1',
    urlToImage: '/1',
    handleClick: jest.fn(),
  },
  {
    index: 2,
    author: 'Author 2',
    title: 'title 2',
    description: 'some description3',
    urlToImage: '/2',
    handleClick: jest.fn(),
  },
  {
    index: 3,
    author: 'Author 3',
    title: 'title 3',
    description: 'some description3',
    urlToImage: '/3',
    handleClick: jest.fn(),
  },
  {
    index: 4,
    author: 'Author 4',
    title: 'title 4',
    description: 'some description4',
    urlToImage: '/4',
    handleClick: jest.fn(),
  },
];

export const mockArticleRequest = () => {
  return Promise.resolve(() => {
    return fakeArticles[0];
  });
};
