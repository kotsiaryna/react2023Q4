import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { fakeArticles } from './mocks/mockData';
import ArticleList from '@/components/ArticleList';
import { useRouter } from 'next/router';
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Article List', () => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {},
    push: jest.fn,
  });
  it('renders all Articles', () => {
    render(<ArticleList results={fakeArticles} />);
    const articles = screen.getAllByTestId(/article/i);
    expect(articles.length).toBe(fakeArticles.length);
  });
});
