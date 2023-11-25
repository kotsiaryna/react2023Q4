import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

import Pagination from '@/components/Pagination';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();

describe('Pagination test', () => {
  (useRouter as jest.Mock).mockReturnValue({
    query: { limit: '10', search: 'test', page: '2' },
    push: pushMock,
  });

  it('renders Pagination', () => {
    render(<Pagination totalAmount={25} query={{ limit: '10', search: 'test', page: '2' }} />);

    const pageElement = screen.getByText('2');
    expect(pageElement).toBeInTheDocument();
  });

  it('handles backClick correctly', () => {
    render(<Pagination totalAmount={25} query={{ limit: '10', search: 'test', page: '2' }} />);

    const backButton = screen.getByText(/back/i);
    fireEvent.click(backButton);
    expect(pushMock).toHaveBeenCalledTimes(1);
  });

  it('handles backClick correctly on first page', () => {
    render(<Pagination totalAmount={25} query={{ limit: '10', search: 'test', page: '1' }} />);

    const backButton = screen.getByText(/back/i);
    fireEvent.click(backButton);
    expect(pushMock).toHaveBeenCalledTimes(1);
  });

  it('handles forwardClick correctly', () => {
    render(<Pagination totalAmount={25} query={{ limit: '10', search: 'test', page: '2' }} />);

    const forwardButton = screen.getByText(/forward/i);
    fireEvent.click(forwardButton);
    expect(pushMock).toHaveBeenCalledTimes(2);
  });
  it('handles forwardClick correctly on last page', () => {
    render(<Pagination totalAmount={25} query={{ limit: '10', search: 'test', page: '3' }} />);

    const forwardButton = screen.getByText(/forward/i);
    fireEvent.click(forwardButton);
    expect(pushMock).toHaveBeenCalledTimes(2);
  });
});
