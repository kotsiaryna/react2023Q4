import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import Home from '@/pages';
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('layout test', () => {
  (useRouter as jest.Mock).mockReturnValue({
    query: { limit: '10', search: 'test' },
    push: jest.fn(),
  });
  it('renders layout', () => {
    render(
      <Layout>
        <Home />
      </Layout>
    );

    const searchHeading = screen.getByText(/Looking for the latest news/i);
    expect(searchHeading).toBeInTheDocument();
  });
});
