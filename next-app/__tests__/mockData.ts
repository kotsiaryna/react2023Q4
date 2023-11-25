export const fakeArticles = [
  {
    index: 0,
    author: "Author 0",
    title: "title 0",
    description: "some description",
    content: "bla-bla-bla",
    urlToImage: "/",
    url: "/origin",
    handleClick: jest.fn(),
  },
  {
    index: 1,
    author: "Author 1",
    title: "title 1",
    description: "some description1",
    content: "bla-bla-bla",
    urlToImage: "/1",
    url: "/origin",
    handleClick: jest.fn(),
  },
  {
    index: 2,
    author: "Author 2",
    title: "title 2",
    description: "some description3",
    content: "bla-bla-bla",
    urlToImage: "/2",
    url: "/origin",
    handleClick: jest.fn(),
  },
  {
    index: 3,
    author: "Author 3",
    title: "title 3",
    description: "some description3",
    content: "bla-bla-bla",
    urlToImage: "/3",
    url: "/origin",
    handleClick: jest.fn(),
  },
  {
    index: 4,
    author: "Author 4",
    title: "title 4",
    description: "some description4",
    content: "bla-bla-bla",
    urlToImage: "/4",
    url: "/origin",
    handleClick: jest.fn(),
  },
];

export const mockArticleRequest = () => {
  return Promise.resolve(() => {
    return fakeArticles[0];
  });
};

export const mockRequest = {
  status: "200",
  totalResults: "10",
  articles: fakeArticles,
};
