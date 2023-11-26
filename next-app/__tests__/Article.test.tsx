import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Article from '@/components/Article';
import { fakeArticles } from './mocks/mockData';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();

describe('Article test', () => {
  const article = fakeArticles[0];

  (useRouter as jest.Mock).mockReturnValue({
    query: { limit: '10', search: 'test' },
    push: pushMock,
  });

  it('renders Article', () => {
    render(<Article index={article.index} author={article.author} title={article.title} />);
    const authorElement = screen.getByText(article.author);
    expect(authorElement).toBeInTheDocument();
  });

  it('pushes query on click', () => {
    render(<Article index={article.index} author={article.author} title={article.title} />);
    const articleElement = screen.getByTestId(/article/i);
    fireEvent.click(articleElement);
    expect(pushMock).toHaveBeenCalledTimes(1);
  });
});
