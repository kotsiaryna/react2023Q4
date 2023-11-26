import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { fakeArticles } from './mocks/mockData';
import { useRouter } from 'next/router';
import ArticleDetails from '@/components/ArticleDetails';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();

describe('ArticleDetails test', () => {
  const article = fakeArticles[0];

  (useRouter as jest.Mock).mockReturnValue({
    query: { limit: '10', search: 'test' },
    push: pushMock,
  });

  it('renders Article Details', () => {
    render(<ArticleDetails article={article} />);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent(article.title);
  });
});
